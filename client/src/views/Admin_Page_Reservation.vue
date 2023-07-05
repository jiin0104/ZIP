<style>
.board-list table {
  width: 104%;
  border-collapse: collapse;
  margin-top: 20px;
}

.board-list th,
.board-list td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.board-list thead th {
  background-color: #f2f2f2;
}

.board-list tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
<template>
  <main>
    <div class="container">
      <div
        class="dorne-contact-area d-md-flex container"
        id="contact"
        style="padding-top: 43px; padding-bottom: 43px; height: auto"
      >
        <!-- 버튼부분-->
        <div style="width: 35%; padding-top: 60px">
          <div class="leftsidebar" style="width: 20%">
            <button
              type="button"
              id="mypage_button"
              style="max-width: 20px; margin: 0px 0px 0px 45px; color: red"
            >
              예약관리
            </button>
          </div>
          <div class="leftsidebar" style="width: 20%">
            <button
              type="button"
              id="mypage_button"
              style="max-width: 20px; margin: 0px 0px 0px 45px"
            >
              회원관리
            </button>
          </div>
        </div>
        <!-- 여기가 오른쪽에 있는 내용 -->
        <div style="padding-top: 54px">
          <!-- 리스트 상단 -->
          <div
            class="top"
            style="
              overflow: visible;
              height: 80px;
              border-top: none;
              border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            "
          >
            <h3 style="float: left">관리자페이지 예약관리</h3>
            <div class="write-button" style="float: right">
              <button
                class="save-btn"
                style="border: none; height: 30px; line-height: 0px"
              >
                저장
              </button>
            </div>
          </div>

          <div
            class="board-list"
            style="width: 724px; margin-right: 31px; margin-bottom: 1rem"
          >
            <table>
              <thead>
                <tr>
                  <th>예약번호</th>
                  <th>체크인날짜</th>
                  <th>체크아웃날짜</th>
                  <th>아이디</th>
                  <th>회원코드</th>
                  <th>숙소명</th>
                </tr>
              </thead>
              <tbody>
                <tr onclick="">
                  <td>2000</td>
                  <td>2023-05-10</td>
                  <td>2023-05-13</td>
                  <td>abc</td>
                  <td>1000</td>
                  <th>숙소명1</th>
                </tr>
                <tr onclick="location.href='#';">
                  <td>2001</td>
                  <td>2023-05-10</td>
                  <td>2023-05-13</td>
                  <td>abc11</td>
                  <td>1001</td>
                  <th>숙소명2</th>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="...">
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" href="#">이전</a></li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  style="background: rgba(0, 0, 0, 0.08)"
                  >1</a
                >
              </li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">다음</a></li>
            </ul>
          </nav>
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
