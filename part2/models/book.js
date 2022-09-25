const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const BookSchema = new mongoose.Schema({
  name: { type:String,minlength: 3,required:true , unique:true },
  number: { type:String,minlength: 8,required:true , unique:true },
  important: { type:Boolean },
  date: { type:Date ,required:true },
})

BookSchema.plugin(uniqueValidator)

BookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Books', BookSchema)
