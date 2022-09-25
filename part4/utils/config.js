
require('dotenv').config()
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
let MONGOBLOGURL = process.env.MONGOBLOGURL
if(process.env.NODE_ENV==='test'){
    MONGOBLOGURL = process.env.MONGOBLOGURLTEST
}
const NODE = process.env.NODE_ENV
module.exports ={
    PORT,
    MONGOBLOGURL,
    SECRET,
    NODE

}