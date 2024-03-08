const json = require('express')
const users = require('../Models/userSchema')
const Feedbacks = require('../Models/feedbackSchema')
const Bookings = require('../Models/wedSchema')
const jwt = require('jsonwebtoken')
const gallery = require('../Models/gallerySchema')
const weddings = require('../Models/wedSchema');

const { hashPassword, comparePassword } = require('../helpers/authHelper');


//REGISTER | POST ===============================
exports.register = async(req,res)=>{
const {username,email,password,address,phone} = req.body
try {
   //validation
const existingUser = await users.findOne({email})
if(existingUser){
    res.status(401).json("User Already Existing")
}else{
    const hashedpassword = await hashPassword(password)
    const user = await users({username,email,password:hashedpassword,address,phone})
    await user.save()
    res.status(200).json(user)
} 
} catch (error) {
    
    res.status(500).json(`server error (register) ${error}`)
}

}
//==========================================================


//LOGIN | POST==============================================

exports.login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await users.findOne({email})
        const match = await comparePassword(password,user.password)
        if(!user||!match){
            return res.status(404).json("Check Email or Password")
        }
       else{
            //token
            const token = jwt.sign({userId:user._id},"superkey2024")
            console.log(token)
            res.status(200).json({user,token})
        }
    } catch (error) {
        res.status(500).json(`server error (login) ${error}`)
    }
}

//USER DETAILS GETTING | GET ===================================
exports.getLatestUserData = async(req,res)=>{
    console.log('inside controller')
    //api result
    try {
        const latestWedding = await weddings.findOne().sort({ createdAt: -1 });
        res.json(latestWedding);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
}

exports.getAllUsersFeedback = async(req,res)=>{
    try {
        const allFeedbacks = await Feedbacks.find();

        if (allFeedbacks.length > 0) {
            res.status(200).json(allFeedbacks);
        } else {
            res.status(404).json({ message: "No feedbacks found" });
        }
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllUsersBooking = async(req,res)=>{
    try {
        const allBookings = await Bookings.find();

        if (allBookings.length > 0) {
            res.status(200).json(allBookings);
        } else {
            res.status(404).json({ message: "No Bookings found" });
        }
    } catch (error) {
        console.error("Error fetching Bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



exports.getAdminGallery = async(req,res)=>{
    try {
        const adminPhotos = await gallery.find();

        if (adminPhotos.length > 0) {
            res.status(200).json(adminPhotos);
        } else {
            res.status(404).json({ message: "No admin Photos found" });
        }
    } catch (error) {
        console.error("Error fetching admin Photos:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



//test controller
exports.testController = async(req,res)=>{
    console.log('protected route')
}


