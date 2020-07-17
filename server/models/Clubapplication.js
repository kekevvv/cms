const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  club_name : String,
  applicant : String,
  introduce:String,
  // mongoose.SchemaTypes.ObjectId
  applicant_id : mongoose.SchemaTypes.ObjectId,
  club_id:mongoose.SchemaTypes.ObjectId,
  reason :String,
  app_type:Number //0创建 1删除
},
{
  // 自动添加 createdAt & updatedAt 字段
  timestamps: true
})

module.exports = mongoose.model('Clubapplication', schema)