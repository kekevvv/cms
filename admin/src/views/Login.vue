<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名" v-if="user.post === '社联管理员'">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="学号" v-else>
                    <el-input v-model.number="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item label="身份" >
                    <el-radio v-model="user.post" label="社联管理员">社联管理员</el-radio>
                    <el-radio v-model="user.post" label="学生">学生</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user:{
                post:"社联管理员"
            }
        }
    },
    methods:{
        login(){
            this.$http.post('login',this.user).then((res)=>{
                //sessionStorage.token = res.daata.token 关闭浏览器就会清除数据
                // 只要保证网址一样就一直存在
                localStorage.token = res.data.token
                localStorage.user_id = res.data.id
                localStorage.post = this.user.post
                this.$store.commit('login')
                if(localStorage.post === '社联管理员'){
                    this.$router.push('/super_admin')
                }else{
                    this.$router.push('/select')
                }
                this.$message({
                    type:'success',
                    message:'登录成功'
                })
                
            })
        },
    },
    created(){
        if(localStorage.token){
            if(localStorage.post === '社联管理员'){
                this.$router.push('/super_admin')
            }
            if(localStorage.post === '学生'){
                this.$router.push('/select')
            }
            this.$message({
                type:'error',
                message:'您已经登录'
            })
        }
    }
}
</script>
<style scoped>
.login-container{
    height: 100vh;
    background-color: #E1E1E1;
    padding:10rem 0;
}
.login-card{
    width:25rem;
    margin:0 auto;
}
</style>