const { validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "첫 번째 포스팅",
        content: "REST API 생성",
        imageUrl: "images/typescript.jpeg",
        creator: {
          name: "김청수",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.writePost = (req, res, next) => {
  const errors = validationResult(req);

  console.log("errors : ", errors);

  if (!errors.isEmpty()) {
    // 422는 유효성 검사 실패 상태 코드임
    return res.status(422).json({
      message:
        "유효성 검사를 통과하지 못했습니다. 올바른 데이터 값을 넣어주세요.",
      errors: errors.array(),
    });
  }

  const title = req.body.title;
  const content = req.body.content;

  // Create post in DB
  // 클라이언트에게 리소스 생성이 완료되었다는 것을 알리기 위해서는 200보다는 201 상태코드가 더 적합하다.
  // 이유 : 상태코드 201은 리소스를 생성했음을 나타낸다.
  res.status(201).json({
    message: "게시글을 작성하였습니다.",
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: { name: "닝닝" },
      createdAt: new Date(),
    },
  });
};
