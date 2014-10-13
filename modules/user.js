var mongoose=require('mongoose')
var UserSchame=require('../schemas/user')
var User=mongoose.model('User',UserSchame)

 module.exports=User;