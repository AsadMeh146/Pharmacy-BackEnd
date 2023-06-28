import express from "express";
import User from "../modals/User.js"

const router = express.Router()

router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let user=new User(req.body);
    let isregister
    isregister= await user.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Registration failed")
            return false
        }
        else{
            console.log("Registered successfully")
            return true
        }

    })
    console.log("Done")
    res.send(isregister)

})



export default router;