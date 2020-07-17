const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  sno : Number,
  name : String,
  password : {
    type:String,
    select:false, //密码默认取不到
    set(val){
      return require('bcrypt').hashSync(val,10)
    }
  },
  gender:String,
  phoneNumber:Number,
  class:String,
  clubs:[{
    club_name : String,
    club_id:mongoose.SchemaTypes.ObjectId,
    post:String, // 社员 副社长 社员
  }],
  isApply:{
    type:Boolean,
    default:false
  }
},
{
  // 自动添加 createdAt & updatedAt 字段
  timestamps: true
})

module.exports = mongoose.model('Student', schema)