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
            style="max-width: 20px"
            @click="Mypage_Link"
          >
            내정보
          </button>
          <button
            type="button"
            id="mypage_button"
            style="max-width: 20px; color: red"
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
          <h1>예약내역</h1>
          <div v-if="res_acco == null" class="reslistempty">
            <div class="really2">
              예약 내역이 없습니다<br />관심있는 숙소를 예약해주세요
            </div>
            <br />
            <button type="button" id="main" @click="main_link">
              지금 바로 숙소 예약하기
            </button>
          </div>
          <div v-else style="position: relative; left: 33%">
            <div class="res-content">
              <!--<img
                src="'/download/${ACCO_ID}/${ACCO_IMAGE}'"
                class="room-image"
              />-->
              <img
                class="lazy"
                src="//image.goodchoice.kr/resize_1000X500x0/affiliate/2023/06/16/648c25cfa5a22.jpg"
                style="display: block"
              />
              <strong style="font-size: 17px">{{ ACCO_NAME }}</strong>
              <div style="position: relative; left: 60px">
                <button
                  id="button2"
                  style="display: inline-block"
                  @click="openModal()"
                >
                  상세내역
                </button>
                <button
                  id="button3"
                  @click="showConfirmation()"
                  style="display: inline-block"
                >
                  예약취소
                </button>
              </div>
              <div id="popup" class="popup" style="display: none">
                <p class="popup-message" style="font-size: 18px">
                  예약을 취소하시겠습니까?
                </p>
                <div class="popup-buttons">
                  <button id="button7" @click="hideConfirmation()">취소</button>
                </div>
                <div class="popup-buttons">
                  <button id="button8" @click="cancelReservation()">
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="modal" class="modal">
          <div class="modal-content">
            <div class="reslistpopup">
              <h2>이용완료 내역</h2>
              <div>
                <strong>{{ ACCO_NAME }}</strong>
                <span>{{ ACCO_TYPE }}</span>
              </div>
              <section>
                <div>
                  <p><strong>체크인</strong> {{ RESERVATION_CHECK_IN }}</p>
                  <p><strong>체크아웃</strong> {{ RESERVATION_CHECK_OUT }}</p>
                </div>
                <div>
                  <p><strong>예약번호</strong> {{ RESERVATION_ID }}</p>
                  <p><strong>예약자 이름</strong> {{ USER_ID }}</p>
                </div>
              </section>
              <div class="total">
                <div class="payment-info">
                  <div class="payment-info-top">
                    <p><strong>총 결제 금액</strong></p>
                  </div>
                  <div class="payment-info-middle">
                    <p>
                      <b>{{ PAYMENT_TOTAL_PRICE }}</b>
                    </p>
                  </div>
                </div>
              </div>
              <a href="{{ RESERVATION_TEL }}" class="btn-call">전화문의하기</a>
              <section>
                <p>
                  <input type="button" value="닫기" @click="closeModal()" />
                </p>
              </section>
            </div>
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
      // user 정보를 담을 리스트
      ACCO_NAME: "",
      ACCO_TYPE: "",
      RESERVATION_CHECK_IN: "",
      RESERVATION_CHECK_OUT: "",
      PAYMENT_TOTAL_PRICE: "",
      RESERVATION_TEL: "",
      ACCO_IMAGE: "",
      res_acco: [],
    };
  },
  mounted() {
    //페이지가 실행되자마자 작동시킬함수 정의
    this.Get_Reservation_Info();
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
      this.$router.push({ path: "/" });
    },

    //팝업
    showConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "block";
    },
    hideConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    },
    cancelReservation() {
      alert("예약이 취소되었습니다");
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    },

    //예약 모달
    openModal() {
      var modal = document.getElementById("modal");
      modal.style.display = "block";
    },

    closeModal() {
      var modal = document.getElementById("modal");
      modal.style.display = "none";
    },

    //
    Get_Reservation_Info() {
      this.ACCO_NAME = "이젠호텔";
      this.ACCO_TYPE = "호텔";
      this.RESERVATION_ID = "000001";
      this.USER_ID = "김지인";
      this.RESERVATION_CHECK_IN = "2023-07-07";
      this.RESERVATION_CHECK_OUT = "2023-07-08";
      this.PAYMENT_TOTAL_PRICE = "100,000원";
      this.RESERVATION_TEL = "010-1111-1111";
    },
  },
};
</script>
