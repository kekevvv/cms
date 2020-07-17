<template>
  <div class="notice">
    <h1>{{info.club_name}}</h1>
    <div class="info">
        <el-card class="box-card">
            <div slot="header" class="top clearfix">
                <span>社团简介</span>
            </div>
            <div class="context">
                {{info.introduce}}
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="top clearfix">
                <span>成员</span>
            </div>
            <div class="context">
                <el-table :data="this.info.menbers" row-key="_id">
                    <el-table-column prop="name" label="姓名" width="400">
                    </el-table-column>
                    <el-table-column prop="sno" label="学号" width="400">
                    </el-table-column>
                    <el-table-column prop="post" label="职务" width="400">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
    <div class="menbers"></div>
  </div>
</template>
<script>
export default {
  props:{
    id:{}
  },
  data(){
    return {
      info:{},
      // id:this.$route.params.id
    }
  },
  created(){
    this.init()
  },
  methods:{
      init(){
        if(this.id){
          this.$http.get(`rest/club/${this.id}`).then((res)=>{
            this.info = res.data
            for(let i = 0;i<this.info.members.length;i++){
                this.$http.get(`rest/student/${this.info.members[i]}`).then(res=>{
                    this.stu.push(res.data)
                })
            }
          })
        }else{
          this.info = {}
        }
      }
   }
}
</script>
<style scoped>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
  .box-card{
      margin-top:10px;
  }
</style>