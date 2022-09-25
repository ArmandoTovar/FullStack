const userRouter = require('express').Router()

const userModels = require('../models/user')
const blogModels = require('../models/blog')
const bcrypt = require('bcrypt')


userRouter.get('/',(request,response,next)=>{

    userModels.find({}).populate('blogs',{url:1,title:1,author:1}).then((Users)=>{
        response.send(Users)
    }).catch((e)=> next(e))


})

userRouter.post('/',async (request,response,next) => {
    const body = request.body
    const saltRounds = 10
    if(!body.password || !body.user ){
        return response.status(400).send({error:'user and pass required '})
    }
    if(body.password.length <3 ||body.user.length <3){
     return   response.status(400).send({error:'3 min length user and pass 3 '})
    }
   
    const passwordHash = await bcrypt.hash(body.password,saltRounds)
    const newUser = new userModels({
        user:body.user,
        name:body.name,
        passwordHash: passwordHash
     } )
        newUser.save().then(user=>{
            response.json(user)
        }).catch(e=>next(e))


})

module.exports = userRouter