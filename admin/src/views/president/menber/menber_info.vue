<template>
    <div class="my-info">
        <div class="my-info-title">
            <h1>成员信息</h1>
        </div>
        <div class="info clearfix">
            <el-row>
                <el-col :span="8">
                    <div class="info-title">学号</div></el-col>
                <el-col :span="8">
                    <div class="info-title">姓名</div>
                </el-col>
                <el-col :span="8">
                    <div class="info-title">性别</div>
                </el-col>
            </el-row>
            <el-row clas="info-context">
                <el-col :span="8">{{stuInfo.sno}}</el-col>
                <el-col :span="8">{{stuInfo.name}}</el-col>
                <el-col :span="8">{{stuInfo.gender}}</el-col>
            </el-row>
            <el-row clas="info-title">
                <el-col :span="8">
                    <div class="info-title">联系方式</div>
                </el-col>
                <el-col :span="8">
                    <div class="info-title">班级</div>
                </el-col>
                <el-col :span="8">
                    <div class="info-title">创建日期</div>
                </el-col>
            </el-row>
            <el-row clas="info-context">
                <el-col :span="8">{{stuInfo.phoneNumber}}</el-col>
                <el-col :span="8">{{stuInfo.class?stuInfo.class:'未填写'}}</el-col>
                <el-col :span="8">{{stuInfo.createdAt}}</el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
    return {
        stuInfo: {},
        stu_id:this.$route.params.id
    }
    },
    methods:{
        getInfo(){
            this.$http.get(`rest/student/${this.stu_id}`).then(res=>{
                res.data.createdAt = res.data.createdAt.slice(0,10)
                this.stuInfo = res.data
            })
        },
        change(){
            this.$router.push(`/change_pass/${this.stu_id}`)
        },
        edit(){
            this.$router.push(`/edit_info/${this.stu_id}`)
        }
    },
    created(){
        this.getInfo()
    }
}
</script>
<style scoped>
.my-info{
    max-width: 1000px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
    padding:40px;
}
.my-info-title{
    padding:20px;
}
.my-info-title h1{
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
    font-size:36px;
}
.info{
    width:80%;
    margin:0 auto;
}
.info-title{
    color:#333333;
    font-size:22px;
}
.change-button{
    margin-top:10px;
    float:right;
}
</style>