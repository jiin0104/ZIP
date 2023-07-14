<template>
  <body>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form class="login100-form validate-form" @submit.prevent="login">
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
                v-model="l_user.USER_ID"
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
                v-model="l_user.USER_PASSWORD"
                required
              />
            </div>

            <div class="text-right p-t-8 p-b-31">
              <a href="#" style="text-decoration: none">
                <RouterLink to="Find_IdPw">
                  <p style="text-align: right" link="">아이디/비밀번호 찾기</p>
                </RouterLink>
              </a>
            </div>

            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>

                <button class="login100-form-btn">
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

            <div class="flex-c-m">
              <!-- 각 버튼을 누르면 api로 작동하게 후에 백엔드 코드 짜고서 추가 -->
              <br />
              <!-- 네이버 로그인 -->
              <div
                id="naverIdLogin"
                style="margin-right: 20px; margin-left: 2px"
              >
                <a
                  href="#"
                  class="login100-social-item bg2"
                  style="text-decoration: none"
                >
                </a>
              </div>
              <!-- 카카오 로그인 -->
              <a href="#" @click="kakaoLogin()">
                <img style="width: 225px" src="./kakao_login2.png" alt="" />
              </a>
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

<style>
#naverIdLogin {
  width: 250px;
  height: 70px;
  object-fit: cover;
  float: left;
}
</style>

<script>
import axios from "axios";

export default {
  //네이버 로그인
  name: "naverLogin",
  data() {
    return {
      l_user: {
        USER_ID: "",
        USER_PASSWORD: "",
      },
      naverLogin: null,
    };
  },
  mounted() {
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: "8NWAD60RgqNbWdmXePhg", // 네이버 앱 키
      callbackUrl: "http://localhost:8080/login", // 콜백 url
      isPopup: true, // 팝업으로 띄우기
      loginButton: {
        color: "green",
        height: 40,
        type: 3,
      },
    });

    //설정 정보 초기화하고 연동 준비
    this.naverLogin.init();

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(status);
        console.log(this.naver.user);

        //필수적으로 받아야할 프로필 정보가 있으면,callback처리 시점에 체크.
        var email = this.naverLogin.user.getEmail();
        if (email == undefined || email == null) {
          alert("이메일은 필수 정보입니다. 정보 제공을 동의해주세요.");
          //사용자 정보 동의를 다시 받아야하기 때문에 동의 페이지로 이동
          this.naverLogin.reprompt();
          return;
        }
      } else {
        // console.log("callback 처리에 실패했습니다.");
      }
    });
  },
  //네이버는 회사내부의 안보규정으로 별도의 로그아웃 api를  제공하지 않음.
  //직접 코드 짜서 토큰 삭제로 로그아웃 처리. 다만,axios를 이용해서 메소드 호출하면,cors 에러 뜸. vue.config.js에 프록시 등록해서 사용.
  naverLogout() {
    const accessToken = this.naverLogin.accessToken.accessToken;
    const url = `/oauth2.0/token?grant_type=delete%client_id={8NWAD60RgqNbWdmXePhg}&client_secret={bnEH07OqTy}&access_token=${accessToken}&service_provider=NAVER`;
    //https://nid.naver.com//oauth2.0/token?grant_type=delete%client_id={발급받은 클라이언트 아이디}&client_secret={발급받은 클라이언트 시크릿}&access_token={로그인시 발급받은 토큰}&service_provider=NAVER

    axios.get(url).then((res) => {
      console.log(res.data);
    });
  },

  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },

  methods: {
    async login() {    
      await this.$api("/api/login", { user: this.l_user }) // l_user 데이터를 login sql를 통해 확인
        .then(() => {
          alert("로그인 성공!"); // api가 정상적으로 작동할 시 해당 alert를 띄움
          this.$router.push({ path: "/" }); // 메인페이지로 라우팅
          this.$store.commit("user", this.l_user); // vuex를 이용하여 상태 관리하도록 store에 user 정보를 갱신
        })
        .catch(() => {
          // api 오류 발생 시 해당 alert 띄움
          alert("계정 정보를 확인해주세요.");
        });
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
          this.$store.state.isLogin = true // 헤더 로그인 상태로 변환
        },
      });
    },
    async kakao_login(kakao_account) {
      // login겸  signup
      await this.$api("/api/kakaoLogin", {
        // 계정 정보를 kakaoLogin sql로 보냄
        param: [
          { email: kakao_account.email, name: kakao_account.profile.nickname },
          { name: kakao_account.profile.nickname },
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
