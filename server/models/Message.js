const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  content:String,
  applicant_id:mongoose.SchemaTypes.ObjectId,
  applicant_name:String,
  reply:[
      {
        reply_id:mongoose.SchemaTypes.ObjectId,
        reply_name:String,
        reply_content:String,
        reply_time:{
          type:Date,
          default:new Date()
        },
        isAuthor:{
          type:Boolean,
          default:false
        },
        isAdmin:{
          type:Boolean,
          default:false
        }
      }
  ]
},
{
  timestamps: true
})

module.exports = mongoose.model('Message', schema)