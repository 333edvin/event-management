// const mongoose = require('mongoose');
const users = require("../Models/userSchema");

const isAdmin = async (req, res, next) => {
    console.log('inside isAdmin')
    try {
        const userId = req.payload
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.role !== 1) {
            return res.status(401).json("Unauthorized Access");
        }

        // If the user has admin role, proceed to the next middleware
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

module.exports = isAdmin; 
