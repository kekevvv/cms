<template>
    <div class="announcement">
        <div class="inner">
            <h1>我的申请</h1>
            <div v-if="join.length===0&&create.length===0">暂无数据</div>
            <ol v-else>
                <li class="title">
                    <el-row>
                        <el-col :span="4"><div class="context">社团名</div></el-col>
                        <el-col :span="14">理由</el-col>
                        <el-col :span="3">加入/创建</el-col>
                        <el-col :span="3">操作</el-col>
                    </el-row>
                </li>
                <li v-for="item in join" :key="item._id">
                    <el-row>
                        <el-col :span="4"><div class="context">{{item.club_name}}</div></el-col>
                        <el-col :span="14">{{item.reason}}</el-col>
                        <el-col :span="3">加入</el-col>
                        <el-col :span="3">
                            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delJoin(item._id)"></el-button>
                        </el-col>
                    </el-row>
                </li>
                <li v-for="item in create" :key="item._id">
                    <el-row>
                        <el-col :span="4"><div class="context">{{item.club_name}}</div></el-col>
                        <el-col :span="14">{{item.reason}}</el-col>
                        <el-col :span="3">创建</el-col>
                        <el-col :span="3">
                            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delCreate(item._id)"></el-button>
                        </el-col>
                    </el-row>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            join:[],
            create:[],
            stu_id:localStorage.stu_id,
        }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    created(){
        this.$store.dispatch('checkLogin').then(()=>{
            this.fetchApp()
        })
    },
    methods:{
        fetchApp(){
            this.$http.get(`myApplication/${this.stu_id}`).then(res=>{
                this.create = []
                this.join = []
                for(let i = 0;i<res.data.create.length;i++){
                    if(res.data.create[i].app_type===0){
                        this.create.push(res.data.create[i])
                    }
                }
                for(let i = 0;i<res.data.join.length;i++){
                    if(res.data.join[i].app_type===0){
                        this.join.push(res.data.join[i])
                    }
                }
            })
        },
        delCreate(id){
            this.$confirm('确认删除该申请吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/clubapplication/${id}`).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.$router.go(0)
                })
            })
        },
        delJoin(id){
            this.$confirm('确认删除该申请吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`rest/stuapplication/${id}`).then(()=>{
                    this.$store.commit('changeIsApply')
                    this.$http.put(`rest/student/${this.userInfo._id}`,this.userInfo).then(()=>{
                        
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        this.$router.go(0)
                    })
                })
            })
        }
    },
}
</script>
<style scoped>
.announcement{
    max-width: 1000px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
}
.inner{
    padding:40px;
}
.inner h1{
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
    font-size:30px;
}
.title{
    color:#323231;
}
</style>