<template>
    <div>
        <h1>申请列表</h1>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="sno" label="学号" width="200">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="200">
          </el-table-column>
          <el-table-column prop="reason" label="申请原因" width="600">
          </el-table-column>
          <el-table-column prop="createdAt" label="申请日期" width="200">
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
import { mapState } from 'vuex'
export default {
    data(){
        return {
            items:[],
            club_id:this.$route.params.id
        }
    },
    created(){
        this.fetchApp()
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
        fetchApp(){
            this.$http.get('rest/stuapplication').then(res=>{
                for(let i = 0;i<res.data.data.length;i++){
                    res.data.data[i].createdAt = res.data.data[i].createdAt.slice(0,10)
                    if(res.data.data[i].app_type===0){
                        res.data.data[i].app_type = '加入'
                    }else{
                        res.data.data[i].app_type = '退出'
                    }
                    this.items.push(res.data.data[i])
                }
            })
        },
        agree(id){
            this.$confirm('同意该同学加入社团？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/stuapplication/${id}`).then((res)=>{
                    let stuInfo = {}
                    stuInfo.stu_id = res.data.stu_id
                    stuInfo.name = res.data.name
                    stuInfo.sno = res.data.sno
                    stuInfo.post = '社员'
                    console.log(stuInfo.stu_id)
                    console.log(stuInfo)
                    this.$http.post(`/joinclub/${this.club_id}`,stuInfo).then(()=>{
                        this.$message({
                            type:'success',
                            message:'加入成功'
                        })
                        this.$http.put(`changeIsApply/${stuInfo.stu_id}`).then(()=>{
                            this.$router.go(0)
                        })
                            
                    })
                })
            })
            
        },
        reject(id){
            this.$confirm('拒绝该同学加入社团？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$http.delete(`rest/stuapplication/${id}`).then(()=>{
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