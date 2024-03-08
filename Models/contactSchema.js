const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    guestname:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})

const userContact = mongoose.model('contact',contactSchema)

module.exports = userContact