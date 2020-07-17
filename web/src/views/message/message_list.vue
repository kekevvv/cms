<template>
    <div class="message">
        <div class="message-title">
            <h1>论坛</h1>
        </div>
        <div class="message-context">
            <ul class="topic-list">
                <li v-for="item in items" :key="item._id">
                    <router-link :to="'/message_info/'+item._id">
                        <span class="title">
                                {{item.title}}
                        </span>
                        <span class="time">
                            {{item.applicant_name}}
                            发布于
                            {{item.createdAt | formatDate}}
                        </span>
                    </router-link>
                </li>
            </ul>
            <div class="submit-topic">
                <h2>发布贴子</h2>
                <el-form :model="message" ref="message" @submit.native.prevent="save('clubInfo')">
                    <el-form-item label="标题">
                        <el-input placeholder="请输入名称"  v-model="message.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input placeholder="请输入内容" resize="none" type="textarea" :rows="10" v-model="message.content"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button type="primary" native-type="submit">发表</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            items: [],
            message:{},
            stu_id:window.localStorage.stu_id
        }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
        fetchTopics(){
            this.$http.get('rest/message').then(res=>{
                this.items = res.data.data
                console.log(this.items)
            })
        },
        async save(){
            if(this.stu_id){
                this.message.applicant_id = this.userInfo._id
                this.message.applicant_name = this.userInfo.name
                await this.$http.post('rest/message',this.message)
                console.log(1)
                this.$message({
                    type:'success',
                    message:'发布成功'
                })
                this.$router.go(0)
            }else{
                this.$router.push('/login')
                this.$message({
                    type:'error',
                    message:'请先登录'
                })
                return
            }
        }
    },
    created(){
        this.$store.dispatch('checkLogin').then(()=>{
            this.fetchTopics()
        })
    },
    filters:{
        formatDate(str){
            if (!str) return ''
            var date = new Date(str)
            var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
            if (time < 0) {
                return ''
            } else if ((time / 1000 < 30)) {
                return '刚刚'
            } else if (time / 1000 < 60) {
                return parseInt((time / 1000)) + '秒前'
            } else if ((time / 60000) < 60) {
                return parseInt((time / 60000)) + '分钟前'
            } else if ((time / 3600000) < 24) {
                return parseInt(time / 3600000) + '小时前'
            } else if ((time / 86400000) < 31) {
                return parseInt(time / 86400000) + '天前'
            } else if ((time / 2592000000) < 12) {
                return parseInt(time / 2592000000) + '月前'
            } else {
                return parseInt(time / 31536000000) + '年前'
            }
        }
    }
}
</script>
<style scoped>
.message{
    max-width: 70%;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
    padding:40px;
}
.message-title{
    /* padding:40px; */
}
.message-title h1{
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
    font-size:36px;
}
li{
    border-bottom: 1px solid #e5e5e5; 
    padding: 10px;
    overflow: hidden;
    cursor: pointer;
}
li:hover{
    background:#eee;
}
li .time{
    float:right;
    font-size:12px;
    padding:6px;
}
li .title{
    margin-left:10px; 
    width:70%; 
    display:inline-block;
    overflow:hidden;
    text-overflow:ellipsis; 
    white-space:nowrap; 
    vertical-align:middle;
}
.submit-topic{
    margin-top:50px;
}
</style>