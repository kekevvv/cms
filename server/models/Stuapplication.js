const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  sno : Number,
  name : String,
  reason:String,
  stu_id : mongoose.SchemaTypes.ObjectId,
  club_id:mongoose.SchemaTypes.ObjectId,
  club_name:String,
  app_type:Number //0加入 1退出
},
{
  // 自动添加 createdAt & updatedAt 字段
  timestamps: true
})

module.exports = mongoose.model('Stuapplication', schema)