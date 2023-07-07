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
              <div
                id="carouselExampleIndicators"
                class="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src="'/download/${acco.acco_id}/${acco.acco_image}'"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="'/download/${acco.acco_id}/${acco.acco_image}'"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="'/download/${acco.acco_id}/${acco.acco_image}'"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </a>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="card-title" id="card1"></div>
                  <div>
                    <h3>{{ ACCO_NAME }}</h3>
                    <b>주소</b>
                    <br />
                    <p>{{ ACCO_ADDRESS }}</p>
                    <br />
                    <p>
                      {{ ACCO_INTRODUCE_COMMENT }}
                    </p>
                    <br />
                    <p>
                      {{ ACCO_DETAIL_DESCRIPTION }}
                    </p>
                    <br /><br /><br />
                  </div>
                </div>
              </div>
            </div>
            <div id="container">
              <br />
              <br />
              <div class="tab">
                <button
                  v-for="(tab, index) in tabList"
                  :key="index"
                  @click.prevent="currentTab = index"
                  :class="{ active: currentTab === index }"
                  class="save-btn1"
                  style="
                    background-color: #0b5394;
                    border: none;
                    margin-right: 5px;
                    float: left;
                  "
                >
                  {{ tab.name }}
                </button>
              </div>
              <br /><br />
              <ul class="tab-content" v-if="currentTab === 0">
                <li v-for="(item, index) in employList" :key="index">
                  <div
                    class="room"
                    style="float: left width: 500px; height: 300px;"
                  >
                    <p
                      class="tab_img"
                      style="width: 50%; float: left; margin-left: 60px"
                    >
                      <img
                        src="https://image.goodchoice.kr/resize_490x348/affiliate/2018/02/20/5a8bda525e78d.jpg"
                        alt=""
                      />
                    </p>
                    <strong
                      style="
              font-size: 20px;
              margin-top: 20px; height 300px;
              margin-left: 30px;
              width: 300px;
            "
                      >{{ ACCO_ROOM }}</strong
                    >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <strong style="font-size: 20px; float: right"
                      >가격 : {{ ACCO_PRICE }}원</strong
                    >
                    <br />
                    <br />
                    <router-link to="/payment"
                      ><button
                        type="button"
                        class="save-btn1"
                        style="border: none; min-width: 150px; float: right"
                      >
                        예약하기
                      </button></router-link
                    >
                  </div>
                </li>
              </ul>
              <div>
                <ul class="tab-content" v-if="currentTab === 1">
                  <li v-for="(item, index) in employList" :key="index">
                    <h3 style="margin-left: 60px">기본정보</h3>
                    <p style="margin-left: 60px">주변정보</p>
                    <p style="margin-left: 60px">
                      {{ ACCO_DETAIL_DESCRIPTION }}
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
export default {
  name: "Tab",
  data() {
    return {
      currentTab: 0,
      tabList: [{ name: "객실안내" }, { name: "숙소정보" }],
      employList: [{ title: "", sub: "" }],
      ACCO_NAME: "",
      ACCO_ADDRESS: "",
      ACCO_INTRODUCE_COMMENT: "",
      ACCO_DETAIL_DESCRIPTION: "",
      ACCO_ROOM: "",
      ACCO_PRICE: "",
    };
  },

  beforeCreate() {},
  created() {},
  beforMount() {},
  mounted() {
    this.ACCO();
  },
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    ACCO() {
      (this.ACCO_NAME = "호텔리베라"),
        (this.ACCO_ADDRESS = "서울 강남구 청담동 53-7"),
        (this.ACCO_INTRODUCE_COMMENT =
          "COEX 전시장, 도심공항터미널, 종합무역센터, 올림픽 메인스타디움에 인접해 있어 비즈니스, 관광 등이 편합니다"),
        (this.ACCO_DETAIL_DESCRIPTION = "지하철이 가까움"),
        (this.ACCO_ROOM = "체크인시 배정"),
        (this.ACCO_PRICE = "230,000");
    },
  },
};
</script>
