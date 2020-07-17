<template>
    <div>
        <h1>成员列表</h1>
        <el-table :data="items" row-key="stu_id" width="900">
          <el-table-column prop="sno" label="学号" width="300">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="600">
          </el-table-column>
          <el-table-column prop="post" label="职务">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
                <template slot-scope="scope"> 
                    <el-button type="info" size="mini" @click="getMore(scope.row._id)">详细信息</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.row._id)">踢出社团</el-button>
                </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[],
            id:this.$route.params.id
        }
    },
    created(){
        this.fetchMenbers()
    },
    methods:{
        fetchMenbers(){
            this.$http.get(`rest/club/${this.id}`).then(res=>{
                this.items = res.data.menbers
            })
        },
        getMore(id){
            this.$router.push(`/change_post/${id}`)
        },
        reject(id){
            this.$confirm('拒绝删除该社团？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$http.delete(`rest/clubapplication/${id}`).then(()=>{
                    this.$router.go(0)
                    this.$message({
                        type:'success',
                        message:'拒绝成功'
                    })
                    
                })
            })
        }
    }
    
}
</script>
<style scope>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
</style>