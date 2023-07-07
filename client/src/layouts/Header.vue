<template>
  <header class="header_area" id="header">
    <!-- 회원용 헤더 내용 -->
    <div class="header1 container h-100" v-if="userRole === 'member'">
      <h1><a href="#" class="logo">
          <RouterLink to= />
          <img alt="Vue logo" src="@/layouts/logo.png" width="80"></RouterLink>
        </a></h1>
      <div class="menuWrap">
        <ul class="menu">
          <li><a @click="logout"><RouterLink to='/'>로그아웃</RouterLink></a></li>
          <li><RouterLink to='/Mypage'>내정보</RouterLink></li>
          <li><RouterLink to='/My_Reservation'>예약내역</RouterLink></li>
        </ul>
      </div>
    </div>
    <!-- 비회원용 헤더 내용 -->
    <div class="header1 container h-100" v-else-if="userRole === 'guest'">
      <h1><a href="#" class="logo">
          <RouterLink to= /><img alt="Vue logo" src="@/layouts/logo.png" width="80"></RouterLink>
        </a></h1>
      <div class="menuWrap">
        <ul class="menu">
          <li class="dorne-signin-btn">
            <RouterLink to='/Login'>로그인</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- 관리자용 헤더 내용 -->
    <div class="header1 container h-100" v-else-if="userRole === 'admin'">
      <h1><a href="#" class="logo">
          <RouterLink to= /><img alt="Vue logo" src="@/layouts/logo.png" width="80"></RouterLink>
        </a></h1>
      <div class="menuWrap">
        <ul class="menu">
          <li><a @click="logout"><RouterLink to='/'>로그아웃</RouterLink></a></li>
          <li><RouterLink to='/Admin_Page_Reservation'>예약관리</RouterLink></li>
          <li><RouterLink to='/Admin_Page_User'>회원관리</RouterLink></li>
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
export default {
  name: 'header',
  data() {
    return {
      userRole: 'admin', // 사용자 역할을 저장하는 변수
    }
  },
  methods: {
    logout() {
      this.userRole = 'guest';
    },
    login() {
      this.userRole = 'member';
    }
  }
  // 사용자 역할을 확인하고 userRole 값을 업데이트하는 로직 필요
}
</script>

<!-- <script>
export default {
  name: 'header',
  data() {
    return {
      userRole: 'guest' // 사용자 역할을 저장하는 변수
    };
  },
  methods: {
    fetchUserRole() {
      // 사용자 역할을 확인하는 API 호출
      // ...

      // API 응답에서 사용자 역할 정보 추출
      const userRole = response.data.role;

      // userRole 값을 업데이트
      this.userRole = userRole;
    }
  },
  created() {
    this.fetchUserRole(); // 컴포넌트가 생성될 때 사용자 역할 정보 가져오기
  }
};
</script> -->
