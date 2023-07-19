//express 서버의 코드를 담는 파일
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const fs = require("fs");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport"); //로그인 로직할 때 필요
const passportConfig = require("./passport");
const mysql = require("mysql2");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const KEY = "token_key"; // jwt 시크릿 키
const axios = require("axios");

app.use("/", express.static(path.join(__dirname, "./public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// 쿠키 설정. 쿠키사용 보류
app.use(
  session({
    // session 처리 방법
    secret: "secret code", // session에 대한 key(secret code)
    resave: false, // resave: request 요청이 왔을 때, session에 수정사항이 생기지 않더라도, 다시 저장하는 기능
    saveUninitialized: false, // saveUninitialied: session에 저장할 내역이 없더라도, session을 항상 재저장을 하는 기능
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 쿠기 유효시간 (1시간)
    },
  })
);

//cors 오류 해결 코드. 후에 cors 모듈을 이용하지 않고 해결할 방법 찾아볼 것
//(프론트단에 추가한 액시오스 설정도 같이 볼 것)

let corsOption = {
  origin: "http://localhost:8080", // 접근 권한 부여 도메인
  credentials: true, //true로 하면 설정한 내용을 response 헤더에 추가 해줌.
  optionsSuccessStatus: 200, //응답 상태 200으로 설정
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOption)); //CORS 미들웨어

// passport 모듈 연결
// passportConfig();
// req객체에 passport설정 대입하는 미들웨어
// app.use(passport.initialize());

//req.session객체에 passport 정보 저장 미들웨어
//*req.session 객체는 express-session에서 생성하므로,passport미들웨어는 express-session 미들웨어보다 뒤에 연걸 해야함.순서 중요.
// app.use(passport.session());

//express 서버로 POST 요청을 할 때 input 태그의 value를 전달하기 위해 사용
//post 방식으로 클라이언트가 요청하는 본문에 있는 value를 넘겨받고 req.body 객체로 만들어주는 미들웨어.
//넘겨받은 value들은 DB로 전송
app.use(express.urlencoded({ extended: true }));
//이건 제이슨 형태로ol
app.use(express.json());

//cosnt를 줘버리면 sql이 고정값을 가져서 쿼리문 여러 개 못 씀.
let sql = require("./sql.js");

//우리가 쿼리 수정했을 때 바로바로 내역 볼 수 있게.
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

//연결하는 db
const dbPool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "alscjf1254@",
  database: "project",
  connectionLimit: 100, //연결할 수 있는 최대 수 100
});

//createconnection 말고 createpool을 이용해서 연결.
//createConnection은 단일 연결 방식, 요청이 있을 때마다 연결 객체를 생성했다가, 제거하는 것이 반복.
//따라서 비용, 시간, 연결에 대한 부담이 발생
//createpool을 이용한 커넥션 생성
dbPool.getConnection((err, connection) => {
  if (err) {
    console.error("db 연동에 문제가 있습니다:", err);
    return;
  }
  console.log("db와 연결 성공");

  //연결을 사용한 작업 수행

  connection.release(); //사용 완료된 연결 반납
});

//이미지 업로드 불러오기 정의(나중에 슬라이드사진으로 할경우에는 수정필요)
app.post("/upload/:ACCO_ID/:type/:fileName", async (request, res) => {
  let { ACCO_ID, fileName } = request.params;
  const dir = `${__dirname}/uploads/${ACCO_ID}`;
  const file = `${dir}/${fileName}`;
  if (!request.body.data)
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  const data = request.body.data.slice(
    request.body.data.indexOf(";base64,") + 8
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFile(file, data, "base64", async (error) => {
    await req.db("accommodations", [
      {
        ACCO_ID: ACCO_ID,
        //type: type,
        path: fileName,
      },
    ]);

    if (error) {
      res.send({
        error,
      });
    } else {
      res.send("ok");
    }
  });
});
//이미지 불러오기
app.get("/download/:ACCO_ID/:fileName", (request, res) => {
  const { ACCO_ID, fileName } = request.params;
  const filepath = `${__dirname}/uploads/${ACCO_ID}/${fileName}`;
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath))
    res.send(404, {
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res);
});

//apirole은 로그인된거 나중에 상품등록할때 관리자 권한으로 사용할것
app.post("/apirole/:alias", async (request, res) => {
  if (!request.session.email) {
    return res.status(401).send({
      error: "You need to login.",
    });
  }

  try {
    res.send(await req.db(request.params.alias));
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

//로그인 라우터. 웹페이지'/login'에서 인증로직 처리.
app.post("/api/login", function (request, response) {
  const loginUser = request.body;
  console.log(loginUser.userId);
  console.log(loginUser.userPw);

  const query = "SELECT * FROM users WHERE USER_ID = ?";

  dbPool.query(query, [loginUser.userId], function (error, results, fields) {
    console.log(results.length);
    if (results.length <= 0) {
      return response.status(200).json({
        message: "undefined_id",
      });
    } else {
      dbPool.query(
        query,
        [loginUser.userId],
        function (error, results, fields) {
          console.log(results);
          if (results[0].USER_PASSWORD == loginUser.userPw) {
            // ID에 저장된 pw 값과 입력한 pw값이 동일한 경우

            return response.status(200).json({
              message: results[0].USER_GRADE,
              message1: results[0].USER_NO
            });
          } else {
            // 비밀번호 불일치
            return response.status(200).json({
              message: "incorrect_pw",
            });
          }
        }
      );
    }
  });
});

app.post("/api/kakaoLogin", async (request, res) => {
  // client에서 server쪽으로 axios post방식으로 login api 가져오기
  // res.send('ok');
  try {
    await req.db("SignUp", request.body.param); // signUp sql 호출하고, request시 body에 파라미터도 함께 들어오도록 설정
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0])
        request.session[key] = request.body.param[0][key]; // 받아온 파리미터의 첫번째 인자를 key값에 넣어줌
      res.send(request.body.param[0]); // 받아왔던 파라미터를 보내줌
    } else {
      // 파라미터 없이 api를 호출했을 시
      res.send({ error: "Please try again or contact system manager ." });
    }
  } catch (err) {
    // DB에 저장 도중 error가 났을 시
    res.send({
      error: "DB access error",
    });
  }
});

app.post("/api/logout", async (request, res) => {
  // client에서 server쪽으로 axios post()방식으로 logout api가져오기
  request.session.destroy(); // session 없애기
  res.send("ok");
});


// 쿼리 요청을 보내는 부분. 에러가 발생하였을 때 콘솔에 출력해주는 소스.
//req객체
const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};

app.post("/api/:alias", async (request, res) => {
  try {
    res.send(
      await req.db(request.params.alias, request.body.param, request.body.where)
    );
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

// 회원 가입 API 엔드포인트
app.post("/signup", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { email, nickname, password, phone, address1, address2 } = req.body;

    // 중복된 이메일이 없을 경우 회원 정보 저장
    const insertUserSql =
      "INSERT INTO users (USER_ID, USER_NICKNAME, USER_PASSWORD, USER_TEL, USER_ADDRESS1, USER_ADDRESS2) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [email, nickname, password, phone, address1, address2];
    connection.query(insertUserSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("회원 정보 인서트 실패:", err);
        return res
          .status(500)
          .json({ error: "회원 정보 인서트에 실패했습니다." });
      }

      // 회원 가입 성공 응답
      res.json({ message: "가입 되셨습니다." });
    });
  });
});

// 이메일 중복 확인
app.post("/checkEmail", (req, res) => {
  //db 연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db 연결에 문제가 있습니다:", err);
      return res.status(500).json({ error: "DB 연결에 실패했습니다." });
    }

    const { email } = req.body;

    const checkDuplicateEmailSql = "SELECT * FROM users WHERE USER_ID = ?";
    connection.query(checkDuplicateEmailSql, [email], (error, results) => {
      connection.release(); // 사용이 완료된 연결 반납

      if (error) {
        console.error("이메일 중복검사 에러:", error);
        return res.status(500).json({ error: "이메일 중복검사 실패." });
      }

      if (results.length > 0) {
        res.json({ exists: true });
      } else {
        // 이미 존재하는 이메일인 경우 false
        res.json({ exists: false });
      }
    });
  });
});

//닉네임 중복 확인
app.post("/checkNickname", (req, res) => {
  const { nickname } = req.body;

  const checkDuplicateNicknameSql =
    "SELECT * FROM users WHERE USER_NICKNAME = ?";
  dbPool.query(checkDuplicateNicknameSql, [nickname], (error, results) => {
    if (error) {
      console.error("닉네임 중복 확인 에러:", error);
      return res
        .status(500)
        .json({ error: "닉네임 중복 확인에 실패했습니다." });
    }

    if (results.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  });
});

//전화번호를 받아서 아이디 찾기.
app.post("/findId", async (req, res) => {
  try {
    const { phoneNumber } = req.body; //vue에서 받아온 파라미터 값
    const query = "SELECT USER_ID FROM users WHERE USER_TEL = ?"; // 전화번호로 id를 찾는 쿼리
    const connection = await dbPool.promise().getConnection(); // getConnection()을 프로미스를 반환하는 메서드로 사용

    //vue에서 받아온 파라미터 값 확인됐음.
    console.log({ phoneNumber });

    const result = await connection.query(query, [phoneNumber]); // 쿼리 실행
    connection.release(); // 사용이 완료된 연결 반납

    //db에서 쿼리 이용해서 가져온 값 확인됐음.
    console.log(result);

    if (result.length > 0) {
      const id = result[0][0]?.USER_ID;
      res.json({ id }); // 아이디를 응답으로 전송
      console.log({ id }); //id객체에 가져온 db값 넣어지는 거 확인 됐음.
    } else {
      const id = ""; // 응답이 없을 때 빈 id 값을 설정
      res.json({ id }); // 빈 id 값을 응답으로 전송
      console.log({ id }); // 빈 id 값이 들어오는지 확인
    }
  } catch (err) {
    res.status(500).send({ error: "DB 연결에 문제가 있습니다" });
    console.error(err);
  }
});

app.post("/checkPhoneNumber", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const serviceId = "ncp:sms:kr:266040473450:findpw"; // 네이버 SMS 서비스 ID
    const accessKey = "0duT1ylOA5XIOuBWblte"; // 네이버 SMS 액세스 키
    const apiURL = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`; // API 엔드포인트 URL

    //전화번호를 이용해서 쿼리 실행
    const query = "SELECT COUNT(*) AS count FROM users WHERE USER_TEL = ?";
    const connection = await dbPool.promise().getConnection();

    const result = await connection.query(query, [phoneNumber]); // 쿼리 실행결과
    const count = result[0][0].count;
    const exists = count > 0;

    if (exists) {
      // 전화번호가 존재하는 경우, 네이버 SMS API를 사용하여 인증번호 전송
      const verificationCode = Math.floor(1000 + Math.random() * 9000);
      const requestData = {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: "SENDER_PHONE_NUMBER",
        content: `인증번호: ${verificationCode}`,
        messages: [{ to: phoneNumber }],
      };

      // API 호출을 위한 요청 헤더 설정
      const headers = {
        "Content-Type": "application/json",
        "x-ncp-iam-access-key": accessKey,
      };

      try {
        const response = await axios.post(apiURL, requestData, { headers });
        // 성공적으로 인증번호를 전송한 경우
        console.log("인증번호가 전송되었습니다.");
        res.json({ exists, verificationCode }); // 인증번호와 함께 응답 전송
      } catch (error) {
        // 인증번호 전송 실패한 경우
        console.error("인증번호 전송에 실패했습니다.", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      // 전화번호가 존재하지 않는 경우: 경고창 표시
      alert("회원가입되지 않은 전화번호입니다.");
      res.json({ exists });
    }

    // 연결 해제
    connection.release();
  } catch (err) {
    res.status(500).send({ error: "DB 연결에 문제가 있습니다" });
    console.error(err);
  }
});

// 정보 수정 API 엔드포인트
app.post("/my_update", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }
    
    const { nickname, password, phone, address1, address2, ddd } = req.body;
    
    console.log(nickname);
    console.log(ddd);
    // 중복된 이메일이 없을 경우 회원 정보 저장
    const updateUserSql =
      "UPDATE users SET USER_NICKNAME=?, USER_PASSWORD=?, USER_TEL=?, USER_ADDRESS1=?, USER_ADDRESS2=? where USER_ID=?";
    const values = [nickname, password, phone, address1, address2, ddd];
    connection.query(updateUserSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("회원 정보 업데이트 실패:", err);
        return res
          .status(500)
          .json({ error: "회원 정보 수정에 실패했습니다." });
      }

      // 정보 수정 성공 응답
      res.json({ message: "정보가 수정 되었습니다." });
    });
  });
});

// 예약 생성 API 엔드포인트
app.post("/acco_detail", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { check_in, check_out, userno, accoid } = req.body;

    const insertReservationSql =
      "INSERT INTO reservation (RESERVATION_CHECK_IN, RESERVATION_CHECK_OUT, USER_NO, ACCO_ID) VALUES (?, ?, ?, ?)";
    const values = [check_in, check_out, userno, accoid];
    connection.query(insertReservationSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("예약 생성 인서트 실패:", err);
        return res
          .status(500)
          .json({ error: "예약 정보 인서트에 실패했습니다." });
      }

      //  성공 응답
      res.json({ message: "예약창으로 넘어갑니다" });
    });
  });
});

// 결제 API 엔드포인트
app.post("/payment", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { amount, reservationid } = req.body;

    // 결제 정보 저장
    const insertPaymentSql =
      "INSERT INTO payment (PAYMENT_TOTAL_PRICE, RESERVATION_ID) VALUES (?, ?)";

    const values = [amount, reservationid];
    connection.query(insertPaymentSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("결제 인서트 실패:", err);
        return res
          .status(500)
          .json({ error: "결제 정보 인서트에 실패했습니다." });
      }

      res.json({ message: "결제 되셨습니다." });
    });
  });
});

// 예약 상태 바꾸는 로직
app.post("/reservation_info", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { reservation_status, dday1, dday2 } = req.body;

    const updateResSql =
      "UPDATE reservation SET RESERVATION_STATUS=?, RESERVATION_CHECK_IN=?, RESERVATION_CHECK_OUT=? order by RESERVATION_ID desc limit 1";
    const values = [reservation_status, dday1, dday2];
    connection.query(updateResSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("예약 상태 업데이트 실패:", err);
        return res
          .status(500)
          .json({ error: "예약 상태 수정에 실패했습니다." });
      }

      // 정보 수정 성공 응답
      res.json({ message: "예약 정보가 수정 되었습니다." });
    });
  });
});

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});

module.exports = dbPool;
