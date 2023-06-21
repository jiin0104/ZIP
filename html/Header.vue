<template>
  <header class="header_area" id="header">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-12 h-100">
          <nav class="h-100 navbar navbar-expand-lg">
            <a class="navbar-brand" href="로고 홈 리다이렉트">집탈출</a>
            <!-- Nav -->
            <div class="collapse navbar-collapse justify-content-end" id="zipNav">
              <div class="zip-signin-btn">
                <a href="#">로그인</a>
              </div>
              <details>
                <summary>메뉴</summary>
                <ul class="navbar-nav mr-auto" id="zipMenu">
                  <a class="dropdown-item" href="">내 정보</a>
                  <a class="dropdown-item" href="">예약 내역</a>
                  <a class="dropdown-item" href="">이용 내역</a>
                  <a class="dropdown-item" href="">내 찜 목록</a>
                </ul>
              </details>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'header'
}
</script>