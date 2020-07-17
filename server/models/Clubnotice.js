const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  public_content: String,
  publish_admin:String,
  club_id:mongoose.SchemaTypes.ObjectId
},
{
  // 自动添加 createdAt & updatedAt 字段
  timestamps: true
})

//导出一个Category模型
module.exports = mongoose.model('Clubnotice', schema)