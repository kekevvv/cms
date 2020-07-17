<template>
    <div>
        <h1>用户列表</h1>
        <el-col :span="10">
            <el-input placeholder="学号" @keyup.native.enter="searchAdmin(searchName)" clearable v-model.trim="searchName"></el-input>
        </el-col>
        <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchAdmin(searchName)">搜索</el-button>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="sno" label="学号" width="200">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="200">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="200">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="联系方式" width="200">
          </el-table-column>
          <el-table-column prop="class" label="班级" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
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
            searchName:'',
            total:0,
            currentPage:1,
            pageSize:10
        }
    },
    created(){
        this.fetchUser()
    },
    methods:{
        // 获取公告列表
        fetchUser(){
            let url = `rest/student?currentPage=${this.currentPage}&pageSize=${this.pageSize}`
            this.$http.get(url).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
                for(let i = 0;i<this.items.length;i++){
                    this.items[i].createdAt = this.items[i].createdAt.slice(0,10)
                }
            })
        },
        // 删除
        del(id) {
            this.$confirm('确认删除该公告吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/student/${id}`).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.$router.go(0)
                })
            })
        },
        // 搜索
        searchAdmin(searchName){ 
            if(!searchName){
                this.fetchUser()
                return
            }
            this.$http(`rest/student/search/details?sno=${searchName}`).then(res=>{
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