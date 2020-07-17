import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stu_id:window.localStorage.stu_id || '',
    isLogin: false,
    userInfo:{
    },
  },
  mutations: {
    logout(state){
      window.localStorage.removeItem('stu_id')
      state.stu_id = ''
      state.isLogin = false
      state.userInfo = {}
    },
    updateLogin(state,data){
      if(data){
        state.isLogin = true
        state.userInfo = data
      }
    },
    changeIsApply(state){
      state.userInfo.isApply = !state.userInfo.isApply
    }
  },
  actions: {
    checkLogin(context){
      if(context.state.stu_id){
        return http.get(`rest/student/${context.state.stu_id}`).then(res=>{
          context.commit('updateLogin',res.data)
          // console.log(context.state.userInfo)
        })
      }
    },
    checkApply(context){
      return http.get(`rest/stuapplication/${context.state.stu_id}`).then(res=>{
        context.commit('updateLogin',res.data)
      })
    },
    // isAdmin(context,data){
      
    // }
  },
  modules: {
  }
})
