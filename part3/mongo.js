const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('please provide the password as  an argument: node mongo.js <password> ')
    process.exit(1)
}
const password = process.argv[2]
const url=`mongodb+srv://ajts1995:${password}@cluster0.lvmt4ca.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)
const noteSchema= new mongoose.Schema({
    content:String,
    date:Date,
    important: Boolean,
})
const Note= mongoose.model('Note',noteSchema)

// const note = new Note({
// content:'Html is easy',
// date: new Date(),
// important: false,
// })

// note.save().then(result=>{
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({important:false}).then(result=>{
    result.forEach(note=>{
        console.log(note)
    })
    mongoose.connection.close()
})