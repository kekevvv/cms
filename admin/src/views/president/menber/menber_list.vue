<template>
    <div>
        <h1>成员列表</h1>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="sno" label="姓名" width="300">
          </el-table-column>
          <el-table-column prop="name" label="学号" width="300">
          </el-table-column>
          <el-table-column prop="post" label="职务" width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope"> <!-- scope.row行数据 -->
                    <el-button  type="primary" size="mini" @click="getMore(scope.row.stu_id)">查看详情</el-button>
                    <el-button v-if="scope.row.post!=='社长'" type="danger" size="mini" @click="del(scope.row.stu_id)">踢出</el-button>
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
            searchName:'',
            id:this.$route.params.id
            
        }
    },
    created(){
        this.fetchMenbers()
    },
    methods:{
        fetchMenbers(){
            this.$http.get(`rest/club/${this.id}`).then(res=>{
                console.log(res.data)
                this.items = res.data.menbers
            })
        },
        getMore(id){
            this.$router.push(`/president/menber_info/${id}`)
        },
        // 删除
        del(stu_id) {
            this.$confirm('确认删除该用户吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(stu_id)
                this.$http.delete(`deleteMenber/${this.id}/${stu_id}`).then(()=>{
                    this.$router.go(0)
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                })
            })
        },
    },
    
}
</script>
<style scoped>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
</style>