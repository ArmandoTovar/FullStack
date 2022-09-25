const router = require('express').Router()
const user = require('../models/user')
const blog = require('../models/blog')


router.post('/reset',async (request,response)=>{

   await  user.deleteMany({})
   await  blog.deleteMany({})
    return  response.status(200).end()

})

module.exports = router