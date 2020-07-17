<template>
    <div class="login-container">
        <el-card header="学生登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item>
                    <el-input placeholder="学号"  v-model="user.sno"></el-input>
                    </el-form-item>
                <el-form-item>
                    <el-input placeholder="密码" type="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" native-type="submit">登录</el-button>
                    <el-button @click="register">注册</el-button>
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

            }
        }
    },
    methods:{
        login(){
            this.$http.post('login',this.user).then(res=>{
                localStorage.stu_token = res.data.token
                localStorage.stu_id = res.data.id
                console.log(localStorage.stu_id)
                this.$router.push('/')
                this.$message({
                    type:'success',
                    message:'登录成功'
                })
            })
        },
        register(){
            this.$router.push('/register')
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
    width:20rem;
    margin:0 auto;
}
</style>