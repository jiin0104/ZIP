<template>
  <body>
    <div class="find-wrap">
      <!-- 탭 변경 -->
      <div class="findid-html">
        <input id="tab-1" type="radio" name="tab" class="findid" checked /><label for="tab-1" class="tab">아이디 찾기</label>
        <input id="tab-2" type="radio" name="tab" class="findpw" /><label for="tab-2" class="tab">비밀번호 찾기</label>
        <!-- 아이디,비번찾기 div -->
        <div class="findid-form">
          <!-- 아이디 찾기 폼 -->
          <div class="findid-htm">
            <div class="group">
              <br />
              <label for="user" class="label">전화번호</label>
              <input id="user" type="text" class="input" />
            </div>
            <div class="group">
              <input type="submit" class="button" value="아이디 찾기" href="#"  onclick="findId()" style="text-align: center;"/>
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <a href="/signUp">아직 회원이 아니세요?</a>
            </div>
          </div>
          <!-- 비밀번호 찾기 폼 -->
          <div class="findpw-htm">
            <div class="group">
              <br />
              <label for="user" class="label">아이디(이메일)</label>
              <input id="user" type="text" class="input" />
            </div>
            <div class="group">
              <label for="pass" class="label">인증번호</label>
              <input id="pass" type="password" class="input" data-type="password" />
            </div>
            <div class="group">
              <input type="submit" class="button" value="비밀번호 찾기" href="#" onclick="alert('아이디와 인증번호를 확인해주세요')" style="text-align: center;"/>
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <RouterLink to="/Signup"><span>아직 회원이 아니세요?</span></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style src="./Find_IdPw.css"></style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      phoneNumber: "",
      id: "",
      errorMessage: "", // 경고 메시지를 담을 변수
    };
  },
  methods: {
    findId() {
      // 서버에 아이디 찾기 요청 보내기
      axios.post("/findId", { phoneNumber: this.phoneNumber })
        .then((response) => {
          const { id } = response.data;//서버 응답에서 아이디 받기
          if (id) {
            this.id = id;
            this.errorMessage = ""; // 일치하는 아이디가 있을 경우 경고 메시지 없음
            this.RouterLink
          } else {
            this.id = "";
            this.errorMessage = "가입된 아이디가 없습니다."; // 일치하는 아이디가 없을 경우 경고 메시지 설정
          }
        })
        .catch((error) => {
          console.error(error);
        });
        
    },
  },
};
</script>

