const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
require('dotenv').config()
require('./config/auth')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  
})

app.get('/', (req, res) => {
  res.json({message: "Hello"})
})

const auth = require('./routes/auth')

app.use('/api/auth', auth)

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
  if(err){
    console.log(`Error while trying to connect to DATABASE: ${err}`)
  }else{
    console.log("DATABASE CONNECTED!");
  }
})

//Error handlers
const {errorHandlers,notFound} = require('./middlewares/errorHandler')
app.use(notFound)
app.use(errorHandlers)

const port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})