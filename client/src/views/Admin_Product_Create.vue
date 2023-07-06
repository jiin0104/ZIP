<template>
  <main class="mt-3">
    <br /><br />
    <div>
      <h3 class="h3-size" style="float: left; text-indent: 110px">
        업체사진 등록
      </h3>
      <br />
      <br />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <form action="" method="post">
            <div class="img_add" style="width: 400px; height: auto">
              <img
                :src="'/download/${acco.acco_id}/${acco.acco_image}'"
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
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title" id="card1" style="float: left">업체명</h5>
              <br />
              <br />
              <input
                type="text"
                placeholder="업체명 입력"
                style="border: 1px solid; float: left"
              /><br /><br />
              <h5 class="card-title" id="card1" style="float: left">
                업체주소
              </h5>
              <br /><br />
              <div style="float: left">
                <input
                  type="text"
                  style="size: 20px; border: 1px solid"
                  placeholder="업체주소입력"
                />
                <button
                  type="button"
                  class="addressfind"
                  style="border: none; margin-left: 5px"
                >
                  주소찾기
                </button>
              </div>
              <br />
              <br />
              <h5 class="card-title" id="card1" style="float: left">객실명</h5>
              <br /><br />
              <input
                type="text"
                style="size: 20px; border: 1px solid; float: left"
                placeholder="객실명입력"
              /><br /><br />
              <h5 style="float: left">업체분류</h5>
              <br /><br />
              <div style="float: left">
                <input type="checkbox" class="hotel" />
                <label>호텔</label>
                <br />
                <input type="checkbox" class="motel" />
                <label>모텔</label>
                <br />
                <input type="checkbox" class="cottage" />
                <label>펜션</label>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
        <div>
          <br /><br />
          <h3>업체 상세 소개</h3>
          <textarea
            name="message"
            class="form-control"
            id="Message"
            cols="129"
            rows="10"
            placeholder="업체 상세 소개를 입력해주세요"
          ></textarea>
          <br />
          <button
            type="button"
            class="save-btn1"
            style="border: none; float: right"
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
  name: "",
  components: {},
  data() {
    return {
      sampledata: "",
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
  methods: {},
};
</script>
