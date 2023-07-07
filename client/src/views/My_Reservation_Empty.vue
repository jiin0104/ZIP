<template>
  <div>
    <!-- ***** Breadcumb Area Start ***** -->
    <div class="breadcumb-area bg-img bg-overlay" style="background-image: url(img/bg-img/hero-1.jpg)"></div>
    <!-- ***** Breadcumb Area End ***** -->

    <!-- ***** Contact Area Start ***** -->
    <div class="dorne-contact-area d-md-flex container" style="padding-top: 43px" id="contact">
      <!-- 버튼부분-->
      <div style="width: 20%">
        <div class="leftsidebar" style="width: 20%; padding-top: 30%">
          <button type="button" id="mypage_button" style="max-width: 20px" @click="Mypage_Link">
            내정보
          </button>
          <button type="button" id="mypage_button" style="max-width: 20px; color: red" @click="My_reservation_Link">
            예약내역
          </button>
          <button type="button" id="mypage_button" style="max-width: 20px" @click="My_Delete_Link">
            회원 탈퇴
          </button>
        </div>
      </div>
      <!-- 여기가 오른쪽에 있는 내용 -->
      <div class="contact-form-area equal-height container" style="padding-top: 6%">
        <div class="contact-text">
          <h1>예약내역</h1>
          <div class="reslistempty">
            <div class="really2">
              예약 내역이 없습니다<br />관심있는 숙소를 등록해주세요
            </div>
            <br />
            <button type="button" id="main" @click="main_link">
              지금 바로 숙소 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      RESERVATION_ID: "",
    };
  },

  mounted() {
    //페이지가 실행되자마자 작동시킬함수 정의
    this.Get_Reservation_empty_Info();
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
    main_link() {
      this.$router.push({ path: "/main" });
    },

    Get_Reservation_empty_Info() {
      if (this.RESERVATION_ID == !null) {
        this.My_reservation_Link();
      } else {
        console.log("예약없다");
        return;
      }
    },
  },
};
</script>

<style>
@import "Mypage.css";
</style>