const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log("password is missing")
}
const password = process.argv[2]
const url=`mongodb+srv://ajts1995:${password}@cluster0.lvmt4ca.mongodb.net/note-app?retryWrites=true&w=majority`

    mongoose.connect(url)
    
    const BookSchema=  mongoose.Schema({
        name:String,
        phone:String,
        important:Boolean,
        date:Date,
    })

   const Books = mongoose.model('Books',BookSchema)


if(process.argv.length==3){
    Books.find({}).then((res)=>{
        res.forEach(dir=>{
            console.log(dir)
        })
        mongoose.connection.close()
    })
  
}
if(process.argv.length==5){
   
   const  Book = new Books({
        name:process.argv[3],
        phone:process.argv[4],
        important:true,
        date:new Date(),
    })
    Book.save().then(()=>{
        console.log('saved')
        mongoose.connection.close()
    })
  
}
   
    
   