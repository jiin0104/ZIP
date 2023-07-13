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

        <div class="reservation-info" style="" >
          <p>
            예약 호텔:
            <span class="reservation-hotel"
              >{{ GetReservation.RESERVATION_NAME }}</span
            >
          </p>
          <p>
            체크인 날짜:
            <span class="reservation-date"
              >{{ GetReservation.RESERVATION_CHECK_IN }}</span
            >
          </p>
          <p>
            체크아웃 날짜:
            <span class="reservation-date"
              >{{ GetReservation.RESERVATION_CHECK_OUT }}</span
            >
          </p>
          <p>
            예약 번호:
            <span class="reservation-number"
              >{{GetReservation.RESERVATION_ID}}</span
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
  data() {
    return {
      GetReservation: "",
    };
  },
  created(){
    this.RESERVATION_ID = this.$route.query.RESERVATION_ID;
    this.Reservation();
  },
  methods: {
    async Reservation(){
      let GetReservation = await this.$api("/api/GetReservation", {param:[this.RESERVATION_ID]});
      this.GetReservation = GetReservation[0];
    },

    main_Link() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style>
@import "Reservation_Info.css";
</style>
