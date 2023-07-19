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
      <form id="app3" @submit="checkForm" action="/mypage" method="post" novalidate="true">
        <div class="contact-form-area equal-height container" style="padding-top: 6%; width: 220%;">
          <div class="contact-text">
            <h1>회원 정보 수정</h1>

            <div style="position: relative; left: 30%">
              <div class="field2" id="sign">
                <b label for="nickname">닉네임</b><br />
                <input type="text" id="nickname" role="textbox" name="nickname" v-model="nickname" />
                <input type="button" id="crosscheck" value="중복 확인" @click="validateNickname"><br />
              </div>

              <br>
              <div class="field2">
                <b label for="password">비밀번호</b><br />
                <input class="userpw" id="password" type="password" role="textbox" placeholder="비밀번호를 입력해 주세요."
                  name="password" v-model="password" /><br /><br />
              </div>
              <div class="field2">
                <b label for="passwordCheck">비밀번호 재확인</b><br />
                <input class="userpw-confirm" id="passwordCheck" type="password" role="textbox" name="passwordCheck"
                  v-model="passwordCheck" placeholder="비밀번호를 입력해 주세요." /><br /><br />
              </div>
              <!-- 5. 이메일_전화번호 -->
              <div class="field2 tel-number">
                <b label for="phone">휴대전화(-제외)</b>
                <div>
                  <input id="phone1" type="text" role="textbox" name="phone" placeholder="ex)00012345678"
                    v-model="phone" /><br /><br />
                </div>
              </div>

              <div class="field2">
                <b label for="address">주소</b><br />
                <input type="text" id="zonecode" placeholder="우편번호" role="textbox" v-model="zonecode" readonly />
                <input type="button" @click="openPostcode" value="우편번호 찾기" id="postcode"><br />
                <input type="text" placeholder="주소" role="textbox" v-model="roadAddress" readonly
                  style="width: 43%;" /><br />
                <input type="text" id="addressdetail" placeholder="상세주소" role="textbox" v-model="detailAddress"
                  style="width: 43%;" /><br />
              </div>

              <p v-if="errors.length">
                <br>
                <b>아래 항목을 확인해주세요</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error" style="color: red;">{{ error }}</li>
              </ul>
              </p>

              <div style="position: relative; left: 125px; top: 30px">
                <input type="submit" id="addallow" value="수정">
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="main" style="width: 20%"></div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  el: "#app3",
  data() {
    return {
      errors: [],
      nickname: null,
      password: null,
      passwordCheck: null,
      phone: null,
      zonecode: null,
      roadAddress: null,
      detailAddress: null,
    };
  },

  //화면 열리면 진행시킬 함수
  created() {
    this.Get_User_Info();
    this.USER_NO = this.$route.query.USER_NO;
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


    //로그인한 유저의 정보 가져오는 함수
    //유저 정보를 가져와 쓸수 있게 객체로 만들었다.
    async Get_User_Info() {
      let userlist = await this.$api("/api/userlist", { param: [this.$store.state.userNo] });
      this.userlist = userlist[0];
      this.nickname = this.userlist.USER_NICKNAME;
      this.password = this.userlist.USER_PASSWORD;
      this.passwordCheck = this.userlist.USER_PASSWORD;
      this.phone = this.userlist.USER_TEL;
      this.roadAddress = this.userlist.USER_ADDRESS1;
      this.detailAddress = this.userlist.USER_ADDRESS2;
    },

    //빈칸 있을시 나타나는 오류메세지 
    checkForm(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.nickname) {
        this.errors.push("닉네임은 필수입니다.");
      }

      if (!this.password) {
        this.errors.push("비밀번호는 4~12자리를 입력해주세요");
      } else if (!this.validPassword(this.password)) {
        this.errors.push("비밀번호 형식을 확인하세요.");
      }

      if (!this.passwordCheck) {
        this.errors.push("비밀번호를 확인해주세요");
      } else if (!this.validPasswordCheck(this.passwordCheck)) {
        this.errors.push("비밀번호를 확인해주세요")
      }

      if (!this.phone) {
        this.errors.push("전화번호는 필수입니다");
      } else if (!this.validPhone(this.phone)) {
        this.errors.push("전화번호 형식을 확인하세요.");
      }

      if (!this.roadAddress) {
        this.errors.push("주소는 필수입니다");
      }

      if (!this.errors.length) {
        this.submitForm();
      }
    },

    // 비밀번호 형식 유효성 검사
    validPassword(password) {
      var re3 = /^[A-Za-z0-9]{4,12}$/
      return re3.test(password);
    },

    //비밀번호 일치 검사
    validPasswordCheck: function () {
      let pw = document.getElementById("password").value
      let pwcheck = document.getElementById("passwordCheck").value

      if (pw !== pwcheck) {
        alert("비밀번호가 맞지않습니다")
      } else {
        return true;
      }
    },

    //닉네임 유효성 검사
    validNickname: function (nickname) {
      var re0 = /^[A-Za-z가-힣]{1,6}$/
      return re0.test(nickname);
    },

    // 전화번호 유효성 검사
    validPhone(phone) {
      var re2 = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/
      return re2.test(phone);
    },


    //입력한 값들 서브밋
    submitForm() {
      const formData = {
        nickname: this.nickname,
        password: this.password,
        phone: this.phone,
        address1: this.roadAddress,
        address2: this.detailAddress
      };

      //서브밋한 값들을 받아서 서버에 전달.
      axios.post('/my_update', formData)
        .then(response => {
          if (response.data.message) {
            alert(response.data.message);
            location.href = "/mypage";

          } else {
            alert('회원 정보 수정에 실패했습니다.');
            console.log(formData);
          }
        })
        .catch(error => {
          console.error('회원 정보 수정 실패', error);
          alert('회원 정보 수정 실패. 확인 후 다시 시도해 주세요');
        });
    },

    //닉네임 중복 확인
    validateNickname() {
      const nickname = this.nickname;
      if (!nickname) {
        alert("닉네임 항목을 작성해주세요");
        return;
      }

      axios.post('/checkNickname', { nickname })
        .then(response => {
          if (response.data.exists) {
            alert("이미 존재하는 닉네임입니다.");
          } else {
            alert("사용 가능한 닉네임입니다.");
          }
        })
        .catch(error => {
          console.error('닉네임 중복 확인 실패', error);
          alert('닉네임 중복 확인에 실패했습니다.');
        });
    },

    //주소 찾기 로직
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open();
    },


  },
};
</script>
<style>
@import "Mypage.css";
</style>