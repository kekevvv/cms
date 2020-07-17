<template>
    <div>
        <h1>公告列表</h1>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="public_content" label="公告内容" width="1000">
          </el-table-column>
          <el-table-column prop="publish_admin" label="发布人" width="120">
          </el-table-column>
          <el-table-column prop="createdAt" label="发布日期">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
                <template slot-scope="scope"> <!-- scope.row行数据 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row._id)">编辑</el-button>
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
        this.fetchNotices()
    },
    methods:{
        // 获取公告列表
        fetchNotices(){
            let url = `rest/notice?currentPage=${this.currentPage}&pageSize=${this.pageSize}`
            this.$http.get(url).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
                for(let i = 0;i<this.items.length;i++){
                    this.items[i].createdAt = this.items[i].createdAt.slice(0,10)
                }
            })
        },
        // 编辑
        edit(id){
            this.$router.push(`/super_admin/notice_edit/${id}`)
        },
        // 删除
        del(id) {
            this.$confirm('确认删除该公告吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/notice/${id}`)
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.fetchNotices()
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