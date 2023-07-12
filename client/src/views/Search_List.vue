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

            <div v-if="SearchAcco.length == 0" style="max-width: 80%;">
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
                    <button type="button" data-sort="DISTANCE" @click="ascSort"><span>높은 가격 순</span></button><button
                      type="button" data-sort="LOWPRICE" @click="descSort"><span>낮은 가격 순</span></button>
                  </div>
                </div>
              </div>
              <div id="product_list_area">
                <ul>
                  <li class="list_4 adcno2" :key="i" v-for="(acco, i) in SearchAcco">

                    <!-- <a href @click="goToDetail(acco.ACCO_ID);" > -->
                    <a href>
                      <p class="pic">
                        <img class="lazy" :src="`/download/${acco.ACCO_ID}/${acco.ACCO_IMAGE}`"
                          style="margin-left: -170px; display: block;">

                      </p>
                      <div class="stage">
                        <div class="right_badges">
                          <div class="badge"><span class="build_badge"
                              style="color: rgba(255,255,255,0.8); background-color: rgba(62,76,103,1);">{{ acco.ACCO_TYPE }}</span>
                          </div>
                        </div>
                        <div class="name">
                          <strong>
                            <div class="badge" style="padding: 0;">
                            </div> {{ acco.ACCO_NAME }}
                          </strong>
                          <div style="height: 90px;">
                            {{ acco.ACCO_INTRODUCE_COMMENT }}
                          </div>
                          <p>&nbsp;</p>
                        </div>
                        <div class="price" style="display: contents; text-align: right;">
                          <div class="map_html">

                          </div>
                          <p style="text-align: right ;"><span><i>&nbsp;</i></span>
                            <b style="color: rgba(0,0,0,1);">{{ acco.ACCO_PRICE }}원</b>
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
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  data() {
    return {
      SearchAcco: [],
    };
  },
  created() {
    this.getSearchAcco();
  },
  methods: {
    async getSearchAcco() {
      this.SearchAcco = await this.$api("/api/SearchAcco", {});
      console.log(this.SearchAcco);
    },
    goToDetail(ACCO_ID) {
      this.$router.push({ path: '/acco_detail', query: { ACCO_ID: ACCO_ID } });
    },
    ascSort() {
      this.SearchAcco.sort(function (a, b) {
        return a.ACCO_PRICE - b.ACCO_PRICE;
      });
    },
    descSort() {
      this.SearchAcco.sort(function (a, b) {
        return b.ACCO_PRICE - a.ACCO_PRICE;
      });
    },
  }
}


</script>

<style>
@import "Search_List.css";

.card .img-box {
  width: 100%;
  height: 12em;
  background-color: gray;
  overflow: hidden;
}

.card .img-box>img {
  width: 100%;
}
</style>
