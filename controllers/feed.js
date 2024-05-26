exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { title: "첫 번째 포스팅", content: "REST API 생성" },
      { title: "두 번째 포스팅", content: "REST API2 생성" },
    ],
  });
};

exports.writePost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  // Create post in DB
  // 클라이언트에게 리소스 생성이 완료되었다는 것을 알리기 위해서는 200보다는 201 상태코드가 더 적합하다.
  // 이유 : 상태코드 201은 리소스를 생성했음을 나타낸다.
  res.status(201).json({
    message: "게시글을 작성하였습니다.",
    post: { id: new Date().toISOString(), title, content },
  });
};
