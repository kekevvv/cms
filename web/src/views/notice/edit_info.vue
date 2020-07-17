<template>
  <div class="edit-info">
    <div class="edit-info-title">
        <h1>修改个人信息</h1>
    </div>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="学号">
        {{info.sno}}
      </el-form-item>
      <el-form-item label="姓名">
        {{info.name}}
      </el-form-item>
      <el-form-item label="姓名">
        {{info.gender}}
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input type="text" v-model="info.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input type="text" v-model="info.class"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">修改</el-button>
        <el-button native-type="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      info:{},
      id:this.$route.params.id,
    }
  },
  created(){
    this.$store.dispatch('checkLogin').then(()=>{
      this.init()
    })
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
      init(){
        this.info = this.userInfo
      },
      save(){
        this.$http.put(`rest/student/${this.id}`,this.info).then(()=>{
          this.$message({
              type:'success',
              message:'修改成功'
          })
          this.$router.push('/my_info')
        })
      },
  },

}
</script>
<style scoped>
.edit-info{
    max-width: 1000px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
    padding:40px;
}
.edit-info-title{
    padding:20px;
}
.edit-info-title h1{
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
    font-size:36px;
}
</style>