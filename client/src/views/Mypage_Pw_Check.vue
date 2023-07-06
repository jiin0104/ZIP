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
          <h1>내 정보 수정</h1>
          <div style="height: 300px; position: relative; left: 20%">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label"
                >비밀번호 확인</label
              >
            </div>
            <div class="col-auto" style="display: inline-block">
              <input
                type="password"
                id="inputPassword6"
                class="form-control"
                aria-describedby="passwordHelpInline"
                v-model="rendom_pw"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style="
                position: relative;
                background-color: #0b5394;
                color: white;
              "
              @click="checkPassword()"
            >
              확인
            </button>
          </div>
          <div id="popup" class="popup" style="display: none">
            <p class="popup-message" style="font-size: 18px">
              비밀번호가 틀렸습니다
            </p>
            <div class="popup-buttons">
              <button id="button9" onclick="hideConfirmation()">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pwcheck",
  data() {
    return {
      user_pw: null,
      rendom_pw: null,
    };
  },

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
    My_Update_Link() {
      this.$router.push({ path: "/my_update" });
    },

    // checkPassword() {
    //   // 비밀번호 확인
    //   if (rendom_pw === user_pw) {
    //     My_Update_Link();
    //   } else {
    //     showConfirmation();
    //     return;
    //   }
    // },
  },
};
</script>
