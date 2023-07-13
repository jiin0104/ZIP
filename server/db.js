const mysql = require("mysql2");

const db = mysql.createPool({
  database: "project",
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root",
  connectionLimit: 100,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.error("db연동에 문제가 있습니다:", err);
    return;
  }
  console.log("db와 연결 성공");
});

module.exports = db;
