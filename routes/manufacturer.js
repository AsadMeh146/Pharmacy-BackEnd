import express from "express";
import { isValidObjectId } from "mongoose";
import Manufacturer from "../modals/Manufacturer.js";
import Shipper from "../modals/Shipper.js";

const router = express.Router()

router.get("/" ,async(req,res)=>{
    Manufacturer.find((err,docs)=>
    {
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log("Error in retrieving Manufacturer : " + JSON.stringify(err,undefined,2));
        }
    })

})

router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let manufacturer=new Manufacturer(req.body);
    let isregister
    isregister= await manufacturer.save().then((err,res)=>{
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
router.put("/:id" ,async(req,res)=>{
        var manufacturer = {
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            contact:req.body.contact,
        }
        Manufacturer.findByIdAndUpdate(req.params.id, {$set: manufacturer},{new:true},(err,docs)=>{
            if(!err)
            {
                res.send(docs);
            }
            else
            {
                console.log('Error in updating manufacturer : ' + JSON.stringify(err,undefined,2));
            }
        });  
});
router.delete("/:id",async(req,res)=>{
    Manufacturer.findByIdAndDelete(req.params.id,(err,docs)=>
    {
        if(!err)
        {
            res.send(docs)
        }
        else
        {
            console.log('Error in deleting manufacturer : ' + JSON.stringify(err,undefined,2));
        }
    })
    const query = {manufacturerId : {$regex:req.params.id}}
    Shipper.deleteMany(query,(err,docs)=>
    {
        if(!err)
        {
            console.log("Deleted successfully");
        }
        else
        {
            console.log('Error in deleting manufacturer : ' + JSON.stringify(err,undefined,2));
        }
    })
})

export default router;