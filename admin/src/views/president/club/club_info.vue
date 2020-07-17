<template>
  <div>
    <el-card class="box-card club-introduce">
      <div slot="header" class="top clearfix">
          <span>社团简介</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="update">修改</el-button>
      </div>
      <div class="context">
          {{clubInfo.introduce}}
      </div>
    </el-card>
    <el-card class="box-card club-info">
      <div slot="header" class="top clearfix">
          <span>当前信息</span>
      </div>
      <div class="context">
        <el-row>
          <el-col :span="8">
            <span class="info-top">成员人数</span>
            <div class="info-context">{{clubInfo.menbers.length}}</div>
          </el-col>
          <el-col :span="8">
            <span class="info-top">公告数</span>
            <div class="info-context">{{notice.length}}</div>
          </el-col>
          <el-col :span="8">
            <span class="info-top">成立日期</span>
            <div class="info-context">{{createdTime}}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card club-admin">
      <div slot="header" class="top clearfix">
          <span>社团负责人</span>
      </div>
      <div class="context">
        <el-row>
          <el-col :span="12">
            <span class="admin-top">社长</span>
            <div class="admin-context">
              {{admin.name}}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      clubInfo:{},
      id:this.$route.params.id,
      admin:{},
      createdTime:'',
      notice:[]
    }
  },
  created(){
        this.$store.dispatch('checkLogin').then(()=>{
            this.fetchClubInfo()
        })
    },
    methods:{
        fetchClubInfo(){
          this.$http.get(`rest/club/${this.id}`).then(res=>{
              this.clubInfo = res.data
              this.createdTime = this.clubInfo.createdAt.slice(0,10)
              this.getAdmin()
              this.$http.get(`fetchNotice/${this.id}`).then(res=>{
                this.notice = res.data
              })
          })
        },
        getAdmin(){
          this.$http.get(`rest/student/${this.clubInfo.admin_id}`).then(res=>{
            this.admin = res.data
          })
        },
        update(){
          let url = `/president/introduce_edit/${this.id}`
          this.$router.push(url)
        }
    }
}
</script>
<style scoped>
.top{
  font-size:18px;
  color:#5F6B79;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card{
  width: 90%;
  margin:0 auto;
}
.club-introduce{
  margin-top:50px;
}
.club-info,.club-admin{
  margin-top:40px;
}
.club-info .info-top{
  font-size:12px;
  color:#959595;
}
.club-info .info-context{
  color:#409EFF;
  margin-top:5px;
  font-size:28px;
}
.club-admin .admin-top{
  color:#959595;
}
.club-admin .admin-context{
  font-size:24px;
}
</style>