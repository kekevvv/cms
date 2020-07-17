<template>
    <div class="login-container">
        <el-card header="请选择管理的社团" class="login-card">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in adminClub"
                :key="item.club_id"
                :label="item.club_name"
                :value="item.club_id">
                </el-option>
                {{value}}
            </el-select>
            <div style="float:right;">
                <el-button type="primary" @click="admin">确认</el-button>
                <el-button type="primary" @click="logout">注销</el-button>

            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            adminClub:[],
            id:localStorage.user_id,
            value:''
        }
    },
    methods:{
        fetchClub(){
            this.$http.get(`rest/student/${this.id}`).then(res=>{
                let club = res.data.clubs
                for(let i = 0;i<club.length;i++){
                    if(club[i].post==='社长'){
                        this.adminClub.push(club[i])
                    }

                }
            })
        },
        admin(){
            if(this.value){
                this.$router.push(`/president/${this.value}`)
            }else{
                this.$message({
                    type:'error',
                    message:'请先选择社团'
                })
            }
        },
        logout(){
            this.$store.commit('logout')
            this.$router.push('/login')
        }
    },
    created(){
        this.fetchClub()
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
    width:30rem;
    margin:0 auto;
}
</style>