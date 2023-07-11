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
.save-btn1 {
  min-width: 40px;
  height: 30px;
  line-height: 26px;
  margin: 0 auto;
  background-color: #dc3545;
}
</style>
<template>
  <main>
    <div class="container">
      <div
        class="dorne-contact-area d-md-flex container"
        id="contact"
        style="padding-top: 43px; padding-bottom: 43px; height: auto"
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
        <div style="padding-top: 54px">
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
            style="width: 724px; margin-right: 31px; margin-bottom: 1rem"
          >
            <table>
              <thead>
                <tr>
                  <th>회원코드</th>
                  <th>아이디</th>
                  <th>비밀번호</th>
                  <th>닉네임</th>
                  <th>로그인유형</th>
                  <th>회원등급</th>
                  <th>회원관리</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="i" v-for="(user, i) in userList">
                  <td>{{ user.USER_NO }}</td>
                  <td>{{ user.USER_ID }}</td>
                  <td>{{ user.USER_PASSWORD }}</td>
                  <td>{{ user.USER_NICKNAME }}</td>
                  <td>{{ user.USER_LOGIN_TYPE }}</td>
                  <td>{{ user.USER_GRADE }}</td>
                  <td>
                    <button class="save-btn1" @click="userdel(user.USER_NO)">
                      삭제
                    </button>
                  </td>
                </tr>
                <!-- <tr>
                  <td>1001</td>
                  <td>abc11</td>
                  <td>12344</td>
                  <td>집탈출1</td>
                  <td>로컬</td>
                  <td>관리자</td>
                </tr> -->
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
  name: "",
  components: {},
  data() {
    return {
      userList: [],
    };
  },
  beforeCreate() {},
  created() {
    this.getUserList();
  },
  beforMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    userLink() {
      this.$router.push({ path: "/admin_page_user" });
    },
    reservationLink() {
      this.$router.push({ path: "/admin_page_reservation" });
    },
    async getUserList() {
      this.userList = await this.$api("/api/user_sql", {});
      console.log(this.userList);
    },
    userdel() {
      if (confirm("정말 삭제하시겠습니까??") == true) {
        //확인
        document.form.submit();
      } else {
        //취소
        return;
      }
    },
  },
};
</script>
