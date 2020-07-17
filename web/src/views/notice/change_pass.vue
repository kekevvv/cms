<template>
  <div class="change-pass">
    <div class="change-pass-title">
        <h1>修改密码</h1>
    </div>
    <div class="cp-form">
        <el-form :model="info" :rules="rules" ref="pass" label-width="80px" @submit.native.prevent="save('pass')">
            <el-form-item label="旧的密码" prop="old_password">
                <el-input type="password" v-model="info.old_password"></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="new_password">
                <el-input type="password" v-model="info.new_password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="check_pass">
                <el-input type="password" v-model="info.check_pass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">提交</el-button>
                <el-button native-type="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        var validatePass1 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入旧的密码'))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新的密码'))
            } else {
                callback()
            }
        }
        var validatePass3 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请确认密码'));
            } else if (this.info.new_password !== this.info.check_pass) {
                callback(new Error('输入的密码不一致'));
            } else {
                callback();
            }
        }
        return {
            info:{},
            id:this.$route.params.id,
            rules:{
                old_password:[{ required: true,validator: validatePass1, trigger: 'blur'}],
                new_password: [{ required: true,validator: validatePass2, trigger: 'blur' }],
                check_pass: [{ required: true,validator: validatePass3, trigger: 'blur' }],
            }
        }
    },
    methods:{
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.info.id = this.id
                    this.$http.put("changePass",this.info).then(()=>{
                        this.$message({
                            type:'success',
                            message:'修改成功，请重新登录'
                        })
                        this.$store.commit('logout')
                        this.$router.push('/login')
                    })
                } else {
                    return false;
                }
            })
        }
    }
}
</script>
<style scoped>
.change-pass{
    max-width: 1000px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
    padding:40px;
}
.change-pass-title{
    padding:20px;
}
.change-pass-title h1{
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
    font-size:36px;
}
</style>