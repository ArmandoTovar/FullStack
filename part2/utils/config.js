require('dotenv').config()

const PORT = process.env.PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
const NODE = process.env.NODE_ENV

const SECRET =process.env.SECRET
module.exports = { PORT, MONGODB_URI,SECRET,NODE }
