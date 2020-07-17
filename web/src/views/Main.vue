<template>
  <div>
    <header class="menu">
        <img class="logo" src="../assets/img/logo.png">
        <nav>
          <ul>
            <li><a href="/">首页</a></li>
            <li>
              <a href="/club_list">社团列表</a>
            </li>
            <li v-if="token">
              <a href="/add_club">创建社团</a>
            </li>
            <li v-if="token">
              <a href="/my_app">我的申请</a>
            </li>
            <li v-if="token">
              <a href="/my_club">我的社团</a>
            </li>
            <li>
              <a href="/message_list">论坛</a>
            </li>
            <li v-if="token">
              <a href="/my_info">个人中心</a>
              </li>
            <li v-if="token" @click="logout">注销</li>
            <div v-else style="display:inline-block;">
              <li>
                <a href="/login">登录</a>
              </li>
              <li>
              <a href="/register">注册</a>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      <div class="banner">
        <div class="mask"></div>
      </div>
      <main class="main-body">
        <router-view></router-view>
      </main>
  </div>
</template>
<script>
export default {
  data(){
    return {
      token:localStorage.stu_id
    }
  },
  methods:{
    logout(){
        this.$store.commit('logout')
        this.$message({
            type:'success',
            message:'已注销'
        })
        this.$router.push('/')
        this.$router.go(0)
      }
  }
}
</script>
<style scoped>
.menu{
  padding:5px;
  color:#9FA0A3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.logo{
  cursor:pointer;
  margin-left:10px;
  padding:10px;
}
.menu nav{
  float:right;
  margin:20px;
}
.menu nav>ul li{
    display:inline-block;
    text-align: center;
    margin:0 25px;
    font-size:14px;
    cursor:pointer;
    border-bottom:3px solid transparent;
    border-top:3px solid transparent;
}
.menu ul li:hover{
  border-bottom:3px solid #f4736a;
}

.banner{
  background-image:url(../assets/img/rs-cover.jpg);
  height: 515px;
  background-position: center center;
  background-size:cover;
}
.banner .mask{
  height: 515px;
  background-color: rgba(0, 0, 0,0.8);
}
.main-body{
  margin-top: -300px;
}
</style>