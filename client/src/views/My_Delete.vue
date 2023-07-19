<template>
  <v-main>

    <!-- ***** Contact Area Start ***** -->
    <div class="dorne-contact-area d-md-flex container" style="padding-top: 43px" id="contact">
      <!-- 버튼부분-->
      <div style="width: 20%">
        <div class="leftsidebar" style="width: 20%; padding-top: 30%">
          <button type="button" id="mypage_button" style="max-width: 20px" @click="Mypage_Link">
            내정보
          </button>
          <button type="button" id="mypage_button" style="max-width: 20px" @click="My_reservation_Link">
            예약내역
          </button>
          <button type="button" id="mypage_button" style="max-width: 20px; color: red" @click="My_Delete_Link">
            회원 탈퇴
          </button>
        </div>
      </div>
      <!-- 여기가 오른쪽에 있는 내용 -->
      <div class="contact-form-area equal-height container" style="padding-top: 6%">
        <div class="contact-text">
          <h1>회원 탈퇴</h1>
          <div class="really">
            입력하신 정보는 회원탈퇴 이외의 목적으로 사용하지 않습니다<br />
            탈퇴 후 리뷰 및 모든 정보는 삭제됩니다<br /><br />
            <br /><br />
          </div>
          <div class="delete-check" style="position: relative; left: 30%">
            <div class="col-auto" style="padding: 0">
              <label for="inputPassword6" class="col-form-label"
                style="font-size: 18px; position: relative; left: 8%">비밀번호 입력</label>
            </div>
            <div class="col-auto">
              <input type="password" id="inputPassword6" class="form-control"
                style="width: 300px; position: relative; right: 65px;" aria-describedby="passwordHelpInline"
                v-model="rendom_pw" />
            </div>
            <button type="submit" @click="checkPassword()" id="button6">
              확인
            </button>
          </div>
          <div id="popup" class="popup" style="display: none">
            <p class="popup-message" style="font-size: 18px">
              정말 탈퇴하시겠습니까?
            </p>
            <div class="popup-buttons">
              <button id="button7" @click="hideConfirmation()">취소</button>
            </div>
            <div class="popup-buttons">
              <button id="button8" @click="deleteuser()">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>
<script>


export default {
  name: "mydelete",
  data() {
    return {
      checkpw: {},
    };
  },

  created() {
    this.get_user_pw();
  },
  methods: {
    async get_user_pw() {
      // AXIOS로 통신하는 변수
      let checkpw = await this.$api("/api/checkpw", {param:[this.$store.state.userNo]});
      this.checkpw = checkpw[0];
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

    checkPassword() {
      let pw = document.getElementById("inputPassword6").value
      if (pw == this.checkpw.USER_PASSWORD) {
        this.showConfirmation()
      } else {
        alert("비밀번호가 다릅니다!");
        return;
      }
    },

    showConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "block";
    },

    deleteuser() {
      this.SignOut = this.$api("/api/SignOut", { param: [this.$store.state.userNo] });
      this.$store.commit("user", {});
      this.$store.commit("localUser", {});
      alert("탈퇴가 완료되었습니다!");
      this.hideConfirmation();
      location.href = "/";
      this.$store.commit('loginOut')
    },

    hideConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    },


  }
}
</script>
<style>
@import "Mypage.css";
</style>