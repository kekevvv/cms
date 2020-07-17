<template>
  <div  class="announcement">
      <div class="inner">
        <h1>{{clubInfo.club_name}}</h1>
        <div class="info-page" v-if="page==='社团信息'">
            <el-card class="box-card club-introduce">
            <div slot="header" class="top clearfix">
                <span>社团简介</span>
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
                    <div class="info-context">{{this.clubInfo.menbers.length}}</div>
                    <!-- <div class="info-context">{{clubInfo.members.length}}</div> -->
                </el-col>
                <el-col :span="8">
                    <span class="info-top">公告数</span>
                    <div class="info-context">{{this.notice.length}}</div>
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
                    <div class="admin-context">{{admin.name}}</div>
                </el-col>
                </el-row>
            </div>
            </el-card>
        </div>
        <div class="notice-page" v-if="page==='最新公告'">
            <div v-if="notice.length===0">暂时还没有公告</div>
            <ol v-else>
                <li v-for="item in notice" :key="item._id">
                    <el-row>
                        <el-col :span="18"><div class="context">{{item.public_content}} </div></el-col>
                        <el-col :span="6">
                            {{item.publish_admin}}
                                发布于
                            {{item.createdAt | formatDate }}
                        </el-col>
                    </el-row>
                </li>
            </ol>
        </div>
        <div class="menber-page" v-if="page==='成员信息'">
            <div v-if="more" class="menber-more">
                <el-row>
                    <el-col :span="8">
                        <div class="info-title">学号</div></el-col>
                    <el-col :span="8">
                        <div class="info-title">姓名</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-title">性别</div>
                    </el-col>
                </el-row>
                <el-row clas="info-context">
                    <el-col :span="8">{{menberMore.sno}}</el-col>
                    <el-col :span="8">{{menberMore.name}}</el-col>
                    <el-col :span="8">{{menberMore.gender}}</el-col>
                </el-row>
                <el-row clas="info-title">
                    <el-col :span="8">
                        <div class="info-title">联系方式</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-title">班级</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-title">创建日期</div>
                    </el-col>
                </el-row>
                <el-row clas="info-context">
                    <el-col :span="8">{{menberMore.phoneNumber}}</el-col>
                    <el-col :span="8">{{menberMore.class?menberMore.class:'未填写'}}</el-col>
                    <el-col :span="8">{{menberMore.createdAt.slice(0,10)}}</el-col>
                </el-row>
                <div class="back-button">
                    <el-button type="primary" size="mini" @click="back">返回</el-button>
                </div>
            </div>
            <div  v-else>
                <el-table :data="menbers" row-key="_id">
                    <el-table-column prop="sno" label="学号" width="300">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="300">
                    </el-table-column>
                    <el-table-column prop="post" label="职务">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope"> <!-- scope.row行数据 -->
                            <el-button type="info" icon="el-icon-edit" size="mini" @click="getMore(scope.row.stu_id)">详细信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="page-controller"  @click="back">
            <el-radio-group v-model="page">
            <el-radio-button label="社团信息"></el-radio-button>
            <el-radio-button label="最新公告"></el-radio-button>
            <el-radio-button label="成员信息"></el-radio-button>
            </el-radio-group>
        </div>
    </div>
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
      createdTime:'',
      page:"社团信息",
      notice:[],
      menbers:[],
      more:false,
      menberMore:{}
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
                this.menbers = this.clubInfo.menbers
                this.$http.get(`fetchNotice/${this.clubInfo._id}`).then(res=>{
                    this.notice = res.data
                })
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
        getMore(id){
            this.more = true
            this.menberMore = {}
            console.log(id)
            this.$http.get(`rest/student/${id}`).then(res=>{
                console.log(res.data)
                this.menberMore = res.data
            })
        },
        back(){
            this.more = false
        }
    },
    filters:{
        formatDate(str){
            if (!str) return ''
            var date = new Date(str)
            var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
            if (time < 0) {
                return ''
            } else if ((time / 1000 < 30)) {
                return '刚刚'
            } else if (time / 1000 < 60) {
                return parseInt((time / 1000)) + '秒前'
            } else if ((time / 60000) < 60) {
                return parseInt((time / 60000)) + '分钟前'
            } else if ((time / 3600000) < 24) {
                return parseInt(time / 3600000) + '小时前'
            } else if ((time / 86400000) < 31) {
                return parseInt(time / 86400000) + '天前'
            } else if ((time / 2592000000) < 12) {
                return parseInt(time / 2592000000) + '月前'
            } else {
                return parseInt(time / 31536000000) + '年前'
            }
        }
    }
}
</script>
<style>
.announcement{
    max-width: 1000px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
}
.inner{
    padding:40px;
}
.inner h1{
    font-size:30px;
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
}
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
.page-controller{
    width:35%;
    margin:0 auto;
    margin-top:50px;
}

.notice-page ol{
    margin-top: 30px;
}
.notice-page ol>li{
    margin:10px;
}
.notice-page ol .context{
    font-weight:bold;
}

.menber-more .info{
    width:80%;
    margin:0 auto;
}
.menber-more .info-title{
    color:#333333;
    font-size:22px;
}
.menber-more .back-button{
    float:right;
}
</style>