const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  club_name : String,
  admin_id :  mongoose.SchemaTypes.ObjectId,
  introduce :String,
  menbers:[{
    stu_id:mongoose.SchemaTypes.ObjectId,
    name:String,
    sno:Number,
    post:String //社长  社员
  }]
  // members:{
  //     type:Array,
  //     default:[]
  // }
},
{
  // 自动添加 createdAt & updatedAt 字段
  timestamps: true
})

module.exports = mongoose.model('Club', schema)