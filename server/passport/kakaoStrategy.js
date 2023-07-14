const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

// const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        //카카오에서 일치하는 아이디를 찾아서 로그인 검토
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {//있으면 로그인
        done(null, exUser);
      } else {//가입이 안되 있으면 회원가입 시키고 로그인
        const newUser = await User.create({
          email: profile._json?.kakao_account?.email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
