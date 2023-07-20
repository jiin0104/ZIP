<style>
.board-list table {
  width: 104%;
  border-collapse: collapse;
  margin-top: 20px;
}

.board-list th,
.board-list td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.board-list thead th {
  background-color: #f2f2f2;
}

.board-list tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
<template>
  <main style="min-height: 92%;">
    <div class="container">
      <div
        class="dorne-contact-area d-md-flex container"
        id="contact"
        style="padding-top: 43px; padding-bottom: 43px; height: auto; margin-left: -94px;"
      >
        <!-- 버튼부분-->
        <div style="width: 35%; padding-top: 60px">
          <div class="leftsidebar" style="width: 20%">
            <button
              type="button"
              id="mypage_button"
              style="max-width: 20px; margin: 0px 0px 0px 45px; color: red"
              @click="reservationLink"
            >
              예약관리
            </button>
          </div>
          <div class="leftsidebar" style="width: 20%">
            <button
              type="button"
              id="mypage_button"
              style="max-width: 20px; margin: 0px 0px 0px 45px"
              @click="userLink"
            >
              회원관리
            </button>
          </div>
        </div>
        <!-- 여기가 오른쪽에 있는 내용 -->
        <div style="padding-top: 54px; margin-left: 20px;">
          <!-- 리스트 상단 -->
          <div
            class="top"
            style="
              overflow: visible;
              height: 80px;
              border-top: none;
              border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            "
          >
            <h3 style="float: left">관리자페이지 예약관리</h3>
            <div class="write-button" style="float: right">
              <button
                class="save-btn"
                style="border: none; height: 30px; line-height: 0px"
              >
                저장
              </button>
            </div>
          </div>

          <div
            class="board-list"
            style="width: 848px; margin-right: 31px; margin-bottom: 1rem"
          >
            <table>
              <thead>
                <tr>
                  <th style="width: 70px;">예약번호</th>
                  <th>체크인날짜</th>
                  <th>체크아웃날짜</th>
                  <th style="width: 70px;">회원코드</th>
                  <th style="width: 70px;">숙소코드</th>
                  <th>결제상태</th>
                  <th>예약 생성일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr onclick="" :key="i" v-for="(res, i) in adminres">
                  <td id="res">{{res.RESERVATION_ID}}</td>
                  <td>{{res.RESERVATION_CHECK_IN }}</td>
                  <td>{{res.RESERVATION_CHECK_OUT }}</td>
                  <td>{{res.USER_NO }}</td>
                  <td>{{res.ACCO_ID }}</td>
                  <td>{{res.RESERVATION_STATUS }}</td>
                  <td>{{res.RESERVATION_CREATE }}</td>
                  <td><button type="button" @click="showConfirmation()">삭제</button></td>
                  <div id="popup" class="popup" style="display: none; left: 43%; top: 22%; z-index: 1;" >
                <p class="popup-message" style="font-size: 18px">
                  삭제 하시겠습니까?
                </p>
                <div class="popup-buttons">
                  <button id="button7" @click="hideConfirmation()">취소</button>
                </div>
                <div class="popup-buttons">
                  <button id="button8" @click="cancelReservation(res)">
                    확인
                  </button>
                </div>
              </div>
                </tr>
                
              </tbody>
            </table>
          </div>
          <nav aria-label="...">
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" href="#">이전</a></li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  style="background: rgba(0, 0, 0, 0.08)"
                  >1</a
                >
              </li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">다음</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  
  data() {
    return {
      adminres: [],
    };
  },
  
  created() {
    this.getReservation();
  },
  methods: {
    userLink() {
      this.$router.push({ path: "/admin_page_user" });
    },
    reservationLink() {
      this.$router.push({ path: "/admin_page_reservation" });
    },

    async getReservation(){
      this.adminres = await this.$api("/api/SearchRes")
    },
    deleteres(res){

      this.adminresdel = this.$api("/api/adminresdel", {param:[res.RESERVATION_ID]})
    },
    showConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "block";
    },
    hideConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    },
    cancelReservation(res) {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
      this.ResDelete = this.$api("/api/adminresdel", { param: [res.RESERVATION_ID] });
      alert("삭제되었습니다");
      this.hideConfirmation();
      location.href = "/admin_page_reservation";
    },

  },
};
</script>
