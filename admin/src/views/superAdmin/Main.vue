<template>
<el-container style="height: 100vh;">
  <el-header style="text-align: left;">
    <span style="font-size: 20px">学生社团管理系统</span>
    <div style="float:right;">
      欢迎您，{{userInfo.name}}
      <span class="logout" @click="logout">退出</span>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px" style="background-color: #EFEFEF">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-bell"></i>公告管理</template>
            <el-menu-item index="/super_admin/notice_list">公告列表</el-menu-item>
            <el-menu-item index="/super_admin/notice_create">添加公告</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>社团管理</template>
            <el-menu-item index="/super_admin/club_list">社团列表</el-menu-item>
            <el-menu-item index="/super_admin/create_app">社团创建审批</el-menu-item>
            <el-menu-item index="/super_admin/del_club">社团删除审批</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-user"></i>用户管理</template>
          <el-menu-item index="/super_admin/user_list">用户列表</el-menu-item>
          <el-menu-item index="/super_admin/add_user">新增用户</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-chat-dot-round"></i>论坛管理</template>
          <el-menu-item index="/super_admin/topic_list">主题列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
          <el-menu-item index="/super_admin/admin_list">管理员列表</el-menu-item>
          <el-menu-item index="/super_admin/admin_create">新增管理员</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
  .el-header {
    background-color: #222222;
    color: #fff;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .logout{
    margin-left:10px;
  }
  .logout:hover{
    cursor:pointer;
    color:#EFEFEF;
  }
</style>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        info:{}
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      logout(){
        this.$store.commit('logout')
        this.$router.push('/login')
      }
    },
    created(){
        this.$store.dispatch('checkLogin').then(()=>{
         this.info = this.userInfo
        })
    },
  }
</script>