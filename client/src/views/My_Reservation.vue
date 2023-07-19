<template>
  <div>
    <!-- ***** Contact Area Start ***** -->
    <div class="dorne-contact-area d-md-flex container" style="padding-top: 43px; padding-bottom: 400px;" id="contact">
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
            <div class="res-content" style="height: 350px;">
              <img :src="`/download/${rs.ACCO_ID}/${rs.ACCO_IMAGE}`" class="room-image"
                style="display: block; margin-bottom: 0; border: white;" />
              <strong style="font-size: 18px">{{ rs.ACCO_NAME }}</strong>
              <div style="position: relative; left: 69px; margin: 10px">
                <button id="button2" style="display: inline-block" @click="openModal(rs)">
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
                  <button id="button8" @click="cancelReservation(rs)">
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal" class="modal">
          <div class="modal-content" v-for="(resm, i) in resmodalList" :key="i">
            <div class="reslistpopup" style="position: relative; right: 70px;">
              <h2>예약완료 내역</h2>
              <div>
                <strong>숙소 이름: {{ resm.ACCO_NAME }}</strong>
              </div>
              <section>
                <div>
                  <p><strong>체크인</strong> {{ resm.RESERVATION_CHECK_IN }}</p>
                  <p>
                    <strong>체크아웃</strong>
                    {{ resm.RESERVATION_CHECK_OUT }}
                  </p>
                </div>
                <div>
                  <p><strong>예약번호</strong> {{ resm.RESERVATION_ID }}</p>
                  <p><strong>예약자 휴대폰 번호</strong> {{ resm.USER_TEL }}</p>
                </div>
              </section>
              <div class="total">
                <div class="payment-info">
                  <div class="payment-info-top">
                    <p><strong>총 결제 금액</strong></p>
                  </div>
                  <div class="payment-info-middle">
                    <p>
                      <b>{{ resm.PAYMENT_TOTAL_PRICE }}</b>
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
      USER_NO: 0, // 로그인 구현되면 로그인된 유저의 USER_NO를 넣어야함
      ACCO_ID: "",
      reslist: [],
      resmodalList: [],
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

    //유저의 예약리스트
    async Get_Reservation_Info() {
      this.reslist = await this.$api("/api/reslist", {
        param: [this.$store.state.userNo],
      });
    },

    //예약한 숙소의 정보 가져오기
    async Get_Modal_Info() {
      this.resmodalList = await this.$api("/api/resmodalList", {
        param: [this.ACCO_ID],
      });
    },

    //예약 취소하기
    async Delete_res() {
      this.ResDelete = await this.$api("/api/ResDelete", {
        param: [this.ACCO_ID],
      });
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
    cancelReservation(rs) {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
      this.ResDelete = this.$api("/api/ResDelete", { param: [rs.ACCO_ID] });
      alert("예약이 취소되었습니다");
      this.hideConfirmation();
      location.href = "/My_Reservation";
    },

    //예약 모달
    openModal(rs) {
      var modal = document.getElementById("modal");
      this.ACCO_ID = rs.ACCO_ID;
      this.Get_Modal_Info();
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

.reslistpopup {}
</style>
