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
            <div class="info-context">{{membersNum}}</div>
            <!-- <div class="info-context">{{clubInfo.members.length}}</div> -->
          </el-col>
          <el-col :span="8">
            <span class="info-top">公告数</span>
            <div class="info-context">{{noticeNum}}</div>
            <!-- <div class="info-context">{{clubInfo.notice.length}}</div> -->
          </el-col>
          <el-col :span="8">
            <span class="info-top">成立日期</span>
            <div class="info-context">{{createdTime}}</div>
            <!-- <div class="info-context">{{clubInfo.createdAt.slice(0,10)}}</div> -->
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
            <!-- {{admin.name}} -->
            <div class="admin-context">张三</div>
          </el-col>
          <el-col :span="12">
            <span class="admin-top">副社长</span>
            <div class="admin-context">暂无</div>
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
      sec_admin:{},
      membersNum:0,
      noticeNum:0,
      createdTime:''
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
              this.membersNum = this.clubInfo.members.length
              this.noticeNum = this.clubInfo.notice.length
              this.createdTime = this.clubInfo.createdAt.slice(0,10)
              this.getAdmin()
          })
        },
        getAdmin(){
          this.$http.get(`rest/student/${this.clubInfo.admin_id}`).then(res=>{
            this.admin = res.data
          })
          if(!this.clubInfo.sec_admin_id){
            this.sec_admin.name = '暂无'
          }else{
            this.$http.get(`rest/student/${this.clubInfo.sec_admin_id}`).then(res=>{
              this.sec_admin = res.data
            })
          }
        },
        update(){
          let url = `/introduce_edit/${this.id}`
          this.$router.push(url)
        }
    }
}
</script>
<style>
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