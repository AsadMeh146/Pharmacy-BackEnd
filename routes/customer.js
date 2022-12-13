import express from "express";

import { isValidObjectId } from "mongoose";


import Customer from "../modals/Customer.js";

const router = express.Router()


// post data
router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let customer=new Customer(req.body);
    let isCustomerAdd
    isCustomerAdd= await customer.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Customer details not added")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    console.log("Done")
    res.send(isCustomerAdd)
    
})




export default router;