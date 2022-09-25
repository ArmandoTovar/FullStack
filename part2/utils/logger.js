const error = (...message) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...message)
  }
}
const info = (...message) => {
  console.log(...message)
}

module.exports = { error, info }
