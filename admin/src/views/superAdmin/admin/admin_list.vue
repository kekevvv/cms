<template>
    <div>
        <h1>管理员列表</h1>
        <el-col :span="10">
            <el-input placeholder="姓名" @keyup.native.enter="searchAdmin(searchName)" clearable v-model.trim="searchName"></el-input>
        </el-col>
        <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchAdmin(searchName)">搜索</el-button>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="username" label="用户名" width="300">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope"> <!-- scope.row行数据 -->
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
                @current-change="fetchAdmin">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[],
            searchName:'',
            total:0,
            currentPage:1,
            pageSize:5,
            
        }
    },
    created(){
        this.fetchAdmin()
    },
    methods:{
        fetchAdmin(){
            let url = `rest/admin?currentPage=${this.currentPage}&pageSize=${this.pageSize}`
            this.$http.get(url).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
            })
        },
        // 删除
        del(id) {
            this.$confirm('确认删除该用户吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/admin/${id}`)
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.fetchAdmin()
            })
        },
        // 搜索
        searchAdmin(name){ 
            if(!name){
                this.fetchAdmin()
                return
            }
            this.$http(`rest/admin/search/details?name=${name}`).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
            })
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