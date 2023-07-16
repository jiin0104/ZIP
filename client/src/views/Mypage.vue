<template>
  <v-main>
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
            style="max-width: 20px; color: red"
            @click="Mypage_Link"
          >
            내정보
          </button>
          <button
            type="button"
            id="mypage_button"
            style="max-width: 20px"
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
          <h1>내 정보</h1>
          <div class="user-info">
            <!-- 폼전송시 전달되는 data target element -->
            <input aria-hidden="true" type="hidden" name="uno" />
            <p>
              <strong>아이디:{{ userlist.user_id }}</strong>
            </p>
            <p>
              <strong>닉네임:{{ userlist.user_nickname }}</strong>
            </p>
            <p>
              <strong>전화번호:{{ userlist.user_tel }}</strong>
            </p>
            <p>
              <strong
                >주소:{{ userlist.user_address1
                }}{{ userlist.user_address2 }}</strong
              >
            </p>
            <br /><button
              id="infobutton"
              @click="mypage_pw_check_Link"
              style="display: inline-block"
            >
              정보수정
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>
<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"; //프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      // user 정보를 담을 리스트
      // USER_ID: "",
      // USER_NICKNAME: "",
      // USER_TEL: "",
      // USER_ADDRESS1: "",
      // USER_ADDRESS2: "",
      userlist: {},
    };
  },
  // mounted() {
  //   //페이지가 실행되자마자 작동시킬함수 정의
  //   this.Get_User_Info();
  // },

  created() {
    this.Get_User_Info();
  },

  methods: {
    async Get_User_Info() {
      // AXIOS로 통신하는 변수
      let userlist = await this.$api("/api/userlist", {});
      this.userlist = userlist[0];
    },

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
<style>
@import "Mypage.css";
</style>
