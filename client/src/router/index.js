import { createRouter, createWebHistory } from "vue-router";
import Admin_Page_Reservation from "../views/Admin_Page_Reservation.vue";
import Admin_Page_User from "../views/Admin_Page_User.vue";
import Admin_Product_Create from "../views/Admin_Product_Create.vue";
// import Find_Id_Result from '../views/Find_Id_Result.vue'
import Find_IdPw from '../views/Find_IdPw.vue'
// import Find_Pw_Result from '../views/Find_Pw_Result.vue'
import Login from "../views/Login.vue";
import My_Delete from "../views/My_Delete.vue";
import My_Reservation from "../views/My_Reservation.vue";
import My_Update from "../views/My_Update.vue";
import Mypage_Pw_Check from "../views/Mypage_Pw_Check.vue";
import Mypage from "../views/Mypage.vue";
import Payment from "../views/Payment.vue";
import Reservation_info from "../views/Reservation_info.vue";
import Signup from "../views/Signup.vue";
import Acco_Detail from "../views/Acco_Detail.vue";
import Search_List from "../views/Search_List.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {}
  },

  {
    path: "/search_list",
    name: "search_list",
    component: Search_List,
    meta: {}
  },

  {
    path: "/admin_page_reservation",
    name: "admin_page_reservation",
    component: Admin_Page_Reservation,
    meta: {
      roles: [ 'admin' ]
    }
  },

  {
    path: "/admin_page_user",
    name: "admin_page_user",
    component: Admin_Page_User,
    meta: {
      roles: [ 'admin' ]
    }
  },

  {
    path: "/admin_product_create",
    name: "admin_product_create",
    component: Admin_Product_Create,
    meta: {
      roles: [ 'admin' ]
    }
  },

  // {
  //   path: '/find_id_result',
  //   name: 'find_id_result',
  //   component: Find_Id_Result
  // },

  {
    path: '/find_idpw',
    name: 'find_idpw',
    component: Find_IdPw,
    meta: {}
  },

  // {
  //   path: '/find_pw_result',
  //   name: 'find_pw_result',
  //   component: Find_Pw_Result
  // },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {}
  },

  {
    path: "/my_delete",
    name: "my_delete",
    component: My_Delete,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/my_reservation",
    name: "my_reservation",
    component: My_Reservation,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/my_update",
    name: "my_update",
    component: My_Update,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/mypage_pw_check",
    name: "mypage_pw_check",
    component: Mypage_Pw_Check,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/payment",
    name: "payment",
    component: Payment,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/Reservation_info",
    name: "Reservation_info",
    component: Reservation_info,
    meta: {
      roles: [ 'member', 'admin' ]
    }
  },

  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {}
  },

  {
    path: "/acco_detail",
    name: "acco_detail",
    component: Acco_Detail,
    meta: {}
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 유저 접근 권한 설정
// router.beforeEach((to, from, next) => {
//   let roleStatus = '..' // 권한 상태
//   if (to.meta.roles && !to.meta.roles.includes(roleStatus)) {
//     alert('로그인이 필요합니다.')
//     next(from)
//   } else {
//     next()
//   }
// })

export default router;
