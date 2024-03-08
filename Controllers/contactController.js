const guestContact = require('../Models/contactSchema')
exports.createContact = async(req,res)=>{
    const userId = req.payload

    try {
        const {guestname,number} = req.body
        const data = new guestContact({guestname,number,userId})
        await data.save()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error occurred while creating guest contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getContactList = async(req,res)=>{
    const userId = req.payload
    const data = await guestContact.find({userId})
    res.status(200).json(data)
    try {
        
    } catch (error) {
        console.error("Error occurred while getting guest contact List:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateContact = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {guestname,number} = req.body
    try {
        const data = await guestContact.findByIdAndUpdate({_id:id},{guestname,number,userId},{new:true})

        await data.save()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error occurred while updating guest contact :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteContact = async(req,res)=>{
    const {id} = req.params
    try {
        const data = await guestContact.findByIdAndDelete({_id:id})
        res.status(200).json(data)
    } catch (error) {
        console.error("Error occurred while deleting guest contact :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}