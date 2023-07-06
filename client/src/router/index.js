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

// import Reservation_info from "../views/Reservation_info.vue";

import Signup from "../views/Signup.vue";
import Acco_Detail from "../views/Acco_Detail.vue";
import Search_List from "../views/Search_List.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },

  {
    path: "/search_list",
    name: "search_list",
    component: Search_List,
  },

  {
    path: "/admin_page_reservation",
    name: "admin_page_reservation",
    component: Admin_Page_Reservation,
  },

  {
    path: "/admin_page_user",
    name: "admin_page_user",
    component: Admin_Page_User,
  },

  {
    path: "/admin_product_create",
    name: "admin_product_create",
    component: Admin_Product_Create,
  },

  // {
  //   path: '/find_id_result',
  //   name: 'find_id_result',
  //   component: Find_Id_Result
  // },

  {
    path: '/find_idpw',
    name: 'find_idpw',
    component: Find_IdPw
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
  },

  {
    path: "/my_delete",
    name: "my_delete",
    component: My_Delete,
  },

  {
    path: "/my_reservation",
    name: "my_reservation",
    component: My_Reservation,
  },

  {
    path: "/my_update",
    name: "my_update",
    component: My_Update,
  },

  {
    path: "/mypage_pw_check",
    name: "mypage_pw_check",
    component: Mypage_Pw_Check,
  },

  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
  },

  {
    path: "/payment",
    name: "payment",
    component: Payment,
  },

  // {
  //   path: "/Reservation_info",
  //   name: "Reservation_info",
  //   component: Reservation_info,
  // },

  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },

  {
    path: "/acco_detail",
    name: "acco_detail",
    component: Acco_Detail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
