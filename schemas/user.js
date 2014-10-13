var mongoose = require('mongoose')
var UserSchema= new mongoose.Schema({
	fen:Number,
	password:Number,
	name:String,
	mate:{
		createAt:{
			type:Date,
			default: Date.now()
		},
		uptateAt:{
			type:Date,
			default: Date.now()
		}
	}
})

UserSchema.statics={
	fetch:function(cd){
		return this
		.find({})
		.exec(cd)
	},
	findByName:function(newname,cd){
		return this
		.findOne({name:newname})
		.exec(cd)
	},
}

module.exports=UserSchema;
                                                                                                                                                                            