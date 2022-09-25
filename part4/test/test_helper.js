const Blog = require('../models/blog')
const mongoose = require('mongoose')
const user = require('../models/user')
const blogs = [
    {
    
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,

    },
    {
   
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
   
    },
  ]

const getAllDbTest = async ()=>{
    const app = await Blog.find({})
    
    return  app.map(e=> e.toJSON())

}

const getAllDbUserTest = async ()=>{
  const app = await user.find({})
  
  return  app.map(e=> e.toJSON())

}

const nonExistingId = async () =>{
 const newBlog = new Blog({
        "title": "String",
        "author": "String",
        "url": "String",
        "likes": 2
})
 const blog = await newBlog.save()
 blog = await newBlog.remove()
return blog._id.toString();

}

module.exports = {
    blogs,getAllDbTest,nonExistingId,getAllDbUserTest
}