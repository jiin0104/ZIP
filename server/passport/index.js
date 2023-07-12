//로그인 전략에 공통적으로 쓰이는 코드 파일.

const passport = require("passport");
const local = require("./localStrategy"); //이거 우리가 다시 한 번 봐야 됨
const kakao = require("./kakaoStrategy");
const User = require("../models/user"); //이거 우리가 다시 한 번 봐야 됨
const naver = require("./naverStrategy");

module.exports = () => {
  //로그인 성공시 실행. req.session객체에 어떤 데이터를 저장하는지 정하는 메소드. 사용자 객체의 전부를 세션에 아이디 저장.
  passport.serializeUser((user, done) => {
    console.log("serialize",user);
    done(null, user.id);
  });

  //저장된 세션 확인 후 사용자의 정보객체load.
  //session에 저장된 값(우리는 이메일)을 이용해서, 사용자 Profile을 찾은 후, HTTP Request 리턴
  passport.deserializeUser((email, done) => {
    console.log("deserialize");
    User.findOne({
      where: { email },
      // include: [
      //   {
      //     model: User,
      //     attributes: ["id", "nick"],
      //     as: "Followers",
      //   },
      //   {
      //     model: User,
      //     attributes: ["id", "nick"],
      //     as: "Followings",
      //   },
      // ],
    })
      .then((user) => {
        console.log("user", user);
        done(null, user);
      })
      .catch((err) => done(err));
  });


//serialize시에 session에서는 user.id인 사용자 id값만 저장하고,
//deserialize시에는 session에 저장된 id를 이용해서, DB에 매번 사용자 정보를 select하게 할 수도 있다.
//이렇게 하게 되면, 실제 Session에 저장되는 데이타가 적어서 메모리는 어느 정도 절약할 수 있지만, 페이지 접근시마다 매번 DB select가 발생하기 때문에 성능에 많은 저하가 오기 때문에 장단이 있음.
//아주 큰 데이타를 넣지 않는 이상 10~20개정도의 필드는 HTTP Session에 저장해도 큰 문제가 없기 때문에, 사용자 로그인 데이타를 모두 serialize시에 session에 넣는 게 나을 것.
//만약에 데이타가 너무 많아서 메모리 사용량이 우려될 경우에는 redis와 같은 외부 메모리 DB를 이용해서 session 정보를 저장하도록 하는 방법을 사용


  local();
  kakao();
  naver();
};
