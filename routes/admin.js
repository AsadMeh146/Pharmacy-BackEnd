import express from "express";
import user from "../modals/User.js";
import { isValidObjectId } from "mongoose";

const router = express.Router()
router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let admin=new user(req.body);
    let isAdminAdd
    isAdminAdd= await admin.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Admin details not added")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    console.log("Done")
    res.send(isAdminAdd)
    
})

router.get("/:Name" ,async(req , res)=>{
    user.find({Name},(err , data)=>{
        if (err)
        {res.send(err)
        }
        else{
             res.send(data);
            console.log("Done!")
        }
    }
    )

})

export default router;