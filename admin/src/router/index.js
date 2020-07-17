import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/superAdmin/Main.vue'
import Login from '../views/Login.vue'
import NotMatch from '../views/404.vue'
// superAdmin
import Notice_edit from '../views/superAdmin/notice/notice_edit.vue'
import Notice_List from '../views/superAdmin/notice/notice_list.vue'
import Admin_edit from '../views/superAdmin/admin/admin_edit.vue'
import Admin_List from '../views/superAdmin/admin/admin_list.vue'
import Club_list from '../views/superAdmin/club/club_list.vue'
import Get_club from '../views/superAdmin/club/get_club.vue'
import Del_app from '../views/superAdmin/club/del_app.vue'
import Create_app from '../views/superAdmin/club/create_app.vue'
import User_list from '../views/superAdmin/user/user_list.vue'
import Add_user from '../views/superAdmin/user/add_user.vue'
import Topic_list from '../views/superAdmin/topic/topic_list.vue'
import Get_topic from '../views/superAdmin/topic/get_topic.vue'
// president
import Select from '../views/president/select.vue'
import presidentMain from '../views/president/Main.vue'
import Club_info from '../views/president/club/club_info.vue'
import Introduce_edit from '../views/president/club/introduce_edit.vue'
import Club_del from '../views/president/club/club_del.vue'
import Club_notice from '../views/president/notice/club_notice.vue'
import Add_notice from '../views/president/notice/add_notice.vue'
import App_list from '../views/president/application/app_list.vue'
import Menber_list from '../views/president/menber/menber_list.vue'
import Menber_info from '../views/president/menber/menber_info.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',name:'login',component:Login,meta:{isPublic:true}},
  {path:'/login',name:'login',component:Login,meta:{isPublic:true}},
  {path:'/select',name:'select',component:Select},
  {
    path: '/super_admin',
    name: 'main',
    component: Main,
    children:[
      // props表示的是将url中的参数params都注入到Notice_edit页面里，比this.$route.params.id简便
      {path:'/super_admin/notice_edit/:id',name: 'notice_edit',component: Notice_edit,props:true},
      {path:'/super_admin/notice_create',component: Notice_edit},
      {path:'/super_admin/notice_list',component: Notice_List},
      {path:'/super_admin/admin_edit/:id',component: Admin_edit,props:true},
      {path:'/super_admin/admin_list',component: Admin_List},
      {path:'/super_admin/admin_create',component: Admin_edit},
      {path:'/super_admin/club_list',component: Club_list,props:true},
      {path:'/super_admin/get_club/:id',component: Get_club,props:true},
      {path:'/super_admin/del_club',component: Del_app,props:true},
      {path:'/super_admin/create_app',component: Create_app},
      {path:'/super_admin/user_list',component: User_list},
      {path:'/super_admin/add_user',component: Add_user},
      {path:'/super_admin/topic_list',component: Topic_list},
      {path:'/super_admin/get_topic/:id',component: Get_topic}
    ]
  },
  {
    
    path: '/president/:id',
    name:'president',
    component: presidentMain,
    children:[
      {path:'/president/:id',component: Club_info},
      {path:'/president/introduce_edit/:id',component: Introduce_edit},
      {path:'/president/club_del/:id',component: Club_del},
      {path:'/president/club_notice/:id',component: Club_notice},
      {path:'/president/add_notice/:id',component: Add_notice},
      {path:'/president/app_list/:id',component: App_list},
      {path:'/president/menber_list/:id',component: Menber_list},
      {path:'/president/menber_info/:id',component: Menber_info}
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotMatch
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to,from,next)=>{
//   if(!to.meta.isPublic && !localStorage.token){
//     return next('/login')
//   }
//   next() //正常进入该路由
// })
export default router
