const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')


const UserSchema = mongoose.Schema({
    user:{type:String,unique:true,minlength:5,required:true},
    passwordHash:{type:String},
    name : {type:String},
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
      }]
})

UserSchema.plugin(uniqueValidator)

UserSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('User',UserSchema)