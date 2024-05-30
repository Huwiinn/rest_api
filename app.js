const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");

const feedRoutes = require("./routes/feed");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// json메서드로 bodyParser를 사용. json 데이터 분석
// 이 방법은 application/json에 사용하기 좋은 방식임.
app.use(bodyParser.json());
// 정적 이미지 경로 지정
app.use("/images", express.static(path.join(__dirname, "images")));

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

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status.json({ message }));
});

mongoose
  .connect(
    "mongodb+srv://hwi:VpFUqyqFbSr6N68Y@cluster0.vdg6omr.mongodb.net/messages"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((e) => console.log(e));
