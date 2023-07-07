import { createRouter, createWebHistory } from 'vue-router'
import Admin_Faq_Edit from '../views/Admin_Faq_Edit.vue'
import Admin_Faq_List from '../views/Admin/Admin_Faq_List.vue'
import Admin_Main from '../views/Admin_Main.vue'
import Admin_Notify_Edit from '../views/Admin_Notify_Edit.vue'
import Admin_Page_Acco from '../views/Admin_Page_Acco.vue'
import Admin_Page_Reservation from '../views/Admin_Page_Reservation.vue'
import Admin_Page_Room from '../views/Admin_Page_Room.vue'
import Admin_Page_User from '../views/Admin_Page_User.vue'
import Admin_Product_Create from '../views/Admin_Product_Create.vue'
import Admin_Product_Edit from '../views/Admin_Product_Edit.vue'
import Admin_Qna_Comment from '../views/Admin_Qna_Comment.vue'
import Find_Id_Result from '../views/Find_Id_Result.vue'
import Find_IdPw from '../views/Find_IdPw.vue'
import Find_Pw_Result from '../views/Find_Pw_Result.vue'
import Login from '../views/Login.vue'
import My_Delete from '../views/My_Delete.vue'
import My_Likelist from '../views/My_Likelist.vue'
import My_Reservation from '../views/My_Reservation.vue'
import My_Update from '../views/My_Update.vue'
import My_Uselist from '../views/My_Uselist.vue'
import Mypage_Pw_Check from '../views/Mypage_Pw_Check.vue'
import Mypage from '../views/Mypage.vue'
import Notify from '../views/Notify.vue'
import Payment from '../views/Payment.vue'
import Qna_Board from '../views/Qna_Board.vue'
import Qna_Inquiry from '../views/Qna_Inquiry.vue'
import Qna_List from '../views/Qna_List.vue'
import Reservation_Info from '../views/Reservation_Info.vue'
import Roomsdetail from '../views/Roomsdetail.vue'
import Search_List from '../views/Search_List.vue'
import Signup from '../views/Signup.vue'
import Acco_Detail from '../views/Acco_Detail.vue'




const routes = [

  {
    path: '/admin_faq_edit',
    name: 'admin_faq_edit',
    component: Admin_Faq_Edit
  },

  {
    path: '/faq_list',
    name: 'faq_list',
    component: Admin_Faq_List
  },

  {
    path: '/',
    name: 'main',
    component: Admin_Main
  },

  {
    path: '/admin_notify_edit',
    name: 'admin_notify_edit',
    component: Admin_Notify_Edit
  },

  {
    path: '/admin_page_acco',
    name: 'admin_page_acco',
    component: Admin_Page_Acco
  },

  {
    path: '/admin_page_reservation',
    name: 'admin_page_reservation',
    component: Admin_Page_Reservation
  },

  {
    path: '/admin_page_room',
    name: 'admin_page_room',
    component: Admin_Page_Room
  },

  {
    path: '/admin_page_user',
    name: 'admin_page_user',
    component: Admin_Page_User
  },

  {
    path: '/admin_product_create',
    name: 'admin_product_create',
    component: Admin_Product_Create
  },

  {
    path: '/admin_product_edit',
    name: 'admin_product_edit',
    component: Admin_Product_Edit
  },

  {
    path: '/admin_qna_comment',
    name: 'admin_qna_comment',
    component: Admin_Qna_Comment
  },

  {
    path: '/find_id_result',
    name: 'find_id_result',
    component: Find_Id_Result
  },

  {
    path: '/find_idpw',
    name: 'find_idpw',
    component: Find_IdPw
  },

  {
    path: '/find_pw_result',
    name: 'find_pw_result',
    component: Find_Pw_Result
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/my_delete',
    name: 'my_delete',
    component: My_Delete
  },

  {
    path: '/my_likelist',
    name: 'my_likelist',
    component: My_Likelist
  },

  {
    path: '/my_reservation',
    name: 'my_reservation',
    component: My_Reservation
  },

  {
    path: '/my_update',
    name: 'my_update',
    component: My_Update
  },

  {
    path: '/my_uselist',
    name: 'my_uselist',
    component: My_Uselist
  },

  {
    path: '/mypage_pw_check',
    name: 'mypage_pw_check',
    component: Mypage_Pw_Check
  },

  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage
  },

  {
    path: '/notify',
    name: 'notify',
    component: Notify
  },

  {
    path: '/payment',
    name: 'payment',
    component: Payment
  },

  {
    path: '/qna_board',
    name: 'qna_board',
    component: Qna_Board
  },

  {
    path: '/qna_inquiry',
    name: 'qna_inquiry',
    component: Qna_Inquiry
  },

  {
    path: '/qna_list',
    name: 'qna_list',
    component: Qna_List
  },

  {
    path: '/reservation_info',
    name: 'reservation_info',
    component: Reservation_Info
  },

  {
    path: '/roomsdetail',
    name: 'roomsdetail',
    component: Roomsdetail
  },

  {
    path: '/search_list',
    name: 'search_list',
    component: Search_List
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },

  {
    path: '/acco_detail',
    name: 'acco_detail',
    component: Acco_Detail
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
