import express from "express";
import user from "../modals/User.js";

import { isValidObjectId } from "mongoose";

const router = express.Router()
router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let employee=new user(req.body);
    let isEmployeeAdd
    isEmployeeAdd= await employee.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Employee details not added")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    console.log("Done")
    res.send(isEmployeeAdd)
    
})



export default router;