<template>
  <v-main>
    <!-- ***** Contact Area Start ***** -->
    <div class="dorne-contact-area d-md-flex container" style="padding-top: 43px; padding-bottom: 400px;" id="contact">
      <!-- 버튼부분-->
      <div style="width: 20%">
        <div class="leftsidebar" style="width: 20%; padding-top: 30%">
          <button type="button" id="mypage_button" style="max-width: 20px; color: red" @click="Mypage_Link">
            내정보
          </button>
          <button type="button" id="mypage_button" style="max-width: 20px" @click="My_reservation_Link">
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
          <h1>내 정보</h1>
          <div class="user-info">
            <!-- 폼전송시 전달되는 data target element -->
            <div class="border border-5" style="padding: 30px; display: inline-block; position: relative; right: 75px;">
              <input aria-hidden="true" type="hidden" name="uno" />
              <p>
                <strong>아이디:{{ userlist.USER_ID }}</strong>
              </p>
              <p>
                <strong>닉네임:{{ userlist.USER_NICKNAME }}</strong>
              </p>
              <p>
                <strong>전화번호:{{ userlist.USER_TEL }}</strong>
              </p>
              <p>
                <strong>주소:{{ userlist.USER_ADDRESS1
                }}&nbsp;&nbsp;{{ userlist.USER_ADDRESS2 }}</strong>
              </p>
            </div>
            <br /><br><button id="infobutton" @click="mypage_pw_check_Link" style="display: inline-block">
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

      userlist: {},
    };
  },

  created() {
    this.Get_User_Info();
  },

  methods: {
    async Get_User_Info() {
      let userlist = await this.$api("/api/userlist", {param:[this.$store.state.userId]});
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
