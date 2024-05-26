# rest_api

Rest API 생성 연습

240526 (REST API 기본 개념)

- REST API는 데이터 중심이다.
- REST API는 클라이언트에서 완전히 분리되어 있다. (디커플링)
- 요청이나 응답을 보낼 때에는 json 형식으로 데이터를 전송해야한다.
- 요청을 보낼 때, headers 내부에 content-type을 명시하여 서버측에 알려줘야 한다.
- CORS 에러는 클라이언트 측과 상관없다. 에러를 해결하기 위해서는 서버에서 다른 도메인 이 접근할 수 있도록 설정해주어야 한다.

```javascript
// 예시 코드
const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");

getBtn.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/posts")
    .then((res) => res.json())
    .then((resData) => console.log("resData : ", resData))
    .catch((err) => console.log("err : ", err));
});

postBtn.addEventListener("click", () => {
  fetch("http://localhost:8080/feed/post/write", {
    method: "POST",
    body: JSON.stringify({
      title: "1번 포스팅입니다.",
      content: "나는 오늘 은팔찌를 구입했다.",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((resData) => console.log("resData : ", resData))
    .catch((err) => console.log("err : ", err));
});
```
