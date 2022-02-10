const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  // console.log(`logger  middleware`)
  console.log(`Time Stamp: ${new Date().toLocaleString()}, Request Method: ${req.method}, Request USL: ${req.url}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  // console.log(`validateUserId  middleware`)
  // next()
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({message: "user not found"})
    }else{
      req.user = user
      next()
    }
  }catch(err){
    next()
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  // console.log(`validateUser  middleware`)
  // next()
  try{
    const {name} = req.body
    if(!name || !name.trim()){
      res.status(400).json({message: "missing required name field" })
    }else{
      req.name = name.trim()
      next()
    }
  }catch(err){
    next()
  }
}

async function validatePost(req, res, next) {
  // DO YOUR MAGIC
  // console.log(`validatePost  middleware`)
  // next()
  try{
    const {text} = req.body
    if(!text || !text.trim()){
      res.status(400).json({message:  "missing required text field" })
    }else{
      req.text = text.trim()
      next()
    }
  }catch(err){
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}