const userModel = require('../models/userModel')


// user registration
const registerController= async (req,res)=>{

    const {username,email,password}=req.body
    try{
        const emailCheck= await userModel.findOne({email})
         if(emailCheck){
            res.status(400).json({
                message:"Email already exists"
            })
         } else{
                const newUser=new userModel({username,email,password})
                await newUser.save()
                res.status(200).json({
                    message:'Registration successfull'
                })}
    }catch(error){
        console.log(error);
        res.status(500).send(
        'username and email must be unique'
        )
    }}


// user login
const loginController=async (req,res)=>{

    const {username,password}=req.body
    try{
    const user= await userModel.findOne({username,password})
    if(!user){
        res.status(400).json({
            message:"Incorrect username or password"
        })
    }else{
        res.status(200).json({
            message:"Login succesfull",
            data:user
        })
    }
    }catch(error){
        res.status(500).send('server error')
    }}


// get all users
const getAllUsersController=async (req,res)=>{

    try{
     const users= await userModel.find({_id:{$ne:req.params.id}}).select([
       "username",
        "email",
        "_id"
     ])
     if(users){
        res.status(200).json({
            data:users
        })
     }else{
        res.status(400).send('error')
     }
    }catch(error){
        res.status(500).send('server error')
    }
}

module.exports={registerController,loginController,getAllUsersController}
