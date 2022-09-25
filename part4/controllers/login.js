const loginRoutes= require('express').Router()
const UserModels = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
loginRoutes.post('/',async (request,response,next)=>{
try{
    const body = request.body

   const user = await UserModels.findOne({user:body.user})
  const passwordHash = user=== null? false :await bcrypt.compare(body.password,user.passwordHash)

   if(!user && !passwordHash ){
    return response.status(401).json('invalid userName or password')
   }

   const userForToken = {
    user:user.user,
    id: user._id
   }
   console.log(userForToken)
   const token = jwt.sign(userForToken,config.SECRET)
   response.status(200).send({token,user:user.user,name:user.name})
}catch(e){
    next(e)
}
})

module.exports= loginRoutes