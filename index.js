//load .env file
require('dotenv').config()

//express
const express = require('express');

//cors
const cors = require('cors')

//database
const db = require('./DB/connection')

//router
const router = require('./Router/route')

//middlewares
const jwtMiddleware = require("./Middlewares/jwtMiddleware")

//backend app
const app = express()

//use
app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads',express.static('./uploads'))

//port
const PORT = process.env.PORT || 8080

//app listen
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send('<h1>App Started</h1>')
})
