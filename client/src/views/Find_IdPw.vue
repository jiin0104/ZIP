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
              <label for="user" class="label">휴대전화번호</label>
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
              <label for="user" class="label">휴대전화번호</label>
              <input id="user2" type="text" class="input" v-model="phoneNumber" placeholder="휴대전화 번호를 입력하세요" />
              <input type="submit" class="button" value="인증번호 받기" href="#" style="text-align: center"
                @click="sendNumber()" />
            </div>
            <div class="group">
              <label for="pass" class="label">인증번호</label>
              <input id="pass" type="password" class="input" data-type="password" v-model="userInputVerificationCode" />
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
      verificationCode: "",
      userInputVerificationCode: "", // 사용자가 입력한 인증번호를 저장할 변수
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

    sendNumber() {
      const phoneNumber = this.phoneNumber; // 전화번호 입력 값
      console.log(phoneNumber);
      // 서버로의 API 요청
      axios
        .post("/checkPhoneNumber", { phoneNumber })
        .then((response) => {
          const exists = response.data.exists;
          console.log(exists);

          if (exists) {
            // 전화번호가 존재하는 경우, 인증번호가 함께 응답으로 받음.
            this.verificationCode = response.data.verificationCode;
            console.log("인증번호:", this.verificationCode);
            alert("인증번호를 발송했습니다.");
          } else {
            // 전화번호가 존재하지 않는 경우: 경고창 표시
            alert("회원가입되지 않은 전화번호입니다.");
          }
        })
        .catch((error) => {
          console.error("전화번호 확인 요청에 실패했습니다.", error);
        });
    },

    async findPw() {

      console.log("인증번호:", this.verificationCode);
      console.log("유저가 입력한 인증번호:", this.userInputVerificationCode);

      // 사용자가 입력한 인증번호와 서버에서 받아온 인증번호가 일치하는지 확인
      if (String(this.verificationCode) === String(this.userInputVerificationCode)) {
        try {
          // 서버에 비밀번호를 요청하는 API 호출
          const response = await axios.post("/findPassword", {
            phoneNumber: this.phoneNumber,
          });
          console.log(this.phoneNumber);

          // 서버로부터 받은 비밀번호를 저장
          this.password = response.data.password;
          console.log(this.password);

          // Find_Pw_Result.vue로 리다이렉트하면서 params로 비밀번호 전달
          this.$router.push({ name: "find_pw_result", params: { pw: this.password } });
        } catch (error) {
          console.error("비밀번호 요청에 실패했습니다.", error);
          this.errorMessage = "비밀번호 요청에 실패했습니다.";
        }
      } else {
        // 인증번호가 일치하지 않는 경우
        alert("인증번호를 확인해 주세요!");
      }
    },
  },
}
</script>
