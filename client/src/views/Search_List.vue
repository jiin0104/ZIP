<template>
  <div >
    <div class="row row-cols-1 row-cols-md-3 g-4">
      
        
          <div id="content" class="sub_wrap" style="width: 100%;">
            <!-- Filter -->
            <div class="filter_wrap" style="border: 0px;">
              <section style="margin: 0px;">
                <ul>
                  <br><br><br><br>
                  <div style="max-width: 140px; margin: auto;">
                    <button type="button" @click="all" ><img src="../assets/all.png"></button>
                  </div>
                  <br><br><br><br>
                  <div style="max-width: 140px; margin: auto;">
                    <button type="button" @click="hotel" ><img src="../assets/hotel.png"></button>
                  </div>
                  <br><br><br><br>
                  
                  <div style="max-width: 140px; margin: auto;">
                    <button type="button" @click="motel" ><img src="../assets/motel.png"></button>
                  </div>
                  <br><br><br><br>
                  <div style="max-width: 140px; margin: auto;">
                    <button type="button" @click="pension" ><img src="../assets/pension.png"></button>
                  </div>

                </ul>
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

            <div class="list_wrap" v-else style="min-height: 1000px;">
              <div class="top_sort">
                <div class="pc">
                  <div class="btn_wrap width_2">
                    <button type="button" data-sort="DISTANCE" @click="ascSort"><span>높은 가격 순</span></button><button
                      type="button" data-sort="LOWPRICE" @click="descSort"><span>낮은 가격 순</span></button>
                  </div>
                </div>
              </div>
             
              <div id="product_list_area" v-if="type=='A'">
                <ul>
                  <li class="list_4 adcno2" :key="i" v-for="(acco, i) in SearchAcco">
                    <a href @click="goToDetail(acco.ACCO_ID);" >                    
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
                            <b style="color: rgba(0,0,0,1);">{{ getCurrencyFormat(acco.ACCO_PRICE) }}원</b>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>




              <div id="product_list_area" v-else-if="type=='B'">
                <ul>
                  <li class="list_4 adcno2" :key="i" v-for="(acco, i) in SearchAccoho">
                    <a href @click="goToDetail(acco.ACCO_ID);" >                    
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
                            <b style="color: rgba(0,0,0,1);">{{ getCurrencyFormat(acco.ACCO_PRICE) }}원</b>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>



              <div id="product_list_area" v-else-if="type=='C'">
                <ul>
                  <li class="list_4 adcno2" :key="i" v-for="(acco, i) in SearchAccomo">
                    <a href @click="goToDetail(acco.ACCO_ID);" >                    
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
                            <b style="color: rgba(0,0,0,1);">{{ getCurrencyFormat(acco.ACCO_PRICE) }}원</b>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div id="product_list_area" v-else-if="type=='D'">
                <ul>
                  <li class="list_4 adcno2" :key="i" v-for="(acco, i) in SearchAccope">
                    <a href @click="goToDetail(acco.ACCO_ID);" >                    
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
                            <b style="color: rgba(0,0,0,1);">{{ getCurrencyFormat(acco.ACCO_PRICE) }}원</b>
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
  

</div>
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
      SearchAccoho: [],
      SearchAccomo: [],
      SearchAccope: [],
      type: 'A'
    };
  },
  created() {
    this.getSearchAcco();
    
  },
  methods: {
    async getSearchAcco() {
      this.SearchAcco = await this.$api("/api/SearchAcco", {});
      this.SearchAccoho = await this.$api("/api/SearchAccoho", {});
      this.SearchAccomo = await this.$api("/api/SearchAccomo", {});
      this.SearchAccope = await this.$api("/api/SearchAccope", {});
      console.log(this.SearchAcco);
    },
    
    goToDetail(ACCO_ID) {
      this.$router.push({ path: '/acco_detail', query: { ACCO_ID: ACCO_ID } });
    },
    ascSort() {
      this.SearchAcco.sort(function (a, b) {
        return b.ACCO_PRICE - a.ACCO_PRICE;
      });
      this.SearchAccoho.sort(function (a, b) {
        return b.ACCO_PRICE - a.ACCO_PRICE;
      });
      this.SearchAccomo.sort(function (a, b) {
        return b.ACCO_PRICE - a.ACCO_PRICE;
      });
      this.SearchAccope.sort(function (a, b) {
        return b.ACCO_PRICE - a.ACCO_PRICE;
      });
    },
    descSort() {
      this.SearchAcco.sort(function (a, b) {
        return a.ACCO_PRICE - b.ACCO_PRICE;
      });
      this.SearchAccoho.sort(function (a, b) {
        return a.ACCO_PRICE - b.ACCO_PRICE;
      });
      this.SearchAccomo.sort(function (a, b) {
        return a.ACCO_PRICE - b.ACCO_PRICE;
      });
      this.SearchAccope.sort(function (a, b) {
        return a.ACCO_PRICE - b.ACCO_PRICE;
      });
    },
    getCurrencyFormat(value){
      return this.$currencyFormat(value);
    },
    all(){
      return this.type = 'A'
    },
    hotel(){
      return this.type = 'B'
    },
    motel(){
      return this.type = 'C'
    },
    pension(){
      return this.type = 'D'
    }
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

#body-wrapper {
    min-height: 100%;
    position: relative;
}

#body-content {
    margin-top: 100px;
    padding-bottom: 99999px; /* footer의 높이 */
}
</style>
