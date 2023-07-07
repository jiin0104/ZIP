//express 서버의 코드 담는 파일

const express = require("express");
const session = require("express-session");
const fs = require("fs");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport"); //로그인 로직할 때 필요

const app = express();

//쿠키 설정. 쿠키사용 보류
// app.use(
//   session({
//     secret: "secret code",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60, //쿠키 유효시간 1시간
//     },
//   })
// );

//passport 모듈 연결
//passportConfig();
//req객체에 passport설정 대입하는 미들웨어
app.use(passport.initialize());
//req.session객체에 passport 정보 저장 미들웨어
//*req.session 객체는 express-session에서 생성하므로,passport미들웨어는 express-session 미들웨어보다 뒤에 연걸 해야함.순서 중요.
app.use(passport.session());

//express 서버로 POST 요청을 할 때 input 태그의 value를 전달하기 위해 사용
//post 방식으로 클라이언트가 요청하는 본문에 있는 value를 넘겨받고 req.body 객체로 만들어주는 미들웨어.
//넘겨받은 value들은 DB로 전송
//app.use(express.urlencoded({ extended: false })); 논의필요. https://kirkim.github.io/javascript/2021/10/16/body_parser.html
app.use(
  express.json({
    limit: "50mb",
  })
);

//서버의 포트 설정
const server = app.listen(3000, () => {
  console.log("port 3000에서 대기 중");
});

let sql = require("./sql.js");

fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

//db 연결.
const db = {
  database: "project",
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "1234",
  connectionLimit: 100,
  multipleStatements: true, // 세미콜론으로 이어진 여러 개의 쿼리문을 한꺼번에 날릴 수 있게
};
//createconnection 말고 createpool을 이용해서 연결.createConnection은 단일 연결 방식, 요청이 있을 때마다 연결 객체를 생성했다가, 제거하는 것이 반복.
//따라서 비용, 시간, 연결에 대한 부담이 발생
const dbPool = require("mysql2").createPool(db);

app.post("/api/login", async (request, res) => {
  // request.session['email'] = 'seungwon.go@gmail.com';
  // res.send('ok');
  try {
    await req.db("signUp", request.body.param);
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0])
        request.session[key] = request.body.param[0][key];
      res.send(request.body.param[0]);
    } else {
      res.send({
        error: "Please try again or contact system manager.",
      });
    }
  } catch (err) {
    res.send({
      error: "DB access error",
    });
  }
});

app.post("/api/logout", async (request, res) => {
  request.session.destroy();
  res.send("ok");
});

app.post("/upload/:productId/:type/:fileName", async (request, res) => {
  let { productId, type, fileName } = request.params;
  const dir = `${__dirname}/uploads/${productId}`;
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
    await req.db("productImageInsert", [
      {
        product_id: productId,
        type: type,
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

app.get("/download/:productId/:fileName", (request, res) => {
  const { productId, type, fileName } = request.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
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
