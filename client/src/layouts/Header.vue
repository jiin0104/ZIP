<template>
  <header class="header_area" id="header">
    <!-- 회원용 헤더 내용 -->
    <div class="header1 container h-100" v-if="isLogin && userGd === 'member'">
      <h1><a href="#" class="logo">
          <RouterLink to= />
          <img alt="Vue logo" src="@/layouts/logo.png" width="80"></RouterLink>
        </a></h1>
      <div class="menuWrap">
        <ul class="menu">
          <li><a @click="kakaoLogout"><RouterLink to='/'>로그아웃</RouterLink></a></li>
          <li><RouterLink to='/Mypage'>내정보</RouterLink></li>
          <li><RouterLink to='/My_Reservation'>예약내역</RouterLink></li>
        </ul>
      </div>
    </div>
        <!-- 관리자용 헤더 내용 -->
        <div class="header1 container h-100" v-else-if="isLogin && userGd === 'admin'">
      <h1><a href="#" class="logo">
          <RouterLink to= /><img alt="Vue logo" src="@/layouts/logo.png" width="80"></RouterLink>
        </a></h1>
      <div class="menuWrap">
        <ul class="menu">
          <li><a @click="kakaoLogout"><RouterLink to='/'>로그아웃</RouterLink></a></li>
          <li><RouterLink to='/Admin_Page_Reservation'>예약관리</RouterLink></li>
          <li><RouterLink to='/Admin_Page_User'>회원관리</RouterLink></li>
        </ul>
      </div>
    </div>
    <!-- 비회원용 헤더 내용 -->
    <div class="header1 container h-100" v-else>
      <h1><a href="#" class="logo">
          <RouterLink to= /><img alt="Vue logo" src="@/layouts/logo.png" width="80"></RouterLink>
        </a></h1>
      <div class="menuWrap">
        <ul class="menu">
          <li class="dorne-signin-btn">
            <a><RouterLink to='/login'>로그인</RouterLink></a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style src="./style.css"></style>

<style scoped>
.header1 {
  width: 100%;
  text-align: center;
  position: relative;
  height: 120px;
}

.header1 h1 {
  position: absolute;
  top: 5px;
  left: 140px;
}

.header1 ul.menu:after {
  display: block;
  clear: both;
  content: '';
}

.header1 ul.menu {
  position: absolute;
  top: 20px;
  right: 100px;
}

.header1 ul.menu li {
  float: left;
  padding: 10px 20px;
  list-style: none;
}

header {
  background-color: skyblue;
  position: sticky;
  top: 0;
  opacity: 0.7;
  backdrop-filter: blur(30px);
}

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.logoutmodal {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      userRole: 'member',
    }
  },
  computed: {
    ...mapState(['isLogin', 'userGd'])
  },
  methods: {
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        // store에 담긴 유저 정보의 data를 null값으로 만듦
        this.$store.commit("user", {});
        this.$store.commit("localUser", {});
        alert("로그아웃");
        this.$router.push({path:'/'}); // 로그아웃 이후 메인 페이지로 라우팅
        this.$store.commit('logOut') // 로그아웃 이후 헤더 게스트로 변환
      });
    }
  }
}
</script>
