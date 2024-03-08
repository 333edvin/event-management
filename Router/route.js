const express = require('express')
const multer = require('multer');

//controllers
const userController = require('../Controllers/userController')
const weddingController = require('../Controllers/weddingController')
const feedbackController = require('../Controllers/feedbackController')
const galleryController = require('../Controllers/galleryController')
const contactController = require('../Controllers/contactController')

//middleware
const jwtMiddleware = require("../Middlewares/jwtMiddleware")
const multerConfig = require('../Middlewares/multerMiddleware');
const isAdmin = require('../Middlewares/AuthMiddleware');
//router
const router = new express.Router()

// Multer configuration

router.post('/register',userController.register)

router.post('/login',userController.login)

router.get('/get-userdata/latest',jwtMiddleware,userController.getLatestUserData)

router.get('/get-allfeedbacks',jwtMiddleware,isAdmin,userController.getAllUsersFeedback)

router.get('/get-allbookings',jwtMiddleware,isAdmin,userController.getAllUsersBooking)

router.get('/get-allimages',userController.getAdminGallery)


router.get('/test',jwtMiddleware,isAdmin,userController.testController)

router.get('/user-auth',jwtMiddleware,(req,res)=>{
    res.status(200).json({ok:true})
})
router.get('/admin-auth',jwtMiddleware,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})



//wedding routes api


router.post('/wedding/addevent',jwtMiddleware,multerConfig.single(''),weddingController.addWeddingEvent)

router.get('/wedding/get-details',jwtMiddleware,weddingController.getUserEvent)

router.put('/wedding/update-user-event/:id',jwtMiddleware,multerConfig.single(''),weddingController.editEvent)

router.delete('/wedding/delete-user-event/:id',jwtMiddleware,weddingController.deleteEvent)

//user gallery
router.post('/gallery/upload-image',jwtMiddleware,multerConfig.single('image'),galleryController.userGallery)

router.get('/gallery/get-image',jwtMiddleware,galleryController.getImages)

router.delete('/gallery/delete-image/:id',jwtMiddleware,galleryController.deleteImage)


//user feedback

router.post('/userfeedback/feedback',multerConfig.single(),jwtMiddleware,feedbackController.userFeedback)

router.get('/userfeedback/get-user-feedback',jwtMiddleware,feedbackController.getfeedback)

router.put('/userfeedback/update-feedback/:id',multerConfig.single(),jwtMiddleware,feedbackController.updateFeedback)

router.delete('/userfeedback/delete-feedback/:id',jwtMiddleware,feedbackController.deleteFeedback)

//user guest contact list
router.post('/contact/create-contact',jwtMiddleware,contactController.createContact)

router.get('/contact/get-contact',jwtMiddleware,contactController.getContactList)

router.put('/contact/update-contact/:id',jwtMiddleware,contactController.updateContact)

router.delete('/contact/delete-contact/:id',jwtMiddleware,contactController.deleteContact)


module.exports = router


