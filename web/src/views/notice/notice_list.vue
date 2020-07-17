<template>
    <div class="announcement">
        <div class="inner">
            <h1>公告</h1>
            <ol>
                <li v-for="item in items" :key="item">
                    <el-row>
                        <el-col :span="18"><div class="context">{{item.public_content}} </div></el-col>
                        <el-col :span="6">
                            {{item.publish_admin}}
                                发布于
                            {{item.createdAt | formatDate}}
                        </el-col>
                    </el-row>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    created(){
        this.fetchNotices()
    },
    methods:{
        // 获取公告列表
        fetchNotices(){
            this.$http.get('/rest/notice').then(res=>{
                this.items = res.data.data
            })
        }
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
.announcement{
    max-width: 940px;
    margin: 20px auto;
    background-color:#FFFFFF; 
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
    border-radius:6px;
}
.inner{
    padding:40px;
}
.inner h1{
    font-size:30px;
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
}
.inner ol{
    margin-top: 30px;
}
.inner ol>li{
    margin:10px;
}
.inner ol .context{
    font-weight:bold;
}
</style>