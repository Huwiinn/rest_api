const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// json메서드로 bodyParser를 사용. json 데이터 분석
// 이 방법은 application/json에 사용하기 좋은 방식임.
app.use(bodyParser.json());

// CORS 에러는 JS 코드 문제가 아님. 서버단에서만 처리가 가능하다.
// res.setHeader로 헤더를 설정하여 해결 가능함.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // 클라이언트가 요청에 설정할 수 있는 헤더를 지정
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect("mongodb+srv://hwi:VpFUqyqFbSr6N68Y@cluster0.vdg6omr.mongodb.net/")
  .then((result) => {
    app.listen(8080);
  })
  .catch((e) => console.log(e));
