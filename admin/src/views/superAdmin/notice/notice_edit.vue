<template>
  <div class="notice">
    <h1>{{id ? '编辑' : '新建'}}公告</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="公告内容">
        <el-input resize="none" type="textarea" :rows="2" placeholder="请输入内容" v-model="info.public_content"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        {{userInfo.name}}
      </el-form-item>
      <el-form-item label="发布时间">
        {{getDate}}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
    this.$store.dispatch('checkLogin').then(()=>{
            
      this.init()
    })
  },
  computed:{
      // 获取当前时间
      ...mapState(['userInfo']),
      getDate(){
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let date = year + '年' + month + '月' + day + '日'
        return date
     }
  },
  methods:{
      init(){
        if(this.id){
          this.$http.get(`rest/notice/${this.id}`).then((res)=>{
            this.info = res.data
          })
        }else{
          this.info = {}
        }
      },
      // 保存
      async save(){
        this.info.publish_admin = this.userInfo.name
        if(this.id){ // 更新
          await this.$http.put(`rest/notice/${this.id}`,this.info)
        }else{ // 上传
          await this.$http.post('rest/notice',this.info)
        }
        this.$router.push('/super_admin/notice_list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      
   },

}
</script>
<style scope>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
</style>