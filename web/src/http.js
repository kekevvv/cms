import axios from 'axios'
import router from './router/index.js'
import { Message } from 'element-ui'
const http = axios.create({
    baseURL:'http://localhost:3000/web/api'
})
http.interceptors.request.use(function (config) {
    if (localStorage.stu_token) {
        if(localStorage.stu_token){
            config.headers.Authorization = `Bearer ${localStorage.token}`
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

http.interceptors.response.use((res) => {
    return res
},(err)=>{
    if(err.response.data.message){
        Message({
            type:'error',
            message:err.response.data.message
        })
    }
    if(err.response.status === 401){
        console.log('401')
        router.push('/login')
    }
    return Promise.reject(err)
})
export default http