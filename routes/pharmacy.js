import express from "express";
import { isValidObjectId } from "mongoose";
import Pharmacy from "../modals/Pharmacy.js";

const router = express.Router()


// post data
router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let pharmacy=new Pharmacy(req.body);
    let isPharmacyAdd
    isPharmacyAdd= await pharmacy.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Pharmacy details not added")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    console.log("Done")
    res.send(isPharmacyAdd)
    
})

//get data
router.get("/" ,async(req , res)=>{
    Pharmacy.find( (err , data)=>{
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

//Update data
router.put("/:Id",async(req,res)=>{
    var pharmacy = 
    {
        Location:req.body.Location,
        ContactNumber:req.body.ContactNumber
    }
    Pharmacy.findByIdAndUpdate(req.params.Id,{$set:pharmacy},{new:true},(err,data)=>{
        if (err)
        {res.send(err)
        console.log("Error in updating pharmacy Data:" + JSON.stringify(err,undefined,2));
        }
        else{
            res.send(data);
            console.log("Data update successfully ")
        }
    })
})

// delete data 
router.delete("/:Id",async(req,res)=>{
    Pharmacy.findByIdAndDelete(req.params.Id,(err,data)=>{
        if (err)
        {res.send(err)
        console.log("Error in Deleting pharmacy Data:" + JSON.stringify(err,undefined,2));
        }
        else{
            res.send(data);
            console.log("Deleted successfully");
        }
    })
})
export default router;