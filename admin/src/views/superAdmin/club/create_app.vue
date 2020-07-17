<template>
    <div>
        <h1>申请列表</h1>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="club_name" label="社团名" width="150">
          </el-table-column>
          <el-table-column prop="introduce" label="简介" width="500">
          </el-table-column>
          <el-table-column prop="reason" label="申请原因" width="500">
          </el-table-column>
          <el-table-column prop="applicant" label="申请人" width="150">
          </el-table-column>
          <el-table-column prop="createdAt" label="申请日期" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
                <template slot-scope="scope"> <!-- scope.row行数据 -->
                    <el-button type="success" size="mini" @click="agree(scope.row._id)">同意</el-button>
                    <el-button type="danger" size="mini" @click="reject(scope.row._id)">拒绝</el-button>
                </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    created(){
        this.fetchApp()
    },
    methods:{
        fetchApp(){
            this.$http.get('rest/clubapplication').then(res=>{
                for(let i = 0;i<res.data.data.length;i++){
                    if(res.data.data[i].app_type===0){
                        res.data.data[i].createdAt = res.data.data[i].createdAt.slice(0,10)
                        this.items.push(res.data.data[i])
                    }
                }
            })
        },
        agree(id){
            this.$confirm('同意创建该社团？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/clubapplication/${id}`).then((res)=>{
                    console.log(res.data)
                    let clubInfo = {}
                    clubInfo.club_name = res.data.club_name
                    clubInfo.introduce = res.data.introduce
                    clubInfo.admin_id = res.data.applicant_id
                    console.log(clubInfo)
                    this.$http.post(`createClub`,clubInfo).then(()=>{
                        this.$router.go(0)
                        this.$message({
                            type:'success',
                            message:'创建成功'
                        })
                    })
                })
            })
        },
        reject(id){
            this.$confirm('拒绝创建该社团？', '提示', {
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
<style scoped>
  h1{
    font-size:20px;
    margin-bottom:10px;
  }
</style>