exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { title: "첫 번째 포스팅", content: "REST API 생성" },
      { title: "두 번째 포스팅", content: "REST API2 생성" },
    ],
  });
};
