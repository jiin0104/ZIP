<template>
  <div>
    <!-- ***** Breadcumb Area Start ***** -->
    <div
      class="breadcumb-area bg-img bg-overlay"
      style="background-image: url(img/bg-img/hero-1.jpg)"
    ></div>
    <!-- ***** Breadcumb Area End ***** -->

    <div
      class="reservation"
      style="justify-content: center; text-align: center"
    >
      <h5 class="reservation-title">
        <button class="reservation-button"></button> 예약 안내
      </h5>
      <div class="reservation-info">
        탈출러 고객님 안녕하세요.<br />
        확정된 예약내용 안내드립니다.
        <br />
        <br />
        <br />
        <h6>[예약 호텔 정보]</h6>

        <div class="reservation-info">
          <p>
            예약 호텔:
            <span class="reservation-hotel"
              ><!--{{ RESERVATION.RESERVATION_NAME }}--></span
            >
          </p>
          <p>
            체크인 날짜:
            <span class="reservation-date"><!--{{ RESERVATION.RESERVATION_CHECK_IN }}--></span
            >
            체크아웃 날짜:
            <span class="reservation-date"
              ><!--{{ RESERVATION.RESERVATION_CHECK_OUT }}--></span
            >
          </p>
          <p>
            예약 번호:
            <span class="reservation-number"
              ><!--RESERVATION.RESERVATION_ID-->></span
            >
          </p>
        </div>
        <br />
        <br />
        <h6>이제 숙소 예약이 완료되었습니다</h6>
        <h6>즐거운 시간 보내세요!</h6>
        <br /><button
          id="infobutton"
          style="display: inline-block"
          @click="main_Link"
        >
          메인 페이지로
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      sampleData: "",
    };
  },
  methods: {
    main_Link() {
      this.$router.push({ path: "/main_link" });
    },
  },
};
</script>
<style>

</style>