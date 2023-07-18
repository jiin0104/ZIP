<template>
  <div id="app4">
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
            <span class="reservation-hotel" style="font-family: Noto Sans KR; font-size: 18px; color: #848484;"
              >{{ reservation_info.ACCO_NAME }}</span
            >
          </p>
          <p>
            체크인 날짜:
            <span class="reservation-date"  style="font-family: Noto Sans KR; font-size: 18px; color: #848484;"
              >{{ reservation_info.RESERVATION_CHECK_IN }}</span
            >
          </p>
          <p>
            체크아웃 날짜:
            <span class="reservation-date" style="font-family: Noto Sans KR; font-size: 18px; color: #848484;"
            >{{ reservation_info.RESERVATION_CHECK_OUT }}</span
            >
          </p>
          <p>
            예약 번호:
            <span class="reservation-number" style="font-family: Noto Sans KR; font-size: 18px; color: #848484;"
              >{{reservation_info.RESERVATION_ID}}</span
            >
          </p>
        </div>
        <br />
        <br />
        <h6>결제가 완료되었습니다</h6>
        <h6>즐거운 시간 보내세요!</h6>
        <br /><button
          id="infobutton"
          style="display: inline-block; position: inherit;"
          @click="main_Link"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  el: "#app4",
  data() {
    return {
      reservation_info: {},
      ACCO_ID: 0,
      RESERVATION_ID: 0,
      totalPrice:0,
      d1y: ''
    };
  },
  created(){
    this.RESERVATION_ID = this.$route.query.RESERVATION_ID;
    this.ACCO_ID = this.$route.query.ACCO_ID;
    
    this.Reservation();
  },
  methods: {
    async Reservation(){
      // let GetReservation = await this.$api("/api/GetReservation", {param:[this.RESERVATION_ID]});
      let reservation_info = await this.$api("/api/reservation_info", {});
      this.reservation_info = reservation_info[0];

      console.log(this.reservation_info);
    },

    main_Link() {
      const formData = {
        check_in: this.check_in,
        check_out: this.d2y,
        reservation_status: '결제완료',
      };
      axios.post('/reservation_info', formData)
      .then(response => {
        if(response.data.message){
          console.log(formData);
          location.href = "/";
        } else {
          alert('뭔가 오류가 있음');
          console.log(formData);
        }
      })
      .catch(error => {
          console.error('뭔가가 실패', error);
          alert('뭔가가 실패. 확인 후 다시 시도해 주세요');
        });
    },
  },
};
</script>
<style>
@import "Reservation_Info.css";
</style>
