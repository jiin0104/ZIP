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
const passportConfig = require('./passport');
const mysql = require("mysql2");
const app = express();
const bcrypt = require("bcrypt");

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
  password: "root",
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
app.post("/api/login", async (request, res) => {
  // login api
  await dbPool.query(
    'SELECT USER_ID, USER_PASSWORD FROM users WHERE USER_ID = "' +
    request.body.user.USER_ID +
    '"',
    (err, row) => {
      // body에서 받아온 data와 동일한 data가 있는지 확인
      if (err) {
        // 동일한 data가 없을 시 에러 호출
        res.json({
          success: false,
          message: "Login failed please check your email or pasword",
        });
      }
      if (row[0] !== undefined && row[0].email === request.body.user.email) {
        // data가 undefined가 아니고, body에서 받아온 email과 select한 email이 같은 경우
        bcrypt.compare(
          request.body.user.password,
          row[0].password,
          (err, res2) => {
            // body에서 받아온 password와 select한 password를 비교
            if (res2) {
              // 같은 경우 success
              res.json({
                success: true,
                message: "Login successful",
              });
            } else {
              // 다른 경우 에러 호출
              res.send(401);
            }
          }
        );
      }
    }
  );
});

app.post("/api/kakaoLogin", async (request, res) => {
  // client에서 server쪽으로 axios post방식으로 login api 가져오기
  // res.send('ok');
  try {
    await req.db("signUp", request.body.param); // signUp sql 호출하고, request시 body에 파라미터도 함께 들어오도록 설정
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

// 네이버 라우트. 검토 필요
// router.get("/login/naver", passport.authenticate("naver"));

//위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
// router.get("/login/naver/callback", function (req, res, next) {

//passport 로그인 전략에 의해 naverStrategy로 가서 계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
//   passport.authenticate("naver", function (err, user) {
//     console.log("passport.authenticate(naver)실행");
//     if (!user) {
//       return res.redirect("http://localhost:3000/login");
//     }
//     req.logIn(user, function (err) {
//       console.log("naver/callback user : ", user);
//       return res.redirect("http://localhost:3000/");
//     });
//   })(req, res);
// });

//cors 오류 해결 코드. 후에 cors 모듈을 이용하지 않고 해결할 방법 찾아볼 것
//(프론트단에 추가한 액시오스 설정도 같이 볼 것)

let corsOption = {
  origin: "http://localhost:8080",
  credentials: true, //true로 하면 설정한 내용을 response 헤더에 추가 해줌.
};

app.use(cors(corsOption)); //CORS 미들웨어

// 쿼리 요청을 보내는 부분. 에러가 발생하였을 때 콘솔에 출력해주는 소스.
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

// 정보 수정 API 엔드포인트
app.post("/my_update", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { nickname, password, phone, address1, address2 } = req.body;

    // 중복된 이메일이 없을 경우 회원 정보 저장
    const updateUserSql =
      "UPDATE users SET USER_NICKNAME=?, USER_PASSWORD=?, USER_TEL=?, USER_ADDRESS1=?, USER_ADDRESS2=? where USER_NO=1";
    const values = [nickname, password, phone, address1, address2];
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

    // 중복된 이메일이 없을 경우 회원 정보 저장
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

      // 회원 가입 성공 응답
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

    const { totalprice, reservationid} = req.body;

    // 결제 정보 저장
    const insertPaymentSql =
      "INSERT INTO payment (PAYMENT_TOTAL_PRICE, RESERVATION_ID) VALUES (?, ?)";

    const values = [totalprice, reservationid];
    connection.query(insertPaymentSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("결제 인서트 실패:", err);
        return res
          .status(500)
          .json({ error: "결제 정보 인서트에 실패했습니다." });
      }

      alert("결제 성공");
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

    const {RESERVATION_STATUS} = req.body;

    // 중복된 이메일이 없을 경우 회원 정보 저장
    const updateResSql =
      "UPDATE reservation SET RESERVATION_STATUS=? order by RESERVATION_ID desc limit 1";
    const values = [RESERVATION_STATUS];
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
