import axios from 'axios'
import router from './router/index.js'
import { Message } from 'element-ui'
const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
})
// 这样做以后只有前端用url发送请求时才会在请求头添加上Authorization 直接输入地址访问是没有的
http.interceptors.request.use(function (config) {
        if (localStorage.token) {
            // 在请求头添加token Bearer表示类型 是一种规范用法
            if(localStorage.token){
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