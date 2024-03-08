const weddings = require('../Models/wedSchema');
const fs = require('fs');
const path = require('path');
//create event===============================================================================================
exports.addWeddingEvent = async(req,res)=>{
    console.log("inside wedding controller");

    // user id
    const userId = req.payload;
    console.log(userId);

    // details (excluding bridegroomImage)
    const { brideName, groomName, email, phone, weddingDate, weddingVenue, numberOfGuests, weddingStyle, servicesRequired, additionalPreferences, termsAgreed } = req.body;
    
    try {
        const newEvent = new weddings({ brideName, groomName, email, phone, weddingDate, weddingVenue, numberOfGuests, weddingStyle, servicesRequired, additionalPreferences, termsAgreed, userId });
        await newEvent.save();
        res.status(200).json(newEvent);
    } catch (error) {
        console.error("Error occurred while saving event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//============================================================================================================



//read event==================================================================================================
exports.getUserEvent = async(req,res)=>{
    //get user id
    const userId = req.payload
    //api result
    try {
        //get project informaion of particular user
        const userEvent = await weddings.find({userId})
        console.log(userEvent)
        res.status(200).json(userEvent)
    } catch (error) {
        console.error("Error occurred while getting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//update event================================================================================================
exports.editEvent = async(req,res)=>{
    const {brideName, groomName,email, phone, weddingDate, weddingVenue, numberOfGuests, weddingStyle, servicesRequired, additionalPreferences, termsAgreed} = req.body;

  
    const uploadImage = req.file?req.file.filename:bridegroomImage

    const userId = req.payload

    const {id} = req.params

    try {
        const updateEvent = await weddings.findByIdAndUpdate({_id:id},{brideName, groomName,bridegroomImage:uploadImage, email, phone, weddingDate, weddingVenue, numberOfGuests, weddingStyle, servicesRequired, additionalPreferences, termsAgreed, userId},{new:true})

        await updateEvent.save()

        res.status(200).json(updateEvent)

    } catch (error) {
        console.error("Error occurred while saving event:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
//============================================================================================================



//delete event================================================================================================
exports.deleteEvent = async(req,res)=>{
    const {id} = req.params
    try {
        const deleteUserEvent = await weddings.findByIdAndDelete({_id:id})
        res.status(200).json(deleteUserEvent)
    } catch (error) {
        console.error("Error occurred while deleting user event:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
//============================================================================================================


