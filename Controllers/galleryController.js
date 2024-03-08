const userImageGallery = require('../Models/gallerySchema')
exports.userGallery = async(req,res)=>{
    const userId = req.payload
     //get image
     const image = req.file.filename
    //  console.log(userImage)
     //adding new user
     try {
        
             const newImage = new userImageGallery({image,userId})
             await newImage.save()
             res.status(200).json(newImage)
         
    } catch (error) {
        console.log('server error'+error)
    }
}


exports.getImages = async(req,res)=>{
    //user id
    const userId = req.payload
    console.log(userId)
    try {
        const userPhoto = await userImageGallery.find({userId})
        res.status(200).json(userPhoto)
    } catch (error) {
        console.error("Error occurred while getting user events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.deleteImage = async(req,res)=>{
    const {id} = req.params
    try {
        const deleteUserImage = await userImageGallery.findByIdAndDelete({_id:id})
        res.status(200).json(deleteUserImage)
    } catch (error) {
        console.error("Error occurred while deleting user event:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}