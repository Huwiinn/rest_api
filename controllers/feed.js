const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ message: "전체 포스팅을 불러왔습니다.", posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.writePost = (req, res, next) => {
  const errors = validationResult(req);

  console.log("errors : ", errors);

  if (!errors.isEmpty()) {
    const err = new Error(
      "유효성 검사를 통과하지 못했습니다. 올바른 데이터 값을 넣어주세요."
    );
    err.statusCode = 422;
    throw err;

    // 422는 유효성 검사 실패 상태 코드임
    // return res.status(422).json({
    //   message:
    //     "유효성 검사를 통과하지 못했습니다. 올바른 데이터 값을 넣어주세요.",
    //   errors: errors.array(),
    // });
  }

  const title = req.body.title;
  const content = req.body.content;

  // Create post in DB
  const post = new Post({
    title,
    imageUrl: "images/typescript.jpeg",
    content,
    creator: { name: "관리자" },
  });
  post
    .save()
    .then((result) => {
      console.log("result : ", result);
      res.status(201).json({
        message: "게시글을 작성하였습니다.",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  // 클라이언트에게 리소스 생성이 완료되었다는 것을 알리기 위해서는 200보다는 201 상태코드가 더 적합하다.
  // 이유 : 상태코드 201은 리소스를 생성했음을 나타낸다.
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("포스팅을 찾을 수 없습니다!");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "포스팅을 정상적으로 불러왔습니다.", post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
