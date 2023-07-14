<template>
  <main class="mt-3">
    <br /><br />
    <div>
      <br />
      <br />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <h3 class="h3-size" style="float: left; text-indent: 110px">
            업체사진 등록
          </h3>
          <form action="" method="post">
            <div class="img_add" style="width: 400px; height: 500px">
              <img
                :src="`/download/${ACCO_ID}/${ACCO_IMAGE}`"
                class="d-block w-100"
                alt="..."
                style="width: 400px; height: auto"
              />
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02" />
                <label class="input-group-text" for="inputGroupFile02"></label>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-7">
          <div class="card shadow-sm" style="width: 500px; height: 510px">
            <div class="card-body">
              <h5 class="card-title" id="card1" style="float: left">업체명</h5>
              <br />
              <br />
              <input
                type="text"
                placeholder="업체명 입력"
                style="border: 1px solid; float: left"
                v-model="accommodations.ACCO_NAME"
              /><br /><br />
              <h5 class="card-title" id="card1" style="float: left">
                업체주소
              </h5>
              <br /><br />
              <div class="field2" style="float: left">
                <input
                  type="text"
                  id="zonecode"
                  placeholder="우편번호"
                  role="textbox"
                  v-model="zonecode"
                  readonly
                />
                <input
                  type="button"
                  @click="openPostcode"
                  value="우편번호 찾기"
                  id="postcode"
                  class="save-btn1"
                  style="height: 26px; line-height: 20px; min-width: 40px"
                /><br />
                <input
                  type="text"
                  placeholder="주소"
                  role="textbox"
                  v-model="accommodations.ACCO_ADDRESS1"
                  readonly
                  style="width: 67%; float: left"
                /><br />
                <input
                  type="text"
                  id="addressdetail"
                  placeholder="상세주소"
                  role="textbox"
                  v-model="accommodations.ACCO_ADDRESS1"
                  style="width: 67%; float: left"
                /><br />
              </div>

              <br />
              <br />
              <br />
              <br />
              <div>
                <br />
                <br />
                <h5 class="card-title" id="card1" style="float: left">
                  객실명
                </h5>
                <br /><br />
                <input
                  type="text"
                  style="size: 20px; border: 1px solid; float: left"
                  placeholder="객실명입력"
                  v-model="accommodations.ACCO_NAME"
                /><br /><br />
              </div>
              <h5 style="float: left">업체분류</h5>
              <br /><br />
              <div style="float: left">
                <input
                  type="checkbox"
                  id="adcno_0"
                  name="adcno[]"
                  class="inp_chk"
                  value="1"
                  v-model="accommodations.ACCO_TYPE"
                />
                <label>호텔</label>
                <br />
                <input
                  type="checkbox"
                  id="adcno_1"
                  name="adcno[]"
                  class="inp_chk"
                  value="2"
                  v-model="accommodations.ACCO_TYPE"
                />
                <label>모텔</label>
                <br />
                <input
                  type="checkbox"
                  id="adcno_2"
                  name="adcno[]"
                  class="inp_chk"
                  value="3"
                  v-model="accommodations.ACCO_TYPE"
                />
                <label>펜션</label>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
        <div>
          <br /><br />
          <!-- <input type="file" accept="image/png, image/jpeg" /> -->

          <h3>업체 상세 소개</h3>
          <textarea
            name="message"
            class="form-control"
            id="Message"
            cols="129"
            rows="10"
            placeholder="업체 상세 소개를 입력해주세요"
            v-model="accommodations.ACCO_DETAIL_DESCRIPTION"
          ></textarea>
          <br />
          <button
            type="button"
            class="save-btn1"
            style="border: none; float: right"
            @click="productInsert"
          >
            저장
          </button>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      accommodations: {
        ACCO_NAME: "",
        ACCO_ADDRESS1: "",
        ACCO_ADDRESS2: "",
        ACCO_TYPE: "",
        ACCO_DETAIL_DESCRIPTION: "",
      },
    };
  },
  beforeCreate() {},
  created() {},
  beforMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open();
    },
    async getProductImage() {
      this.productImage = await this.$api("/api/imageList", {
        param: [this.productId],
      });
      console.log("this.productImage", this.productImage);
    },
  },
};
</script>
