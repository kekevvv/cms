<template>
  <div class="notice">
    <h1>申请删除社团</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="社团名">
        {{clubInfo.club_name}}
      </el-form-item>
      <el-form-item label="申请删除理由">
        <el-input resize="none" type="textarea" :rows="3" placeholder="请输入内容" v-model="clubInfo.reason"></el-input>
      </el-form-item>
      <el-form-item label="申请人">
        {{this.userInfo.name}}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">发送申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      clubInfo:{},
      id:this.$route.params.id
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.$store.dispatch('checkLogin').then(()=>{
        this.$http.get(`rest/club/${this.id}`).then(res=>{
          this.clubInfo = res.data
        })
      })
      
    },
    save(){
      this.clubInfo.applicant_id = this.userInfo._id
      this.clubInfo.applicant = this.userInfo.name
      this.clubInfo.club_id = this.id
      this.clubInfo.app_type = 1
      let str = JSON.stringify(this.clubInfo)
      let newObj = JSON.parse(str)
      this.$http.post('rest/clubapplication',newObj).then(()=>{
        this.$message({
          type:'success',
          message:'提交申请成功'
        })
        this.$router.push(`/president/${this.id}`)
      },(error)=>{
        if(error.response.status===500){
          this.$message({
            type:'error',
            message:'你已提交过申请'
          })
        }
      })
    }
  },

}
</script>
<style scoped>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
</style>