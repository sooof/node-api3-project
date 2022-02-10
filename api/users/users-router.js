const express = require('express');
const User = require('./users-model')
const Post = require('../posts/posts-model')
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  // res.json({message: "TEST: get /api/users !!!"})
  User.get()
    .then( result =>{
      res.json(result)
    })
    .catch(next)

});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // res.json({message: "TEST: get /api/users/:id !!!"})
  // console.log(req.user)
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  // res.json({message: "TEST: post /api/users !!!"})
  User.insert(req.body)
    .then(user=>{
      res.status(201).json(user)
      // throw new Error('demons!!!!')
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // res.json({message: "TEST: put /api/users/:id !!!"})
  User.update(req.params.id, req.body)
    .then(user=>{
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  // res.json({message: "TEST: delete /api/users/:id !!!"})
  User.remove(req.params.id)
    .then( ()=>{
      // res.json({message: "delete success"})
      res.json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  // res.json({message: "TEST: get /api/users/:id/posts !!!"})
  User.getUserPosts(req.params.id)
    .then(post=>{
      res.json(post)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // res.json({message: "TEST: post /api/users/:id/posts !!!"})
  // console.log(req.user)
  // console.log(req.text)
  Post.insert({user_id: req.params.id, text: req.body.text})
    .then(post => {
      // console.log(post)
      res.status(200).json(post)
    })
    .catch(next)

});

// do not forget to export the router
module.exports = router