<template>
    <div>
        <h1>主题列表</h1>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="title" label="标题" width="1000">
          </el-table-column>
          <el-table-column prop="applicant_name" label="发布人" width="120">
          </el-table-column>
          <el-table-column prop="createdAt" label="发布日期">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
                <template slot-scope="scope"> <!-- scope.row行数据 -->
                    <el-button type="primary" icon="el-icon-document" size="mini" @click="more(scope.row._id)">查看详情</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row._id)">删除</el-button>
                </template>
          </el-table-column>
        </el-table>
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :pageSize="pageSize"
                :current-page.sync="currentPage"
                @current-change="fetchNotices">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[],
            total:0,
            currentPage:1,
            pageSize:10
        }
    },
    created(){
        this.fetchTopic()
    },
    methods:{
        // 获取公告列表
        fetchTopic(){
            let url = `rest/message?currentPage=${this.currentPage}&pageSize=${this.pageSize}`
            this.$http.get(url).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
                for(let i = 0;i<this.items.length;i++){
                    this.items[i].createdAt = this.items[i].createdAt.slice(0,10)
                }
            })
        },
        // 查看详情
        more(id){
            this.$router.push(`/super_admin/get_topic/${id}`)
        },
        // 删除
        del(id) {
            this.$confirm('确认删除该公告吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/message/${id}`).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.$router.go(0)
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