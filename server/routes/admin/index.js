module.exports = app =>{
    const express = require('express')

    // 3.返回token 
    const jwt = require('jsonwebtoken')
    const Student = require('../../models/Student.js')
    const Admin = require('../../models/Admin.js')
    const Club = require('../../models/Club.js')
    const Message = require('../../models/Message.js')
    const Clubnotice = require('../../models/Clubnotice.js')
     //定义一个路由（这个是express的子路由）
    const router = express.Router({
        /**合并url参数。把父级app.use中的参数合并到router实例中，
        *这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
        */
        mergeParams:true
    }) 
    // 验证中间件
    const authMiddleware = require('../../middleware/auth')

    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource.js')
    
    // 使用动态模型 resourceMiddleware会先于'/admin/api/rest/:resource'处理 有个next方法会处理下一个，这里是router
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router) //将子路由挂载 resource可以是notices也可以是users
    
    // 更新资源
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    // 资源详情
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 资源列表
    router.get('/',async(req,res)=>{
        let pageSize = parseInt(req.query.pageSize)
        let currentPage = parseInt(req.query.currentPage) || 1
        //总页数
        let totalCount = await req.Model.countDocuments()
        let pages = Math.ceil(totalCount/pageSize) || 1
        const data = await req.Model.find().skip((currentPage - 1) * pageSize).limit(pageSize)
        res.send({data,totalCount})
    })

    // 删除资源
    router.delete('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
        // res.send({
        //     success:true
        // })
    })

    // 添加资源
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //修改isApply
    app.put('/admin/api/changeIsApply/:id',async(req,res)=>{
        let id = req.params.id
        let stu = await Student.findById(id)
        let isApply = stu.isApply
        await Student.findById(id).update({$set:{ isApply:!isApply}})
        return res.status(200).send({
            message:'修改成功'
        })
    })

    //踢出成员
    app.delete('/admin/api/deleteMenber/:id/:stu_id',async(req,res)=>{
        let id = req.params.id
        let stu_id = req.params.stu_id
        let club = await Club.findById(id)
        for(let i = 0;i<club.menbers.length;i++){
            if(stu_id.toString() === club.menbers[i].stu_id.toString()){
                if (i == 0) {
                    club.menbers.shift()
                }
                else if(i == club.menbers.length - 1) {
                    club.menbers.pop()
                }
                else {
                    club.menbers.splice(i, 1)
                }
            }
        }
        await Club.findByIdAndUpdate(id,club)
        let stu = await Student.findById(stu_id)
        for(let j = 0;j<stu.clubs.length;j++){
            if(id.toString() === stu.clubs[j].club_id.toString()){
                if (j == 0) {
                    stu.clubs.shift()
                }
                else if(j == stu.clubs.length - 1) {
                    stu.clubs.pop()
                }
                else {
                    stu.clubs.splice(i, 1)
                }
            }
        }
        await Student.findByIdAndUpdate(stu_id,stu)
        res.status(200).send({
            message:'删除成功'
        })
    })
        
    // 添加社团
    app.post('/admin/api/createClub',async(req,res)=>{
        let user = await Student.findById({_id:req.body.admin_id})
        req.body.menbers = []
        let newMenbers = {}
        newMenbers.stu_id = user._id
        newMenbers.name = user.name
        newMenbers.sno = user.sno
        newMenbers.post = '社长'
        req.body.menbers.push(newMenbers)
        let club = await Club.create(req.body)
        let newClub = {}
        newClub.club_name = club.club_name
        newClub.club_id = club._id
        newClub.post = '社长'
        user.clubs.push(newClub)
        const model = await Student.findByIdAndUpdate(user._id,user)
        res.send(model)
    })

    // 搜索
    router.get('/search/details', async (req, res) => {
        let {name,publish_admin,sno,club_name} = req.query
        let data
        if(sno){
            data = await req.Model.find({sno})
        }
        if(name){
            data = await req.Model.find({name:name})
        }
        if(club_name){
            data = await req.Model.find({club_name})
        }
        if(publish_admin){
            data = await req.Model.find({publish_admin})
        }
        let totalCount = data.length
        res.send({data,totalCount})
    })
    //加入社团
    app.post('/admin/api/joinclub/:id',async(req,res)=>{
        
        let club = await Club.findById(req.params.id)
        club.menbers.push(req.body)
        await Club.findByIdAndUpdate(req.params.id,club)
        let stu = await Student.findById(req.body.stu_id)
        console.log(stu)
        let joinClub = {}
        joinClub.club_name = club.club_name 
        joinClub.post = '社员'
        joinClub.club_id = club._id
        stu.clubs.push(joinClub)
        await Student.findByIdAndUpdate(req.body.stu_id,stu)
        res.send({
            success:true
        })
    })
    app.get('/admin/api/fetchNotice/:club_id',async(req,res)=>{
        let id = req.params.club_id
        let data = await Clubnotice.find({ club_id: id } )
        res.send(data)
    })
    //回复主题
    app.post('/admin/api/addReply/:id',async(req,res)=>{
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

    app.post('/admin/api/login',async(req,res)=>{
        let {username,password,post} = req.body
        let user 
        //1.根据用户名找用户
        if(post === '社联管理员'){
            console.log(2)
            user = await Admin.findOne({username}).select('+password')
        }else{
            console.log(1)
            user = await Student.findOne({sno:username}).select('+password')
        }
        //select('+password')表示的是将password这个字段取出来 
        if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
        // 2.校验密码 compareSync比较明文和密文是否匹配 返回值的是布尔值
        const isValid = require('bcrypt').compareSync(password,user.password)
        if(!isValid){
            return res.status(422).send({
                message:'密码错误'
            })
        }
        // 3.返回token 
        const jwt = require('jsonwebtoken')
        // 生成token
        const token = jwt.sign({id:user._id},app.get('secret'))
        let id = user._id
        res.send({token,id})
    })
    
    // 注册
    app.post('/admin/api/register',async(req,res)=>{
        const repetition  = await Student.find({sno:req.body.sno})
        if(repetition.length > 0){
            return res.status(422).send({
                message:'该用户已存在'
            })
        }
        await Student.create(req.body)
    })

    function removeAaary(_arr, _obj) {
        let length = _arr.length;
        for (let i = 0; i < length; i++) {
            if (_arr[i] == _obj) {
                if (i == 0) {
                    _arr.shift(); //删除并返回数组的第一个元素
                    return _arr;
                }
                else if (i == length - 1) {
                    _arr.pop();  //删除并返回数组的最后一个元素
                    return _arr;
                }
                else {
                    _arr.splice(i, 1); //删除下标为i的元素
                    return _arr;
                }
            }
        }
    }
}