<template>
  <main class="mt-3">
    <form id="app4" @submit="checkForm3" action="/admin_product_create" method="post" novalidate="true">
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
          <br />
          <!-- <form action="" method="post" enctype="multipart/form-data">
            <div class="position-relative" style="width: 400px; height: 500px">
              <br />
              <img
                :src="`/download/${ACCO_ID}/${ACCO_IMAGE}`"
                class="img-fluid"
                alt="..."
                style="width: 400px; height: auto"
              />
              <div class="input-group mb-3">
                <input
                  type="file"
                  class="form-control"
                  accept="image/png,image/jpeg"
                  @change="uploadFile($event.target.files)"
                />
              </div>
            </div>
          </form> -->
        </div>
        <div class="col-md-7">
          <div class="card shadow-sm" style="width: 500px; height: 600px">
            <div class="card-body">
              <h5 class="card-title" id="card1" style="float: left">업체명</h5>
              <br />
              <br />
              <input type="text" placeholder="업체명 입력" style="border: 1px solid; float: left" v-model="ACCO_NAME"/><br /><br />
              <h5 class="card-title" id="card1" style="float: left">
                업체주소
              </h5>
              <br /><br />
              <div class="field2">
                <b label for="address">주소</b><br />
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
                /><br />
                <input
                  type="text"
                  placeholder="주소"
                  role="textbox"
                  v-model="roadAddress"
                  readonly
                  style="width: 67%"
                /><br />
                <input
                  type="text"
                  id="addressdetail"
                  placeholder="상세주소"
                  role="textbox"
                  v-model="detailAddress"
                  style="width: 67%"
                /><br />
              </div>
              <br />
              <div>
                <h5 class="card-title" id="card1" style="float: left">
                  객실명
                </h5>
                <br /><br />
                <input
                  type="text"
                  style="size: 20px; border: 1px solid; float: left"
                  placeholder="객실명입력"
                  v-model="ACCO_ROOM"
                /><br /><br />
              </div>
              <div>
                <h5 class="card-title" id="card1" style="float: left">가격</h5>
                <br /><br />
                <input
                  type="text"
                  style="size: 20px; border: 1px solid; float: left"
                  placeholder="가격입력"
                  v-model="ACCO_PRICE"
                /><br /><br />
              </div>
              <h5 style="float: left">업체분류</h5>
              <br /><br />
              <div style="float: left">
                <input
                  type="radio"
                  id="adcno_0"
                  name="adcno[]"
                  class="inp_chk"
                  value="1"
                  v-model="ACCO_TYPE"
                />
                <label>호텔</label>
                <br />
                <input
                  type="radio"
                  id="adcno_1"
                  name="adcno[]"
                  class="inp_chk"
                  value="2"
                  v-model="ACCO_TYPE"
                />
                <label>모텔</label>
                <br />
                <input
                  type="radio"
                  id="adcno_2"
                  name="adcno[]"
                  class="inp_chk"
                  value="3"
                  v-model="ACCO_TYPE"
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
          <h3>업체 간단한 소개</h3>
          <textarea
            name="message"
            class="form-control"
            id="Message"
            cols="129"
            rows="10"
            placeholder="업체 간단한 소개를 입력해주세요"
            v-model="ACCO_INTRODUCE_COMMENT"
          ></textarea>

          <h3>업체 상세 소개</h3>
          <textarea
            name="message"
            class="form-control"
            id="Message"
            cols="129"
            rows="10"
            placeholder="업체 상세 소개를 입력해주세요"
            v-model="ACCO_DETAIL_DESCRIPTION"
          ></textarea>
          <br />
          <!-- <button
            type="button"
            class="save-btn1"
            style="border: none; float: right"
            @click="productInsert()"
          >
            저장
          </button> -->
          <input type="submit" id="addallow" value="생성하기">
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  </form>
  </main>
</template>
<script>
import axios from 'axios';

export default {
  
  el: '#app4',
  data() {
    return {
      errors: [],
      ACCO_NAME: "",
      roadAddress: "",
      detailAddress: "",
      ACCO_TYPE: "",
      ACCO_INTRODUCE_COMMENT: "",
      ACCO_DETAIL_DESCRIPTION: "",
      ACCO_ROOM: "",
      ACCO_PRICE: "",
    };
  },


  methods: {
    openPostcode() {
      //주소찾기 로직
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open();
    },
    // async getProductImage() {
    //   this.productImage = await this.$api("/api/imageList", {
    //     param: [this.productId],
    //   });
    //   console.log("this.productImage", this.productImage);
    // },

    checkForm3(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.ACCO_NAME) {
        alert("숙소명은 필수 입력입니다");
      }
      if (!this.ACCO_TYPE) {
        alert("숙소종류는 필수 입력입니다");
      }
      // if (this.ACCO_IMAGE == "") {
      //   return alert("이미지는 필수 입력입니다");
      // }
      if (!this.ACCO_ROOM) {
        alert("객실명은 필수 입력입니다");
      }
      if (!this.roadAddress) {
        alert("숙소주소는 필수 입력입니다");
      }
      // if (!this.ACCO_ADDRESS2) {
      //   return alert("숙소주소는 필수 입력입니다");
      // }
      // if (confirm == "정말 등록하시겠습니까") {
      //   this.$api("/api/create_accommodations", {
      //     param: [this.create_accommodations],
      //   });
      //   this.$router.push({ path: "/" });
      // }
      if (this.errors.length === 0) {
          this.productInsert();
        }
    },

    productInsert(){
      const formData = {
        
        ACCO_NAME: this.ACCO_NAME,
        roadAddress: this.roadAddress,
        detailAddress: this.detailAddress,
        ACCO_TYPE: this.ACCO_TYPE,
              
        ACCO_INTRODUCE_COMMENT: this.ACCO_INTRODUCE_COMMENT,
        ACCO_DETAIL_DESCRIPTION: this.ACCO_DETAIL_DESCRIPTION,
        ACCO_ROOM: this.ACCO_ROOM,
        ACCO_PRICE: this.ACCO_PRICE,
      };

      axios.post('/admin_product_create', formData)//서브밋한 값들을 받아서 서버에 전달.
          .then(response => {
            if (response.data.message) {
              alert(response.data.message);
              // 등록 완료 후 메인 페이지로 리다이렉트
              location.href = "/";
            } else {
              alert('숙소 등록에 실패했습니다.');
              console.log(formData);
            }
          })
          .catch(error => {
            console.error('숙소등록 실패', error);
            alert('숙소등록 실패. 확인 후 다시 시도해 주세요');
          });


    }




    // async getACCO_IMAGE() {
    //   this.ACCO_ID = await this.$api("/api/imageList", {
    //     param: [this.ACCO_ID],
    //   });
    //   console.log("this.ACCO_ID", this.ACCO_ID);
    // },

    // async uploadFile(files) {
    //   let name = "";
    //   let data = null;
    //   if (files) {
    //     name = files[0].name;
    //     data = await this.$base64(files[0]);
    //   }
    //   const { error } = await this.$api(`/upload/${this.ACCO_ID}/${name}`, {
    //     data,
    //   });
    //   if (error) {
    //     return alert("이미지 업로드 실패했습니다. 다시 시도하세요");
    //   }
    //   alert("이미지가 업로드 되었습니다.");
    // },
  },
};
</script>
