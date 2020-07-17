<template>
  <div class="notice">
    <div class="login-container">
        <el-card header="申请创建社团" class="login-card">
            <el-form :model="clubInfo" :rules="rules" ref="clubInfo" @submit.native.prevent="save('clubInfo')">
                <el-form-item label="社团名称" prop="club_name">
                    <el-input placeholder="请输入名称"  v-model="clubInfo.club_name"></el-input>
                    </el-form-item>
                <el-form-item label="简介">
                    <el-input placeholder="请输入内容" resize="none" type="textarea" :rows="3" v-model="clubInfo.introduce"></el-input>
                </el-form-item>
                <el-form-item label="申请理由" prop="reason">
                    <el-input placeholder="请输入理由" resize="none" type="textarea" :rows="3" v-model="clubInfo.reason"></el-input>
                </el-form-item>
                <el-form-item label="申请人">
                    {{userInfo.name}}
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" native-type="submit">发送申请</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      clubInfo:{},
      stu_id:localStorage.stu_id,
      rules:{
        club_name:{required: true, message: '请输入社团名称', trigger: 'blur' },
        reason:{required: true, message: '请输入理由', trigger: 'blur'}
      }
    }
  },
  computed:{
      ...mapState(['userInfo'])
  },
  created(){
    this.$store.dispatch('checkLogin')
  },
  methods:{
      save(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.clubInfo.app_type = 0
              this.clubInfo.applicant_id = this.stu_id
              this.clubInfo.applicant = this.userInfo.name
              this.$http.post('rest/clubapplication',this.clubInfo).then(()=>{
                this.$message({
                  type:'success',
                  message:'提交申请成功'
                })
                this.$router.push('/')
                })
            } else {
                return false;
            }
        })
      },
      
   },

}
</script>
<style scope>
.login-container{
    height: 100vh;
    background-color: #E1E1E1;
    padding:10rem 0;
}
.login-card{
    width:30rem;
    margin:0 auto;
}
</style>