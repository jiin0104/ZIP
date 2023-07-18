<template>
  <body>
    <div class="find-wrap">
      <!-- 탭 변경 -->
      <div class="findid-html">
        <input id="tab-1" type="radio" name="tab" class="findid" checked /><label for="tab-1" class="tab">아이디 찾기</label>
        <input id="tab-2" type="radio" name="tab" class="findpw" /><label for="tab-2" class="tab">비밀번호 찾기</label>
        <!-- 아이디,비번찾기 div -->
        <div class="findid-form" id="findform">
          <!-- 아이디 찾기 폼 -->
          <div class="findid-htm">
            <div class="group">
              <br />
              <label for="user" class="label">전화번호</label>
              <input id="user" type="text" class="input" v-model="phoneNumber" />
            </div>
            <div class="group">
              <input type="submit" class="button" value="아이디 찾기" href="#" @click="findId()" style="text-align: center" />
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <RouterLink to="/signup"><span>아직 회원이 아니세요?</span></RouterLink>
            </div>
          </div>
          <!-- 비밀번호 찾기 폼 -->
          <div class="findpw-htm">
            <div class="group">
              <br />
              <label for="user" class="label">아이디(이메일)</label>
              <input id="user" type="text" class="input" v-model="email" placeholder="인증 이메일을 받을 이메일을 입력하세요" />
              <input type="submit" class="button" value="인증 이메일 발송" href="#" style="text-align: center"
                @click="sendemail()" />
            </div>
            <div class="group">
              <label for="pass" class="label">인증번호</label>
              <input id="pass" type="password" class="input" data-type="password" v-model="password" />
            </div>
            <div class="group">
              <input type="submit" class="button" value="비밀번호 찾기" href="#" style="text-align: center" @click="findPw()" />
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <RouterLink to="/signup"><span>아직 회원이 아니세요?</span></RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style src="./Find_IdPw.css"></style>

<script>
import axios from "axios";


export default {
  data() {
    return {
      phoneNumber: "",
      id: "",
      errorMessage: "", // 경고 메시지를 담을 변수
      email: "",
      password: "",
    };
  },
  methods: {
    async findId() {
      // 서버에 아이디 찾기 요청 보내기
      try {
        const response = await axios.post("/findId", {
          phoneNumber: this.phoneNumber,
        });
        const { id } = response.data;

        if (id) {
          this.id = id;
          this.errorMessage = "";
          this.$router.push({ name: "find_id_result", params: { id } }); // 아이디가 있는 경우 find_id_result 페이지로 리다이렉트
          console.log(id); //정상적으로 서버에서 id값 받아오고 있는 거 확인 했음.
        } else {
          this.id = "";
          this.errorMessage = "가입된 아이디가 없습니다.";
          alert("가입된 아이디가 없습니다.");
          console.log(id); //정상적으로 서버에서 id값 받아오고 있는 거 확인
        }
      } catch (error) {
        console.error(error);
      }
    },

    sendemail() {
  
},


    findPw() { },
  },
};
</script>
