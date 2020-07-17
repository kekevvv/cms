<template>
    <div class="announcement">
        <div class="inner">
            <h1>我的社团</h1>
            <div v-if="userInfo.clubs.length===0">还没加入任何社团</div>
            <ol v-else>
                <li v-for="(club,index) in userInfo.clubs" :key="index">
                    <h2>{{club.club_name}}</h2>
                    <div class="my-post">我的身份：{{club.post}}</div>
                    <el-button type="info" plain @click="getMore(club.club_id)">详细信息</el-button>
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
            items:[]
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    created(){
        this.fetchMyClub()
    },
    methods:{
        fetchMyClub(){
            this.$store.dispatch('checkLogin').then(()=>{
                this.$http.post(`fetchMany`,this.userInfo.clubs).then(res=>{
                    this.items = res.data
                })
            })
            
        },
        getMore(id){
            this.$router.push(`/club_info/${id}`)
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
    font-size:30px;
    line-height: 1.2;
    text-align: center;
    color: #3d4451;
}
li{
    display:inline-block;
    width: 50%;
    padding:20px;
    vertical-align: middle;
}
.my-post{
    margin:10px 0;
    color:#717172;
}
h2{
    font-weight: normal;
    /* color:#565657; */
}
</style>