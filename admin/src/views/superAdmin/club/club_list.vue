<template>
    <div>
        <h1>社团列表</h1>
        <el-col :span="10">
            <el-input placeholder="社团名称" @keyup.native.enter="searchAdmin(searchName)" clearable v-model.trim="searchName"></el-input>
        </el-col>
        <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchAdmin(searchName)">搜索</el-button>
        <el-table :data="items" row-key="_id">
          <el-table-column prop="club_name" label="社团名" width="400">
          </el-table-column>
          <el-table-column prop="admin_id" label="社长" width="400">
          </el-table-column>
          <el-table-column prop="createdAt" label="创建日期" width="400">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
                <template slot-scope="scope"> <!-- scope.row行数据 -->
                    <el-button type="primary" icon="el-icon-document" size="mini" @click="getClubMore(scope.row._id)">查看详情</el-button>
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
        this.fetchClub()
    },
    methods:{
        fetchClub(){
            this.$http.get('rest/club').then(res=>{
                this.items = res.data.data
                this.findAdmin()
                
            })
        },
        findAdmin(){
            for(let i = 0;i<this.items.length;i++){
                this.items[i].createdAt = this.items[i].createdAt.slice(0,10)
                this.$http.get(`rest/student/${this.items[i].admin_id}`).then(res=>{
                    this.items[i].admin_id = res.data.name
                })
                if(!this.items[i].sec_admin_id){
                    this.items[i].sec_admin_id = '暂无'
                }else{
                    this.$http.get(`rest/student/${this.items[i].sec_admin_id}`).then(res=>{
                        this.items[i].sec_admin_id = res.data.name
                    })
                }
            }
        },
        getClubMore(id){
            this.$router.push(`/super_admin/get_club/${id}`)
        },
        del(id){
            this.$confirm('确认删除该社团吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/club/${id}`)
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.$router.go(0)
            })
        },
        // 搜索
        searchAdmin(name){ 
            console.log(name)
            if(!name){
                this.fetchClub()
                return
            }
            this.$http(`rest/club/search/details?club_name=${name}`).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
                this.findAdmin()
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