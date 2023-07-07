const passport = require("passport");
const local = require("./localStrategy"); //이거 우리가 다시 한 번 봐야 됨
const kakao = require("./kakaoStrategy");
const User = require("../models/user"); //이거 우리가 다시 한 번 봐야 됨
const naver = require("./naverStrategy");

module.exports = () => {
  //로그인 시 실행. req.session객체에 어떤 데이터를 저장하는지 정하는 메소드.
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize");
    User.findOne({
      where: { id },
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

  local();
  kakao();
  naver();
};
