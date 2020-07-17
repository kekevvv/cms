const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username : String,
  name : String,
  gender:String,
  phoneNumber:Number,
  password : {
    type:String,
    select:false, //密码默认取不到
    set(val){
      return require('bcrypt').hashSync(val,10)
    },
    // select:false,
    // set(val){

    // }
  },
})

//导出一个Category模型
module.exports = mongoose.model('Admin', schema)