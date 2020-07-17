//验证中间件
module.exports = () => async (req, res, next) => {
    const jwt = require('jsonwebtoken')
  
    //引入Admin模型
    const Admin = require('../models/Admin')
    const Student = require('../models/Student')

    const token = String(req.headers.authorization || '').split(' ').pop()
    
    if(!token){
        return res.status(401).send({
            message:'请先登录'//'请提供jwt token'
        })
    }
    const { id } = jwt.verify(token,req.app.get('secret'))
    if(!id){
        return res.status(401).send({
            message:'请先登录'//'无效的jwt token'
        })
    }
    req.user = await Admin.findById(id) //将user挂载到req上就能让除了中间件以外的组件用到 表示客户端请求的时候 这个用户是谁
    req.stu = await Student.findById(id)
    if(!req.user && !req.stu){
        return res.status(401).send({
            message:'请先登录'
        })
    }
    // console.log(id)
    await next()
  }