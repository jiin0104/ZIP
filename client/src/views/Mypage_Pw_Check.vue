<template>
  <div>

    <!-- ***** Contact Area Start ***** -->
    <div class="dorne-contact-area d-md-flex container" style="padding-top: 43px" id="contact">
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
          <h1>내 정보 수정</h1>
          <div style="height: 300px; position: relative; left: 20%">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label">비밀번호 확인</label>
            </div>
            <div class="col-auto" style="display: inline-block">
              <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline"
                v-model="random_pw" />
            </div>
            <button type="submit" class="btn btn-primary" style="
                position: relative;
                background-color: #0b5394;
                color: white;
              " @click="checkPassword()">
              확인
            </button>
          </div>
          <div id="popup" class="popup" style="display: none">
            <p class="popup-message" style="font-size: 18px">
              비밀번호가 틀렸습니다
            </p>
            <div class="popup-buttons">
              <button id="button9" onclick="hideConfirmation()">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pwcheck",
  data() {
    return {
      checkpw: {},
      
    };
  },

  created(){
    this.get_user_pw();
  },


  methods: {
    async get_user_pw(){
      let checkpw = await this.$api("/api/checkpw", {param:[this.USER_NO]});
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

    My_Update_Link() {
      this.$router.push({ path: "/my_update" });
    },
    showConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "block";
    },
    hideConfirmation() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    },

    checkPassword() {
      let pw = document.getElementById("inputPassword6").value
      // 비밀번호 확인
      if (pw == this.checkpw.USER_PASSWORD) {
        this.My_Update_Link();
      } else {
        console.log("비밀번호 다르다");
        this.showConfirmation();
        return;
      }
    },

  },
};
</script>
<style>
@import "Mypage.css";
</style>