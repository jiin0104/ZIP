<template>
  <html>

  <body>
    <form id="app2" @submit="checkForm" action="/something" method="post" novalidate="true">
      <!-- 여기가 오른쪽에 있는 내용 -->
      <div class="contact-form-area" style="padding-top: 6%; height: 100px; margin: auto;">
        <div class="contact-text">
          <h1>상세 정보 기입</h1>
          <div style="float: left; margin-top: 10%; margin-left: 20%; ">

            <div class="field2" id="sign">
              <b label for="name">예약자 이름</b>
              <br />
              <input type="text" id="name" role="textbox" placeholder="예악자 이름을 입력해주세요" name="name"
                v-model="name" /><br /><br />

            </div>

            <!-- 5. 이메일_전화번호 -->
            <div class="field2 tel-number">
              <b label for="phone">휴대전화(-제외)</b>
              <div>
                <input id="phone1" type="text" role="textbox" name="phone" placeholder="ex)00012345678"
                  v-model="phone" /><br /><br />
              </div>
            </div>

            <div class="field2" id="sign">
              <b label for="email">이메일(아이디)</b><br>
              <input id="email" type="text" role="textbox" placeholder="이메일을 입력해 주세요." name="email"
                v-model="email" /><br /><br />
            </div>

            <div class="field2" id="sign">
              <b>숙박 인원수</b>&nbsp;&nbsp;
              <select v-model="capacity" class="capacity" style="width: 70px;">
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
              </select>
            </div>

            <p v-if="errors.length">
              <br>
              <b>아래 항목을 확인해주세요</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error" style="color: red;">{{ error }}</li>
            </ul>
            </p>

            <div style="position: relative; left: 125px; top: 30px">
              <!-- <input type="submit" id="addallow" value="결제하기" @click="PaymentInsert"> -->
              <input type="submit" v-on:click="requestPay()" id="addallow" value="결제하기">

            </div>
          </div>
        </div>
      </div>

      <!-- 버튼부분-->
      <div class="right" style="margin-right: 15%;">
        <section class="info" data-v-33033856="">
          <p class="name" data-v-33033856="">
            <strong data-v-33033856="">숙소이름</strong>
            {{GetAcco.ACCO_NAME}}
          </p>
          <p data-v-33033856=""><strong data-v-33033856="">체크인</strong>{{GetAcco.RESERVATION_CHECK_IN}}
          </p>
          <p data-v-33033856=""><strong data-v-33033856="">체크아웃</strong>{{GetAcco.RESERVATION_CHECK_OUT}}
          </p>
        </section>
        <section class="total_price_pc" data-v-33033856="">
          <p data-v-33033856="">
            <strong data-v-33033856="">
              <b data-v-33033856="">총 결제 금액</b>(VAT포함)</strong>
            <span class="in_price" data-v-33033856="">{{getCurrencyFormat(GetAcco.ACCO_PRICE)}}원</span>
          </p>
          <ul data-v-33033856="">
            <li data-v-33033856="">해당 객실가는 세금, 봉사료가 포함된 금액입니다</li>
            <li data-v-33033856="">
              결제완료 후 <span data-v-33033856="">예약자 이름</span>으로 바로
              <span data-v-33033856="">체크인</span> 하시면 됩니다
            </li>
          </ul>
        </section> <!---->
      </div>
    </form>
  </body>

  </html>
</template>


<script>
import axios from 'axios';

var IMP = window.IMP;   // 생략 가능
IMP.init("imp56476234");

export default {
  el: "#app2",
  data() {
    return {
      capacity: "2",
      errors: [],
      name: null,
      email: null,
      phone: null,
      total: 1,
      totalPrice: 0,
      RESERVATION_ID: 0,
      GetAcco: {},
      ACCO_ID: 0,
      

    }
  },
  created(){
    this.ACCO_ID = this.$route.query.ACCO_ID;
    this.RESERVATION_ID = this.$route.query.RESERVATION_ID;
    this.Acco();

  },
  methods: {
    async Acco(){
      let GetAcco = await this.$api("/api/GetReservation", {param:[this.ACCO_ID]});
      this.GetAcco = GetAcco[0];

      console.log(this.GetAcco);
    },

    checkForm(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.name) {
        this.errors.push("이름은 필수입니다.");
      }

      if (!this.phone) {
        this.errors.push("전화번호는 필수입니다");
      } else if (!this.validPhone(this.phone)) {
        this.errors.push("전화번호 형식을 확인하세요.");
      }

      if (!this.email) {
        this.errors.push("이메일은 필수입니다.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("이메일 형식을 확인하세요.");
      }

      if (!this.errors.length) return true;
    },


    validEmail: function (email) {
      var re1 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return re1.test(email);
    },

    validPhone: function (phone) {
      var re2 = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/
      return re2.test(phone);
    },





    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },


    requestPay() {
      if (this.name == null || this.phone == null || this.email === null || !this.validEmail(this.email) || !this.validPhone(this.phone)) {
        return
      }
      IMP.request_pay({ // param
        pg: "inicis",
        pay_method: "card",
        merchant_uid: "5203233-33sd230d4",
        name: this.GetAcco.ACCO_NAME,
        amount: this.GetAcco.ACCO_PRICE,
        buyer_email: this.email,
        buyer_name: this.name,
        
      }, rsp => { // callback
        if (rsp.success) {
          this.submitForm();
          location.href = "/reservation_info"
          // 결제 성공 시 로직,

        } else {
          this.$router.go(-3);
          alert("결제에 실패했습니다");
          
          
          // 결제 실패 시 로직,

        }
      });
    },

    submitForm() {//입력한 값들 서브밋.
        const formData = {  
          totalprice: this.totalPrice,
          reservationid: this.reservationid
        };
  
  
        axios.post('/payment', formData)//서브밋한 값들을 받아서 서버에 전달.
          .then(response => {
            if (response.data.message) {
              alert(response.data.message);
              
            } else {
              alert('결제에 실패했습니다.');
              console.log(formData);
            }
          })
          .catch(error => {
            console.error('결제 실패', error);
            alert('결제 실패');
          });
      },


  }
}

</script>

<style>
@import "Payment.css";

body,
h2,
p,
div,
strong,
span,
input,
a {
  text-align: left;
}

.error {
  font-size: 1px;
  height: 20px;
  color: red;
  font-weight: 700;
}
</style>