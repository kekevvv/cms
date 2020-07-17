<template>
  <div class="notice">
    <h1>修改简介</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="社团简介">
        <el-input resize="none" type="textarea" :rows="3" placeholder="请输入内容" v-model="clubInfo.introduce"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      clubInfo:{},
      id:this.$route.params.id
    }
  },
  created(){
      this.init()
  },
  methods:{
    init(){
        this.$http.get(`rest/club/${this.id}`).then(res=>{
            this.clubInfo = res.data
        })
    },
    save(){
      this.$http.put(`rest/club/${this.id}`,this.clubInfo).then(()=>{
        this.$message({
          type:'success',
          message:'修改成功'
        })
        this.$router.push(`/club_admin/${this.id}/club_info`)
        //跳转回社团信息页面
      })
    }
  },

}
</script>
<style scope>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
</style>