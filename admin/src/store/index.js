import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user_id:window.localStorage.user_id || '',
    isLogin: false,
    userInfo:{
    },
    post:window.localStorage.post || '',
  },
  mutations: {
    logout(state){
      window.localStorage.removeItem('user_id')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('post')
      state.user_id = ''
      state.isLogin = false
      state.userInfo = {}
    },
    updateLogin(state,data){
      if(data){
        state.isLogin = true
        state.userInfo = data
      }
    },
    login(state){
      state.user_id = window.localStorage.user_id
      state.post = window.localStorage.post
    }
  },
  actions: {
    login(context,data){
      context.commit('updateLogin',data)
    },
    checkLogin(context){
      if(context.state.user_id){
        console.log('check'+context.state.user_id)
        if(context.state.post==='社联管理员'){
          return Vue.prototype.$http.get(`rest/admin/${context.state.user_id}`).then(res=>{
            console.log(res.data)
            context.commit('updateLogin',res.data)
          })
        }else{
          return Vue.prototype.$http.get(`rest/student/${context.state.user_id}`).then(res=>{
            context.commit('updateLogin',res.data)
          })

        }
      }
    },
  },
  modules: {
  }
})
