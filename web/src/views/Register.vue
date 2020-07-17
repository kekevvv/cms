<template>
    <div class="login-container">
        <el-card class="login-card" header="新生注册">
            <el-form :model="user" :rules="rules" ref="user" label-width="80px" @submit.native.prevent="save('user')">
                <el-form-item label="学号" prop="sno">
                    <el-input v-model.number="user.sno"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio v-model="user.gender" label="男">男</el-radio>
                    <el-radio v-model="user.gender" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="联系电话" prop="phoneNumber">
                    <el-input v-model.number="user.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="user.class"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">注册</el-button>
                    <el-button native-type="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        var checkSno = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('学号不能为空'));
            }
            if (value < 9999999 || value > 100000000) {
                callback(new Error('学号为8位数字'))
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'))
                    
                }else {
                    callback()
                }
                
            }, 1000);
        }
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入电话号码'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'))
                    
                }else {
                    callback()
                }
                
            }, 1000);
        }
        var validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (!this.checkPass) {
                callback(new Error('请确认密码'));
            } else if (this.checkPass !== this.user.password) {
                callback(new Error('输入的密码不一致'));
            } else {
                callback();
            }
        }
        return {
            checkPass:'',
            user:{
            },
            rules:{
                sno:[
                    { required: true,validator: checkSno, trigger: 'blur' }
                ],
                gender:[
                    {required: true, message: '请选择性别', trigger: 'change' }
                ],
                phoneNumber:[
                    { required: true,validator: checkPhone, trigger: 'blur' }
                ],
                name:[
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                password:[{ required: true,validator: validatePass, trigger: 'blur'}],
                checkPass: [{ required: true,validator: validatePass2, trigger: 'blur' }],
            }
        }
    },
    methods:{
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('register',this.user).then(()=>{
                        this.$message({
                            type:'success',
                            message:'注册成功'
                        })
                    })
                    this.$router.push('/login')
                } else {
                    return false;
                }
            })
        }
    }
}
</script>
<style scoped>
.login-container{
    height: 100vh;
    background-color: #E1E1E1;
    padding:5rem 0;
}
.login-card{
    width:33rem;
    margin:0 auto;
}
</style>