<template>
  <v-main>
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
          <h1>내 정보</h1>
          <div class="user-info">
            <!-- 폼전송시 전달되는 data target element -->
            <input aria-hidden="true" type="hidden" name="uno" value="" />
            <p>
              <strong>아이디:<!--{{ USERS.USER_ID }}--></strong>
            </p>
            <p>
              <strong>닉네임:<!--{{ USERS.USER_NICKNAME }}--></strong>
            </p>
            <p>
              <strong>전화번호:<!--{{ USERS.USER_TEL }}--></strong>
            </p>
            <p>
              <strong
                >주소:<!--{{ USERS.USER_ADDRESS1 }}{{ USERS.USER_ADDRESS2 }}--></strong
              >
            </p>
            <br /><button
              id="infobutton"
              @click="mypage_pw_check_Link"
              style="display: inline-block"
            >
              정보수정
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>
<script>
export default {
  data() {
    return {};
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
  },
};
</script>
