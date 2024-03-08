const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})

const feed = mongoose.model("Userfeedback",feedbackSchema)
module.exports = feed