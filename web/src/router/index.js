import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Notice_List from '../views/notice/notice_list.vue'
import My_info from '../views/notice/my_info.vue'
import Change_pass from '../views/notice/change_pass.vue'
import Edit_info from '../views/notice/edit_info.vue'
import Club_List from '../views/club/club_list.vue'
import Add_club from '../views/club/add_club.vue'
import My_club from '../views/club/my_club.vue'
import My_app from '../views/club/my_app.vue'
import Club_info from '../views/club/club_info.vue'

import club_admin from '../views/clubAdmin.vue'
import Club_del from '../views/admin/club_del.vue'
import Introduce_edit from '../views/admin/introduce_edit.vue'
import Add_notice from '../views/admin/add_notice.vue'
import Club_notice from '../views/admin/club_notice.vue'
import App_list from '../views/admin/app_list.vue'
import Menber_list from '../views/admin/menber_list.vue'
import Change_post from '../views/admin/change_post.vue'
import Get_menber from '../views/admin/get_menber.vue'
import Message_info from '../views/message/message_info.vue'
import Message_list from '../views/message/message_list.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotMatch from '../views/404.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/',component: Notice_List},
      {path:'/club_List',component: Club_List},
      {path:'/my_club',component: My_club},
      {path:'/my_app',component: My_app},
      {path:'/my_info',component: My_info},
      {path:'/message_info/:id',component:Message_info},
      {path:'/message_list',component:Message_list},
      {path:'/club_info/:id',component:Club_info},
      {path:'/edit_info/:id',component:Edit_info},
      {path:'/change_pass/:id',component:Change_pass},
    ]
  },
  {path:'/register',name: 'Register',component: Register},
  {path:'/add_club',component: Add_club},
  {
    path:'/club_admin/:id',
    component: club_admin,
    children:[
      {path:'/club_admin/:id/club_info',component: Club_info,props:true},
      {path:'/club_admin/:id/club_del',component: Club_del},
      {path:'/introduce_edit/:id',component:Introduce_edit},
      {path:'/club_notice/:id',component:Club_notice},
      {path:'/add_notice/:id',component:Add_notice,props:true},
      {path:'/app_list/:id',component:App_list},
      {path:'/menber_list/:id',component:Menber_list},
      {path:'/change_post/:id',component:Change_post},
      {path:'/get_menber/:id',component:Get_menber}
    ]
  },
  {path:'/login',name: 'Login',component: Login},
  {path: '*',name: '404',component: NotMatch}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
