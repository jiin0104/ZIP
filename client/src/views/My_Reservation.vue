<template>
  <div>
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
          <div v-if="reslist == null" class="reslistempty">
            <div class="really2">
              예약 내역이 없습니다<br />관심있는 숙소를 예약해주세요
            </div>
            <br />
            <button type="button" id="main" @click="main_link">
              지금 바로 숙소 예약하기
            </button>
          </div>

          <div v-else style="position: relative; left: 18%" v-for="(rs, i) in reslist" :key="i">
            <div class="res-content">
              <img :src="`/download/${rs.ACCO_ID}/${rs.ACCO_IMAGE}`" class="room-image"
                style="display: block; margin-bottom: 0; " />
              <strong style="font-size: 17px;">{{
                rs.RESERVATION_NAME
              }}</strong>
              <div style="position: relative; left: 69px">
                <button id="button2" style="display: inline-block" @click="openModal()">
                  상세내역
                </button>
                <button id="button3" @click="showConfirmation()" style="display: inline-block">
                  예약취소
                </button>
              </div>
              <div id="popup" class="popup" style="display: none; left: 30px; top: 50px">
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
          <div class="modal-content" v-for="(rs, i) in reslist" :key="i">
            <div class="reslistpopup">
              <h2>예약완료 내역</h2>
              <div>
                <strong>숙소 이름: {{ rs.RESERVATION_NAME }}</strong>
              </div>
              <section>
                <div>
                  <p>
                    <strong>체크인</strong> {{ rs.RESERVATION_CHECK_IN }}
                  </p>
                  <p>
                    <strong>체크아웃</strong>
                    {{ rs.RESERVATION_CHECK_OUT }}
                  </p>
                </div>
                <div>
                  <p><strong>예약번호</strong> {{ rs.RESERVATION_ID }}</p>
                  <p>
                    <strong>예약자 휴대폰 번호</strong> {{ rs.USER_TEL }}
                  </p>
                  <p>
                    <strong>숙박인원</strong> {{ rs.RESERVATION_CAPACITY }}
                  </p>
                </div>
              </section>
              <div class="total">
                <div class="payment-info">
                  <div class="payment-info-top">
                    <p><strong>총 결제 금액</strong></p>
                  </div>
                  <div class="payment-info-middle">
                    <p>
                      <b>{{ rs.PAYMENT_TOTAL_PRICE }}</b>
                    </p>
                  </div>
                </div>
              </div>
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
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"; //프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      reslist: [],
    };
  },
  mounted() {
    //페이지가 실행되자마자 작동시킬함수 정의
    this.Get_Reservation_Info();
  },

  methods: {
    //라우터
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

    async Get_Reservation_Info() {
      this.reslist = await this.$api("/api/reslist", []);

      //console.log(this.reslist);
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

  },
};
</script>
<style>
@import "Mypage.css";
</style>
