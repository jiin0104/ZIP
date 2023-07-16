<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap");

* {
  font-family: "Noto Sans KR", sans-serif;
}

.tab {
  list-style: none;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

.tab li {
  float: left;
  height: 40px;
  width: 140px;
  padding: 5px;
  text-align: center;
  background-color: #3f9df0;
  border: solid #0b5394 1px;
}

.tab li a {
  display: inline;
  color: black;
  text-align: center;
  text-decoration: none;
  padding: 12px 12px;
  text-align: center;
  color: #fff;
}

.tabcont {
  display: none;
  background-color: #ffffff;
  padding: 12px 12px;
  color: black;
}

ul.tab li.on {
  background-color: #0b5394;
  height: 40px;
  width: 140px;
  padding: 5px;
}

.tabcont.on {
  display: block;
}

table {
  margin-left: 60px;
}

th {
  background-color: #72728c;
  border: solid 1px;
}

#popup {
  width: 300px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 40%;
  left: 25%;
  text-align: center;
}

.popup-buttons #button7 {
  background-color: gray;
  min-width: 70px;
  height: 40px;
  border-radius: 0;
  line-height: 20px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  border: none;
  position: relative;
  bottom: -60%;
  text-align: center;
}

.popup-buttons #button8 {
  background-color: #0b5394;
  min-width: 70px;
  height: 40px;
  border-radius: 0;
  line-height: 20px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  border: none;
  position: relative;
  bottom: -60%;
  left: 5%;
  text-align: center;
}

.popup-message {
  width: 230px;
  height: 30px;
  position: absolute;
  top: 27%;
  left: 13%;
  text-align: center;
}

.popup-buttons {
  display: contents;
  justify-content: center;
  position: absolute;
  top: 70%;
  left: 34%;
  text-align: center;
}

#popup-buttons button:hover {
  background-color: #999;
}

.save-btn2 {
  min-width: 50px;
  height: 30px;
  width: 80px;
  background-color: #dc3545;
  border-radius: 0;
  margin-top: 3px;
  line-height: 25px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  border: 0px;
}

#liked {
  border: none;
  background-color: #72728c;
  min-width: 150px;
  margin-left: 250px;
}

#liked.active {
  background-color: pink;
  min-width: 150px;
  margin-left: 250px;
  border: none;
}

/* .card-body {
  width: 500px;
} */
</style>
<template>
  <div>
    <!-- ***** Breadcumb Area Start ***** -->
    <br />
    <br />
    <div>
      <form action="method">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                  <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                  <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img :src="`/download/${detailList.ACCO_ID}/${detailList.ACCO_IMAGE}`" class="d-block w-100"
                      alt="..." />
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </a>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card shadow-sm" style="width: 500px; height: 400px">
                <div class="card-body">
                  <div class="card-title" id="card1"></div>
                  <div>
                    <h3>{{ detailList.ACCO_NAME }}</h3>
                    <b>주소</b>
                    <br />
                    <p>{{ detailList.ACCO_ADDRESS1 }}</p>
                    <br />
                    <p>{{ detailList.ACCO_ADDRESS2 }}</p>
                    <br />
                    <p>
                      {{ detailList.ACCO_INTRODUCE_COMMENT }}
                    </p>
                    <br />
                    <p>
                      {{ detailList.ACCO_DETAIL_DESCRIPTION }}
                    </p>
                    <br /><br /><br />
                  </div>
                </div>
              </div>
            </div>
            <div id="container" style="width: 1000px">
              <br />
              <br />
              <div class="tab">
                <button v-for="(tab, index) in tabList" :key="index" @click.prevent="currentTab = index"
                  :class="{ active: currentTab === index }" class="save-btn1" style="
                    background-color: #0b5394;
                    border: none;
                    margin-right: 5px;
                    float: left;
                  ">
                  {{ tab.name }}
                </button>
              </div>
              <br /><br />
              <ul class="tab-content" v-if="currentTab === 0">
                <li v-for="(item, index) in employList" :key="index">
                  <div class="room" style="float: left width: 500px; height: 300px;">
                    <p class="tab_img" style="width: 50%; float: left; margin-left: 60px">
                      <img :src="`/download/${detailList.ACCO_ID}/${detailList.ACCO_IMAGE}`" alt="" />
                    </p>
                    <strong style="
              font-size: 20px;
              margin-top: 20px; height 300px;
              margin-left: 30px;
              width: 300px;
            ">{{ detailList.ACCO_ROOM }}</strong>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <strong style="font-size: 20px; float: right">가격 :
                      {{ getCurrencyFormat(detailList.ACCO_PRICE) }}원</strong>
                    <br />
                    <br />
                    <button type="button" class="save-btn1" style="border: none; min-width: 150px; float: right"
                      @click="goToPayment(detailList.ACCO_ID);">
                      예약하기
                    </button>
                  </div>
                </li>
              </ul>
              <div>
                <ul class="tab-content" v-if="currentTab === 1">s
                  <li v-for="(item, index) in employList" :key="index">
                    <h3 style="margin-left: 60px">기본정보</h3>
                    <p style="margin-left: 60px">주변정보</p>
                    <p style="margin-left: 60px">
                      {{ detailList.ACCO_DETAIL_DESCRIPTION }}
                    </p>
                    <br /><br />
                  </li>
                </ul>
              </div>

              <br />
              <br /><br /><br />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "Tab",
  data() {
    return {
      currentTab: 0,
      tabList: [{ name: "객실안내" }, { name: "숙소정보" }],
      employList: [{ title: "", sub: "" }],
      detailList: {},
      
      accoid: this.$route.query.ACCO_ID, // 예시
      userno: 1,      //this.$route.query.USER_NO,
      check_in: '2012-1-12', // 예시
      check_out: '2012-3-14' // 예시
    };
  },

  created() {
    this.ACCO_ID = this.$route.query.ACCO_ID;
    this.getDetailList();

  },

  methods: {
    async getDetailList() {

      let detailList = await this.$api("/api/detailList", { param: [this.ACCO_ID] });
      this.detailList = detailList[0];

      console.log(this.detailList);
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    goToPayment(ACCO_ID) {


      const formData = {
        check_in: this.check_in,
        check_out: this.check_out,
        userno: this.userno,
        accoid: this.accoid,
      };

      axios.post('/acco_detail', formData)//서브밋한 값들을 받아서 서버에 전달.
        .then(response => {
          if (response.data.message) {
            // 예약 누르면 예약페이지로
            this.$router.push({ path: '/payment', query: { ACCO_ID: ACCO_ID } });
            
          } else {
            alert('뭔가가 실패했습니다.');
            console.log(formData);
          }
        })
        .catch(error => {
          console.error('뭔가가 실패', error);
          alert('예약생성 실패. 확인 후 다시 시도해 주세요');
        });
    },
  },
};
</script>
