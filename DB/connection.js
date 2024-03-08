//connection between node and mongodb

const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('Database connected')
})
.catch((error)=>{
    console.log('Database Connection Error')
})