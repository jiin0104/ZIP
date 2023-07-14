//로컬 로그인 로직인데 수정, 검토 해야됨

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',//웹페이지의 이메일 입력 부분을 가져옴
    passwordField: 'password',//웹페이지의 비밀번호 부분을 가져옴
    passReqToCallback: false,//인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정.
    //우리는 db에서 조회해서 인증검토를 해야되니까 false
  }, async (email, password, done) => {//로컬 로그인 시 이메일(아이디),비밀번호 사용
    try {
      const exUser = await User.findOne({ where: { email } });//findone으로 db에서 이메일 기준으로 유저 있는지 찾아봄
      if (exUser) {//있다면, 비밀번호들을 암호화 하고, 비밀번호가 일치하는지 검토.
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
