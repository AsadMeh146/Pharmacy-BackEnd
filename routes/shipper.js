import express from "express";
import { isValidObjectId } from "mongoose";
import Shipper from "../modals/Shipper.js";


const router = express.Router()

router.get("/" ,async (req,res)=>{
    Shipper.aggregate([
        {
          $lookup: {
            from: "manufacturerdetails",
            localField: "manufacturerId",
            foreignField: "_id",
            as: "manufacturerDetails"
          }
        },
        {
          $unwind: "$manufacturerDetails"
        }
      ])
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });

})

router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let shipper=new Shipper(req.body);
    let isregister
    isregister= await shipper.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Failed")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    res.send(isregister)

})
router.put("/:id" ,(req,res)=>{
        var shipper = {
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            manufacturerId:req.body.manufacturerId,
            contact:req.body.contact,
        }
        Shipper.findByIdAndUpdate(req.params.id, {$set: shipper},{new:true},(err,docs)=>{
            if(!err)
            {
                res.send(docs);
            }
            else
            {
                console.log('Error in updating shipper : ' + JSON.stringify(err,undefined,2));
            }
        });  
});
router.delete("/:id",(req,res)=>{
    Shipper.findByIdAndDelete(req.params.id,(err,docs)=>
    {
        if(!err)
        {
            res.send(docs)
        }
        else
        {
            console.log('Error in deleting shipper : ' + JSON.stringify(err,undefined,2));
        }
    })
})

export default router;