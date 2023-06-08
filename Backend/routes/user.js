const express =require('express')
const router=express.Router()
const{registerController,loginController,getAllUsersController}=require('../controllers/UserController')

// user register
router.post('/register',registerController)

// user login
router.post('/login',loginController)

// get all users
router.get('/getAllUsers/:id',getAllUsersController)


module.exports=router