<template>
  <div>
    <!-- ***** Breadcumb Area Start ***** -->
    <div
      class="breadcumb-area bg-img bg-overlay"
      style="background-image: url(img/bg-img/hero-1.jpg)"
    ></div>
    <!-- ***** Breadcumb Area End ***** -->

    <!-- ***** Contact Area Start ***** -->
    <div
      class="dorne-contact-area d-md-flex container"
      style="padding-top: 43px"
      id="contact"
    >
      <!-- 버튼부분-->
      <div style="width: 20%">
        <div class="leftsidebar" style="width: 20%; padding-top: 30%">
          <button
            type="button"
            id="mypage_button"
            style="max-width: 20px; color: red"
            @click="Mypage_Link"
          >
            내정보
          </button>
          <button
            type="button"
            id="mypage_button"
            style="max-width: 20px"
            @click="My_reservation_Link"
          >
            예약내역
          </button>
          <button
            type="button"
            id="mypage_button"
            style="max-width: 20px"
            @click="My_Delete_Link"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
      <!-- 여기가 오른쪽에 있는 내용 -->
      <div
        class="contact-form-area equal-height container"
        style="padding-top: 6%"
      >
        <div class="contact-text">
          <h1>회원 정보 수정</h1>
          <div style="position: relative; left: 30%">
            <div class="field2" id="sign">
              <b>닉네임</b><br />
              <input
                type="text"
                id="nickname"
                role="textbox"
                placeholder="닉네임을 입력해 주세요."
                v-model="nickname"
              />
              <button id="crosscheck" onclick="validateNickname()">
                중복확인
              </button>
              <p v-if="duplicateMessage">{{ duplicateMessage }}</p>
            </div>
            <div class="field2">
              <b>비밀번호</b><br />
              <input
                class="userpw"
                id="password"
                type="password"
                role="textbox"
                placeholder="비밀번호를 입력해 주세요."
              />
              <div id="passwordError" class="error"></div>
            </div>
            <div class="field2">
              <b>비밀번호 재확인</b><br />
              <input
                class="userpw-confirm"
                id="passwordCheck"
                type="password"
                role="textbox"
                placeholder="비밀번호를 입력해 주세요."
              />
              <div id="passwordCheckError" class="error"></div>
            </div>
            <!-- 5. 이메일_전화번호 -->
            <div class="field2 tel-number">
              <b>휴대전화</b>
              <div>
                <input
                  id="phone1"
                  type="text"
                  size="1"
                  maxlength="3"
                  oninput="changePhone1()"
                  role="textbox2"
                />-
                <input
                  id="phone2"
                  type="text"
                  size="3"
                  maxlength="4"
                  oninput="changePhone2()"
                  role="textbox2"
                />-
                <input
                  id="phone3"
                  type="text"
                  size="3"
                  maxlength="4"
                  oninput="changePhone3()"
                  role="textbox2"
                />
                <div id="phoneError" class="error"></div>
              </div>
              <div class="auth">
                <div id="certificationNumber">000000</div>
                <button disabled id="sendMessage" onclick="getToken()">
                  인증번호 전송
                </button>
              </div>
              <div class="timer">
                <div id="timeLimit">03:00</div>
                <button disabled id="completion" onclick="checkCompletion()">
                  인증확인
                </button>
              </div>
            </div>
            <div class="field2">
              <b>주소</b><br />
              <input
                type="text"
                id="sample6_postcode"
                placeholder="우편번호"
                role="textbox"
              />
              <button onclick="sample6_execDaumPostcode()" id="findad">
                우편번호찾기</button
              ><br />
              <input
                type="text"
                id="sample6_address"
                placeholder="주소"
                role="textbox2"
              /><br />
              <input
                type="text"
                id="sample6_detailAddress"
                placeholder="상세주소"
                role="textbox"
              /><br />
              <input
                type="text"
                id="sample6_extraAddress"
                placeholder="참고항목"
                role="textbox"
              />
              <div id="addressError" class="error"></div>
            </div>

            <div style="position: relative; left: 125px; top: 30px">
              <button id="addallow" onclick="signUpCheck()">수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main" style="width: 20%"></div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      originalNickname: "기존 닉네임",
      newNickname: "",
      duplicateMessage: "",
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    Mypage_Link() {
      this.$router.push({ path: "/mypage" });
    },
    My_reservation_Link() {
      this.$router.push({ path: "/my_reservation" });
    },
    mypage_pw_check_Link() {
      this.$router.push({ path: "/mypage_pw_check" });
    },
    My_Delete_Link() {
      this.$router.push({ path: "/my_delete" });
    },

    checkDuplicate() {
      // 서버로 닉네임 중복 여부 확인 요청
      // 아래는 가상의 비동기 함수로 가정합니다. 실제로는 서버와의 통신을 구현해야 합니다.
      this.duplicateMessage = "확인 중...";

      // 비동기 요청 예시 (실제로는 서버 API 호출 등으로 대체해야 함)
      setTimeout(() => {
        const isDuplicate = this.simulateDuplicateCheck(this.nickname);
        if (isDuplicate) {
          this.duplicateMessage = "닉네임이 이미 사용 중입니다.";
        } else {
          this.duplicateMessage = "닉네임을 사용할 수 있습니다.";
        }
      }, 1000);
    },
    simulateDuplicateCheck(nickname) {
      // 가상의 중복 확인 메서드
      const existingNicknames = ["user1", "user2", "user3"];
      return existingNicknames.includes(nickname);
    },
    updateNickname() {
      // 닉네임 변경 로직을 구현합니다.
      // 여기에서 서버로 닉네임을 전송하고 변경을 처리합니다.
      // 입력된 데이터를 활용하여 서버에 요청을 보내는 코드를 작성해야 합니다.
      // 예시로는 간단한 메시지만 출력합니다.
      console.log("닉네임을 변경합니다.");
      console.log("새로운 닉네임:", this.newNickname);
    },
  },
};
</script>
