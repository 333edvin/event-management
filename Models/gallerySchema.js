const mongoose = require('mongoose')

const userGallerySchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})

const gallery = mongoose.model('gallery',userGallerySchema)

module.exports = gallery