<template>
  <body>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form class="login100-form validate-form" @submit.prevent="" >
            <div
              class="wrap-input100 validate-input m-b-23"
              data-validate="Username is required"
            >
              <span class="label-input100">이메일(아이디)</span>
              <input
                class="input100"
                type="email"
                name="username"
                placeholder="이메일을 입력하세요"
                v-model="userId"
                required
              />
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span class="label-input100">비밀번호</span>
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="비밀번호를 입력하세요"
                v-model="userPw"
                autocomplete="off"
                required
              />
            </div>

            <div class="text-right p-t-8 p-b-31">
              <a style="text-decoration: none">
                <p style="text-align: right" link="" href="#">
                    <RouterLink to="Find_IdPw">아이디/비밀번호 찾기</RouterLink>
                </p>
              </a>
            </div>

            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>

                <button class="login100-form-btn" @click="login">
                  <a style="text-decoration: none" href="#">
                    <p
                      style="margin-top: 15px; color: white; text-align: center"
                    >
                      <b>로그인</b>
                    </p>
                  </a>
                </button>
              </div>
            </div>
            <br>
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn2"></div>

                <button class="login100-form-btn" @click="kakaoLogin">
                  <a style="text-decoration: none" href="#">
                    <p
                      style="margin-top: 15px; color: rgb(0, 0, 0); text-align: center"
                    >
                      <b>카카오 로그인</b>
                    </p>
                  </a>
                </button>
              </div>
            </div>

            <div class="flex-col-c p-t-155" style="text-align: right">
              <span class="txt1 p-b-17">
                아직 탈출할 준비가 되지 않으셨다면?
              </span>

              <a href="#" class="txt2">
                <p link="" style="text-align: right">
                  <RouterLink to="/Signup"><b>회원가입</b></RouterLink>
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

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000'; //서버주소
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  name: "Login",
  data() {
    return {
      userId: null,
      userPw: null,
    };
  },
  computed: {},
  methods: {
  login(){
    axios({
      url:"/api/login",
      method: 'POST',
      data:{
        userId: this.userId,
        userPw: this.userPw
      },
    })
    .then(res => {
      console.log(res.data.message);
      // 서버에서 받아오는 로그인 정보
      if(res.data.message == 'undefined_id') {
        alert("아이디 혹은 비밀번호가 맞지 않습니다.")
      }
      else if (res.data.message == 'incorrect_pw') {
        alert("아이디 혹은 비밀번호가 맞지 않습니다.")
      }
      else {
        // store로 유저 정보 넘김
        this.$store.commit("localUser", { userId: this.userId, userGd: res.data.message })
          alert("로그인 성공!")
          this.$router.push({path:'/'}); // 메인 컴포넌트 이동
          this.$store.commit('loginSuccess') // isLogin 상태 변환
      }
    })
    .catch(err => {
      console.log(err);
      alert("아이디 및 비밀번호를 입력해주세요.")
    })
  },

    // 카카오 간편 로그인
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_image, account_email",
        success: this.getKakaoAccount,
      });
    },
    // 카카오 계정 정보 받아옴
    getKakaoAccount(authObj) {
      // authObj라는 이름으로 파라메터 받아오기
      console.log(authObj);
      window.Kakao.API.request({
        //로그인 유저 정보 가져오기
        url: "/v2/user/me",
        success: res => {
          // 성공시 콜백 함수
          const kakao_account = res.kakao_account; // 로그인한 유저 계정 정보 받아오기
          console.log(kakao_account); // 계정 정보 확인
          this.kakao_login(kakao_account); // 계정 정보를 kakao_login으로 보내줌
          this.$store.commit("user", kakao_account); // store로 유저 정보 보관
          this.$router.push({path:'/'}); // 메인페이지로 라우팅
          alert("로그인 성공!");
          // 로그인 상태
          this.$store.commit('loginSuccess') // isLogin 상태 변환
        },
      });
    },
    async kakao_login(kakao_account) {
      // login겸  signup
      await this.$api("/api/kakaoLogin", {
        // 계정 정보를 kakaoLogin sql로 보냄
        param: [
          { USER_ID: kakao_account.email, USER_NICKNAME: kakao_account.profile.nickname, USER_LOGIN_TYPE: 'kakao' }
          ]
      });
      this.$store.commit("user", kakao_account); // vuex를 이용, 상태관리하도록 store에 user 정보 갱신
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("user", {}); // store에 담긴 user 정보의 data를 null값으로 만듦
        alert("로그아웃");
        this.$router.push({path:'/'}); // 로그아웃 이후 메인 페이지로 라우팅
      });
    }
  },
};
</script>

<style>
div {
  text-align: left;
}
</style>
