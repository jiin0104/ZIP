<template>
  <html>

  <body>
    <div class="wrap show">
      <form id="product_filter_form" method="get" action="" data-sel_date="2023-06-22" data-sel_date2="2023-06-23">
        <div class="listpage">
          <div id="content" class="sub_wrap">
            <!-- Filter -->
            <div class="filter_wrap">
              <section>
                <h3>숙소유형</h3>
                <ul>
                  <li><input type="checkbox" id="adcno_0" name="adcno[]" class="inp_chk" value="1" v-model="acco"><label
                      for="adcno_0" class="label_chk">호텔</label></li>
                  <li><input type="checkbox" id="adcno_1" name="adcno[]" class="inp_chk" value="2" v-model="acco"><label
                      for="adcno_1" class="label_chk">모텔</label></li>
                  <li><input type="checkbox" id="adcno_2" name="adcno[]" class="inp_chk" value="3" v-model="acco"><label
                      for="adcno_2" class="label_chk">펜션</label></li>

                </ul>
              </section>
              <section>
                <h3>가격</h3>
                <ul>
                  <li><input type="checkbox" id="adcno_0" name="adcno[]" class="inp_chk" value="1" v-model="price"><label
                      for="adcno_0" class="label_chk">50,000원 미만</label></li>
                  <li><input type="checkbox" id="adcno_1" name="adcno[]" class="inp_chk" value="2" v-model="price"><label
                      for="adcno_1" class="label_chk">50,000원 ~ 100,000원</label></li>
                  <li><input type="checkbox" id="adcno_2" name="adcno[]" class="inp_chk" value="3" v-model="price"><label
                      for="adcno_2" class="label_chk">100,000원 이상</label></li>
                </ul>
              </section>
              <section>

                <button type="submit" class="btn btn-primary"
                  style="background-color: #0b5394; float: left;">조회하기</button>
              </section>
            </div>

            <div v-if="searchacco == null" style="max-width: 80%;">
              <br><br><br><br><br><br><br><br><br><br><br>
              <div class="mypage_title">
                <h1>검색 결과</h1>
              </div>
              <div class="user-res-wrap">
                <div class="really2" style="text-align: center;">
                  검색 내역이 없습니다<br /> 다른 정보로 검색해주세요
                </div>
                <br />
              </div>
            </div>
            <div class="list_wrap" v-else>
              <div class="top_sort">
                <div class="pc">
                  <div class="btn_wrap width_2">
                    <button type="button" data-sort="DISTANCE" @click="pricehigh"><span>높은 가격 순</span></button><button
                      type="button" data-sort="LOWPRICE" @click="pricelow"><span>낮은 가격 순</span></button>
                  </div>
                </div>
              </div>
              <div id="product_list_area">
                <ul>
                  <!-- <li class="list_4 adcno2" :key="i" v-for="(acco,i) in searchacco"> -->
                  <li class="list_4 adcno2">
                    <!-- <a @click="goToDetail(acco.id);" > -->
                    <a href="">
                      <p class="pic">
                        <!-- <img class="lazy"
                        src="'/download/${acco.acco_id}/${acco.acco_image}'"
                        style="margin-left: -170px; display: block;"> -->

                        <img class="lazy"
                          src="//image.goodchoice.kr/resize_1000X500x0/affiliate/2023/06/16/648c25cfa5a22.jpg"
                          style="margin-left: -170px; display: block;">
                      </p>
                      <div class="stage">
                        <div class="right_badges">
                          <div class="badge"><span class="build_badge"
                              style="color: rgba(255,255,255,0.8); background-color: rgba(62,76,103,1);"><!--{{acco.acco_type}}-->호텔</span>
                          </div>
                        </div>
                        <div class="name">
                          <strong>
                            <div class="badge" style="padding: 0;">
                            </div> <!--{{acco.acco_name}}--> SL 호텔 강릉
                          </strong>
                          <div style="height: 90px;">
                            대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글대충 소개글
                          </div>
                          <p>&nbsp;</p>
                        </div>
                        <div class="price"  style="display: contents; text-align: right;">
                          <div class="map_html">

                          </div>
                          <p style="text-align: right ;"><span><i>&nbsp;</i></span>
                            <b style="color: rgba(0,0,0,1);"><!--{{acco.room_day_price}}-->99,000원</b>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </body>

  </html>
</template>

<script>
// export default {
//     data(){
//         return {
//             searchacco: []
//         };
//     },
//     created(){
//         this.getsearchacco();
//     },
//     methods: {
//         async getsearchacco(){
//             this.searchacco = await this.$api("/api/searchacco",{});
//             console.log(this.searchacco);
//         },
//         goToDetail(acco_id){
//             this.$router.push({path:'/detail', query:{acco_id:acco_id}});
//         }
//     }
// }
export default {
  name: "App",
  data() {
    return {
      searchacco: [],
      acco: [],
      price: [],
      facility: [],
      search: "search",
    };
  },

  methods: {
    pricehigh() {
      this.searchacco.sort(function (a, b) {
        return a.room_price - b.room_price;
      });
    },
    pricelow() {
      this.searchacco.sort(function (a, b) {
        return b.room_price - a.room_price;
      });
    },
  },
};
</script>

<style>
@import "Search_List.css";

.card .img-box {
  width: 100%;
  height: 12em;
  background-color: gray;
  overflow: hidden;
}

.card .img-box > img {
  width: 100%;
}
</style>
