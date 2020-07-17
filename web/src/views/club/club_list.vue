<template>
    <div class="announcement">
        <div class="inner">
            <h1>社团列表</h1>
            <ol>
                <li v-for="club in items" :key="club._id">
                    <h2>{{club.club_name}}</h2>
                    <div class="introduce">{{club.introduce}}</div>
                    <el-button type="info" plain v-if="club.myClub===true">已加入</el-button>
                    <el-button type="primary" v-else @click="join(club._id,club.club_name)">申请加入</el-button>
                </li>
            </ol>
        </div>
        <div class="pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :pageSize="pageSize"
                :current-page.sync="currentPage"
                @current-change="fetchClub">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            items:[],
            stu_id:localStorage.stu_id,
            total:0,
            currentPage:1,
            pageSize:4,
        }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    created(){
        this.$store.dispatch('checkLogin').then(()=>{
            this.fetchClub()
        })
    },
    methods:{
        fetchClub(){
            let url = `rest/club?currentPage=${this.currentPage}&pageSize=${this.pageSize}`
            this.$http.get(url).then(res=>{
                this.items = res.data.data
                this.total = res.data.totalCount
                if(this.stu_id){
                    this.isMyClub()
                }
            })

        },
        isMyClub(){
            let club
            for(let i = 0;i<this.items.length;i++){
                club = this.items[i]
                for(let j = 0;j<club.menbers.length;j++){
                    if(club.menbers[j].stu_id === this.stu_id){
                        this.items[i].myClub = true
                    }
                }
            }
            
        },
        join(id,name){
            if(!this.stu_id){
                this.$router.push('/login')
                this.$message({
                    type:'error',
                    message:'请先登录'
                })
            }else{
            this.$prompt('请输入申请理由', '申请加入社团', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType:'textarea'
            }).then((value)=>{
                let stuApp = {}
                stuApp.stu_id = this.userInfo._id
                stuApp.sno = this.userInfo.sno
                stuApp.name = this.userInfo.name
                stuApp.reason = value.value
                stuApp.club_id = id 
                stuApp.app_type = 0
                stuApp.club_name = name
                if(!this.userInfo.isApply){
                    this.$http.post('/rest/stuapplication',stuApp).then(()=>{
                        this.$message({
                            type:'success',
                            message:'发送申请成功'
                        })
                        this.$http.put(`changeIsApply/${this.userInfo._id}`).then(()=>{
                            this.$router.go(0)
                        })
                    })
                }else{
                    this.$message({
                        type:'error',
                        message:'只能发送一次加入社团的申请'
                    })
                }
                
                })
            }
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
    font-size:36px;
}
li{
    display:inline-block;
    width: 50%;
    padding:20px;
    vertical-align: middle;
}
.introduce{
    height:70px;
    color:#717172;
    font-size:14px;
}
h2{
    font-weight: normal;
    /* color:#565657; */
}
.pagination{
    width: 150px;
    margin:0 auto;
}
</style>