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
          <div style="position: relative; left: 33%">
            <div class="res-content">
              <img src="hotel.jpg" class="room-image" />
              <strong style="font-size: 17px"
                ><!--{{ ACCOMMODATIONS.ACCO_NAME}}--></strong
              >
              <div style="position: relative; left: 60px">
                <button
                  id="button2"
                  style="display: inline-block"
                  onclick="openModal()"
                >
                  상세내역
                </button>
                <button
                  id="button3"
                  onclick="showConfirmation()"
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
                  <button id="button7" onclick="hideConfirmation()">
                    취소
                  </button>
                </div>
                <div class="popup-buttons">
                  <button id="button8" onclick="cancelReservation()">
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
                <strong>(숙소명)</strong>
                <span>(방타입)</span>
              </div>
              <section>
                <div>
                  <p><strong>체크인</strong> (년.월.일.요일.체크인시간)</p>
                  <p><strong>체크아웃</strong> (년.월.일.요일.체크아웃시간)</p>
                </div>
                <div>
                  <p><strong>예약번호</strong> (예약번호나열)</p>
                  <p><strong>예약자 이름</strong> (예약자 이름)</p>
                </div>
              </section>
              <div class="total">
                <div class="payment-info">
                  <div class="payment-info-top">
                    <p><strong>총 결제 금액</strong></p>
                  </div>
                  <div class="payment-info-middle">
                    <p><b>(****,***원)</b></p>
                  </div>
                </div>
              </div>
              <a href="tel:(전화번호)" class="btn-call">전화문의하기</a>
              <section>
                <p>
                  <input type="button" value="닫기" onclick="closeModal()" />
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
