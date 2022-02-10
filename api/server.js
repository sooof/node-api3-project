const express = require('express');
const usersRouter = require('./users/users-router')

const server = express();
server.use(express.json())

// global middlewares and the user's router need to be connected here

server.use('/api/users', usersRouter)

server.get('/hello', (req, res)=>{
  res.json({message: "hello world!!!"})
})


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res)=>{
  res.status(404).json({message: `${req.method} ${req.baseUrl}, not found!!!`})
})

server.use((err, req, res, next)=>{
  console.log('ERR')
  res.status(err.status || 500).json({
    message: `The Horror: ${err.message}`,
  })
})
module.exports = server;
