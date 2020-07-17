<template>
    <div class="topic-info">
        <div class="topic">
            <header>
                <h1>标题：{{topic.title}}</h1>
                <ul>
                    <li>作者 <span>{{topic.applicant_name}}</span></li>
                    <li>发布于 {{topic.createdAt | formatDate}}</li>
                </ul>
            </header>
            <hr>
            <div class="topic-content">
                {{topic.content}}
            </div>
            <hr>
            <div class="reply">
                <h2>回复楼</h2>
                <ul>
                    <li class="reply-info" v-for="(item,index) in topic.reply" :key="item._id">
                        {{index + 1}}楼
                        {{item.reply_content}}
                        <span class="reply_applicant">
                            <span v-if="item.isAuthor" class="author">楼主</span>
                            {{item.reply_name}}
                            回复于
                            {{item.reply_time | formatDate}}
                        </span>
                    </li>
                </ul>
            </div>
            <hr>
            <div class="reply-topic">
                <h2>回复贴子</h2>
                <el-form :model="reply" ref="message" @submit.native.prevent="replyTopic">
                    <el-form-item>
                        <el-input placeholder="请输入内容" resize="none" type="textarea" :rows="10" v-model="reply.reply_content"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button type="primary" native-type="submit">回复</el-button>
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
            topic:{},
            reply:{},
            id:this.$route.params.id
        }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
        fetchTopic(){
            this.$http.get(`rest/message/${this.id}`).then(res=>{
                this.topic = res.data
            })
        },
        replyTopic(){
            if(!this.userInfo._id){
                this.$router.push('/login')
                this.$message({
                    type:'error',
                    message:'请先登录'
                })
                return
            }
            this.reply.reply_id = this.userInfo._id
            this.reply.reply_name = this.userInfo.name
            if(this.topic.applicant_id === this.userInfo._id){
                this.reply.isAuthor = true
            }
            this.$http.post(`/addReply/${this.id}`,this.reply).then(()=>{
                this.$message({
                  type:'success',
                  message:'回复成功'
                })
                this.$router.go(0)
            })
        }
    },
    created(){
        this.$store.dispatch('checkLogin').then(()=>{
            this.fetchTopic()
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
.topic-info{
    max-width: 1000px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
    padding:40px;
}
.topic{
    width:100%;
}
.topic header{
    margin-bottom:10px;
}
.topic header ul li {
    font-size:12px;
}
.topic-content{
    margin:10px;

}
h2{
    font-size:16px;
    margin-bottom: 16px;
}
.reply_applicant{
    float:right;
    font-size:12px;
}
.reply,.reply-info{
    margin:20px 0;
}
.reply-topic {
    margin-top:10px;
}
.author{
    background:#211C1A;
    color:#fff;
    font-size:12px;
    padding:3px;
    border-radius: 3px;
}
</style>