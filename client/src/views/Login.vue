<template>
  <body>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form class="login100-form validate-form" @submit.prevent="fnLogin">
            <div class="wrap-input100 validate-input m-b-23" data-validate="Username is required">
              <span class="label-input100">이메일(아이디)</span>
              <input class="input100" type="text" name="username" placeholder="이메일을 입력하세요" v-model="user_id" />
            </div>

            <div class="wrap-input100 validate-input" data-validate="Password is required">
              <span class="label-input100">비밀번호</span>
              <input class="input100" type="password" name="pass" placeholder="비밀번호를 입력하세요" v-model="user_pw" />
            </div>

            <div class="text-right p-t-8 p-b-31">
              <a href="#" style="text-decoration: none;">
                <RouterLink to="Find_IdPw">
                  <p style="text-align: right;" link="">아이디/비밀번호 찾기</p>
                </RouterLink>
              </a>
            </div>

            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>

                <button class="login100-form-btn">
                  <a style="text-decoration: none;" href="#">
                    <p style="margin-top: 15px; color: white; text-align: center;">
                      <b>로그인</b>
                    </p>
                  </a>
                </button>
              </div>
            </div>

            <div class="flex-c-m">
              <!-- 각 버튼을 누르면 api로 작동하게 후에 백엔드 코드 짜고서 추가 -->
              <br />
              <!-- 네이버 로그인 -->
              <div id="naverIdLogin" style="margin-right: 20px; margin-left: 2px;">
                <a href="#" class="login100-social-item bg2" style="text-decoration: none;">
                </a>
              </div>
              <!-- 카카오 로그인 -->
              <a href="#" @click="kakaoLogin()">
                <img style="width: 225px;" src="./kakao_login2.png" alt="">
              </a>
            </div>
            <div class="flex-col-c p-t-155" style="text-align: right;">
              <span class="txt1 p-b-17">
                아직 탈출할 준비가 되지 않으셨다면?
              </span>

              <a href="#" class="txt2">
                <p link="" style="text-align: right;">
                  <RouterLink to='/Signup'><b>회원가입</b></RouterLink>
                </p>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<style src="./Login.css"></style>

<style>
#naverIdLogin {
  width: 250px;
  height: 70px;
  object-fit: cover;
  float: left;
}
</style>

<script>
// import axios from "axios";

export default {
  name: 'log',
  data() {
    return {
      user_id: null,
      user_pw: null,
      naverLogin: null,
    };
  },
  mounted() {
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: "8NWAD60RgqNbWdmXePhg", // 네이버 클라이언트 아이디
      callbackUrl: "http://localhost:8080/login", // 콜백 url
      isPopup: false, // 팝업 연동처리 여부
      loginButton: {
        color: "green", height: 40, type: 3
      },
    });

    this.naverLogin.init();

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(status);
        console.log(this.naver.user);

        var email = this.naverLogin.user.getEmail();
        if (email == undefined || email == null) {
          alert("이메일은 필수 정보입니다. 정보 제공을 동의해주세요.");
          this.naverLogin.reprompt();
          return;
        }
      } else {
        console.log("callback 처리에 실패했습니다.");
      }
    });
  },
  methods: {
    fnLogin() {
      if (this.user_id === null) {
        alert('이메일을 입력하세요.')
        return
      }

      if (this.user_pw === null) {
        alert('비밀번호를 입력하세요.')
        return
      }

      alert('로그인 되었습니다.')
    },

    // 카카오 간편 로그인
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_image, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: res => {
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.nickname;
          const email = kakao_account.email
          console.log('nickname', nickname);
          console.log('email', email);

          alert("로그인 성공!");
        },
        fail: error => {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style>
div {
  text-align: left;
}
</style>