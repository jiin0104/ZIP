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
.save-btn6 {
  min-width: 40px;
  height: 30px;
  line-height: 26px;
  margin: 0 auto;
  background-color: #dc3545;
  color: white;
}
</style>
<template>
  <main>
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
              style="max-width: 20px; margin: 0px 0px 0px 45px"
              @click="reservationLink"
            >
              예약관리
            </button>
          </div>
          <div class="leftsidebar" style="width: 20%">
            <button
              type="button"
              id="mypage_button"
              style="max-width: 20px; color: red; margin: 0px 0px 0px 45px"
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
            <h3 style="float: left">관리자페이지 회원관리</h3>
            <div class="write-button" style="float: right"></div>
          </div>

          <div
            class="board-list"
            style="width: 944px; margin-right: 31px; margin-bottom: 1rem"
          >
            <table>
              <thead>
                <tr>
                  <th>회원코드</th>
                  <th>아이디</th>
                  <th>비밀번호</th>
                  <th>생성날짜</th>
                  <th>닉네임</th>
                  <th>주소</th>
                  <th>전화번호</th>
                  <th>로그인유형</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="i" v-for="(user, i) in adminusers">
                  <td id="user">{{ user.USER_NO }}</td>
                  <td>{{ user.USER_ID }}</td>
                  <td>{{ user.USER_PASSWORD }}</td>
                  <td>{{ user.USER_CREATED_DATE }}</td>
                  <td>{{ user.USER_NICKNAME }}</td>
                  <td>{{ user.USER_ADDRESS1 }}</td>
                  <td>{{ user.USER_TEL }}</td>
                  <td>{{ user.USER_LOGIN_TYPE }}</td>
                  <td><button type="button" @click="showConfirmation()">삭제</button></td>
                  <div id="popup" class="popup" style="display: none; left: 43%; top: 22%; z-index: 1;" >
                <p class="popup-message" style="font-size: 18px">
                  삭제 하시겠습니까?
                </p>
                <div class="popup-buttons">
                  <button id="button7" @click="hideConfirmation()">취소</button>
                </div>
                <div class="popup-buttons">
                  <button id="button8" @click="cancelReservation(user)">
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
      adminusers: [],
    };
  },

  created() {
    this.getUserList();
  },
  
  methods: {
    userLink() {
      this.$router.push({ path: "/admin_page_user" });
    },
    reservationLink() {
      this.$router.push({ path: "/admin_page_reservation" });
    },

    async getUserList() {
      this.adminusers = await this.$api("/api/SearchUser");
    },

    deleteres(user){
      this.adminuserdel = this.$api("/api/adminuserdel", {param:[user.USER_NO]})
    },
    showConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "block";
    },
    hideConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    },
    cancelReservation(user) {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
      this.UserDelete = this.$api("/api/adminuserdel", { param: [user.USER_NO] });
      alert("삭제되었습니다");
      this.hideConfirmation();
      location.href = "/admin_page_user";
    },
  },
};
</script>
