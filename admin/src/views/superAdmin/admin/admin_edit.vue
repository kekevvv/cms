<template>
  <div >
    <h1>新增管理员</h1>
    <div v-if="value">
      <el-form label-width="100px" @submit.native.prevent="save">
        <el-form-item label="旧的密码">
          <el-input v-model="old_password"></el-input>
        </el-form-item>
        <el-form-item label="新的密码">
          <el-input v-model="new_password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="new_password2"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-form label-width="100px" @submit.native.prevent="save">
        <el-form-item label="用户名">
          <el-input v-model="info.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="info.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="info.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      info:{},
      old_password:'',
      new_password:'',
      new_password2:'',
      value:false
    }
  },
  methods:{
      //保存
      async save(){
        // 修改密码
        if(this.value){
          if(this.new_password === this.new_password2){
            this.$message({
              type:'success',
              message:'修改成功'
            })
          }else{
            this.$message({
              type:'error',
              message:'新的密码跟旧的密码一样'
            })
          }
        }
        // 新增管理员

        // if(this.id){ // 更新
        //   await this.$http.put(`rest/admin/${this.id}`,this.info)
        // }else{ // 上传
        //   await this.$http.post('rest/admin',this.info)
        // }
        // this.$router.push('/admin_list')
        // this.$message({
        //   type:'success',
        //   message:'保存成功'
        // })
      }
   },
   watch:{
    $route(){
        if(this.$route.query.cp ==='1'){
          this.value = true
        }else{
          this.value = false
        }
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