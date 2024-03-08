const feed = require('../Models/feedbackSchema')

//user feedback=======================================================================
exports.userFeedback = async(req,res)=>{
    const userId = req.payload
    try {
        const {username,email,feedback} = req.body
        const data = new feed({username,email,feedback,userId})

        await data.save()

        res.status(200).json(data)
        
    } catch (error) {
        console.error("Error occurred while getting user feedback:", error);
        res.status(500).json({ message: "Internal server error" });
    }
} 


//read event==================================================================================================
exports.getfeedback = async(req,res)=>{
    //user id
    const userId = req.payload
    console.log(userId)
    try {
        const userFeedback = await feed.find({userId})
        res.status(200).json(userFeedback)
    } catch (error) {
        console.error("Error occurred while getting user events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//update event================================================================================================
exports.updateFeedback = async(req,res)=>{
    const { feedback,email } = req.body;
    const userId = req.payload
    const {id} = req.params

    try {
        const updateUserFeedback = await feed.findByIdAndUpdate({_id:id},{feedback,email,userId},{new:true})

        await updateUserFeedback.save()

        res.status(200).json(updateUserFeedback)

    } catch (error) {
        console.error("Error occurred while updating user event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//============================================================================================================


//delete event================================================================================================
exports.deleteFeedback = async(req,res)=>{
    const {id} = req.params
    try {
        const deleteUserFeedback = await feed.findByIdAndDelete({_id:id})
        res.status(200).json(deleteUserFeedback)
    } catch (error) {
        console.error("Error occurred while deleting user event:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
//============================================================================================================