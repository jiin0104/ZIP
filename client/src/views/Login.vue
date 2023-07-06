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
                <p style="text-align: right;" link="">아이디/비밀번호 찾기</p>
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
            <br />
            <div class="flex-c-m">
              <!-- 각 버튼을 누르면 api로 작동하게 후에 백엔드 코드 짜고서 추가 -->
              <a href="#" class="login100-social-item bg1" style="text-decoration: none;">
                <i class="fa fa-kakao"><b>카카오 로그인</b></i>
              </a>
              <br />
              <a href="#" class="login100-social-item bg2" style="text-decoration: none;">
                <i class="fa fa-naver"><b>네이버 로그인</b></i>
              </a>
            </div>

            <div class="flex-col-c p-t-155" style="text-align: right;">
              <span class="txt1 p-b-17">
                아직 탈출할 준비가 되지 않으셨다면?
              </span>

              <a href="#" class="txt2">
                <p link="" style="text-align: right;"><RouterLink to='/Signup'><b>회원가입</b></RouterLink></p>
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
export default {
  name: 'log',
  data() {
    return {
      user_id: null,
      user_pw: null,
    }
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
    }
  }
}
</script>