module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    }) 
    const resourceMiddleware = require('../../middleware/resource.js')
    const Student = require('../../models/Student.js')
    const Club = require('../../models/Club.js')
    const Message = require('../../models/Message.js')
    const Clubnotice = require('../../models/Clubnotice.js')
    const Application = require('../../models/Clubapplication.js')
    const StuApplication = require('../../models/Stuapplication.js')
    app.use('/web/api/rest/:resource',resourceMiddleware(),router) 

    // 资源列表
    router.get('/',async(req,res)=>{
        // const data = await req.Model.find().limit(10)
        // res.send(data)
        let pageSize = parseInt(req.query.pageSize)
        let currentPage = parseInt(req.query.currentPage) || 1
        //总页数
        let totalCount = await req.Model.countDocuments()
        let pages = Math.ceil(totalCount/pageSize) || 1
        const data = await req.Model.find().skip((currentPage - 1) * pageSize).limit(pageSize)
        res.send({data,totalCount})
    })
    // 资源详情
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
    })
    // 更新资源
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })


    app.get('/web/api/fetchNotice/:club_id',async(req,res)=>{
        let id = req.params.club_id
        let data = await Clubnotice.find({ club_id: id } )
        res.send(data)
    })
    //回复主题
    app.post('/web/api/addReply/:id',async(req,res)=>{
        let id = req.params.id
        let message = await Message.findById({ _id: id } )
        let replies = message.reply
        replies.push(req.body)
        message.reply = replies
        await Message.findByIdAndUpdate(id,message)
        res.status(200).send({
            message:'回复成功'
        })
    })
    // 批量查找
    app.post('/web/api/fetchMany',async(req,res)=>{
        let condition = req.body
        let data = await Club.find({ _id: { $in: [...condition] } })
        res.send(data)
    })

    app.get('/web/api/myApplication/:id',async(req,res)=>{
        let id = req.params.id
        let create = await Application.find({ applicant_id: id } )
        let join = await StuApplication.find({ stu_id: id } )
        let data = {create,join}
        res.send(data)
    })

    //加入社团
    app.post('/web/api/joinclub/:id',async(req,res)=>{
        let club = await Club.findById(req.params.id)
        club.menbers.push(req.body)
        await Club.findByIdAndUpdate(req.params.id,club)
        let stu = await Student.findById(req.body.stu_id)
        stu.clubs.push(req.params.id)
        await Student.findByIdAndUpdate(req.body.stu_id,stu)
        res.status(200).send({
            message:'加入成功'
        })
    })
    //修改isApply
    app.put('/web/api/changeIsApply/:id',async(req,res)=>{
        let id = req.params.id
        let stu = await Student.findById(id)
        let isApply = stu.isApply
        await Student.findById(id).update({$set:{ isApply:!isApply}})
        return res.status(200).send({
            message:'修改成功'
        })
    })


    app.get('/web/api/fetchApp/:id',async(req,res)=>{
        let id = req.params.id
        let data = await Application.find({ club_id: id } )
        res.send(data)
    })

    // 添加资源
    router.post('/',async(req,res)=>{
        let data = await req.Model.create(req.body)
        res.send(data)
    })

    // 注册
    app.post('/web/api/register',async(req,res)=>{
        const repetition  = await Student.find({sno:req.body.sno})
        if(repetition.length > 0){
            return res.status(422).send({
                message:'该用户已存在'
            })
        }
        await Student.create(req.body)
        res.status(200).send({
            message:'注册成功'
        })
    })

    // 修改密码
    app.put('/web/api/changePass',async(req,res)=>{
        const {new_password,old_password,id} = req.body
        let stu = await Student.findById(id).select('+password')
        console.log(req.body)
        const isValid = require('bcrypt').compareSync(old_password,stu.password)
        if(!isValid){
            return res.status(422).send({
                message:'密码错误'
            })
        }
        await Student.findById(id).update({$set:{ password:new_password}})
        return res.status(200).send({
            message:'修改成功'
        })

    })

    // 登录
    app.post('/web/api/login',async(req,res)=>{
        const {sno,password} = req.body

        const user = await Student.findOne({sno}).select('+password')

        if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
        
        const isValid = require('bcrypt').compareSync(password,user.password)

        if(!isValid){
            return res.status(422).send({
                message:'密码错误'
            })
        }
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({id:user._id},app.get('secret'))
        const id = user._id
        res.send({token,id})
    })
}