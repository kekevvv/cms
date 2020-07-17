<template>
<el-container style="height: 100vh;">
  <el-header style="text-align: left;">
    <span style="font-size: 20px">{{this.clubInfo.club_name}}</span>
    <div style="float:right;">
      欢迎您，{{userInfo.name}}
      <span class="logout" @click="logout">退出</span>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px" style="background-color: #EFEFEF">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-bell"></i>社团管理</template>
            <el-menu-item :index="info">社团信息</el-menu-item>
            <el-menu-item :index="del">申请删除社团</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>公告管理</template>
            <el-menu-item :index="noticeList">公告列表</el-menu-item>
            <el-menu-item :index="addNotice">添加公告</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-user"></i>成员管理</template>
          <el-menu-item :index="menberList">成员列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-chat-dot-round"></i>审核管理</template>
          <el-menu-item :index="appList">申请列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        clubInfo:{},
        myinfo:{},
        id:this.$route.params.id,
        info:'/president/' + this.$route.params.id ,
        del:'/president/club_del/' + this.$route.params.id,
        addNotice:'/president/add_notice/' + this.$route.params.id,
        noticeList :'/president/club_notice/' + this.$route.params.id,
        appList:'/president/app_list/' + this.$route.params.id,
        menberList:'/president/menber_list/' + this.$route.params.id,
      }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    created(){
        this.$store.dispatch('checkLogin').then(()=>{
            this.myinfo = this.userInfo
            this.fetchClubInfo()
        })
    },
    methods:{
        logout(){
          this.$store.commit('logout')
          this.$router.push('/login')
        },
        fetchClubInfo(){
            this.$http.get(`rest/club/${this.id}`).then(res=>{
                this.clubInfo = res.data
            },()=>{
              this.$message({
                type:'error',
                message:'该社团不存在'
              })
              this.$router.push('/')
            })
        }
    }
  };
</script>
<style scoped>
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