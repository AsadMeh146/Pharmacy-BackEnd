import express from "express";
import { isValidObjectId } from "mongoose";
import Stock from "../modals/Stock.js";

const router = express.Router()
// have to add pharmacy Id dynamically
router.get("/" ,async(req,res)=>{
    Stock.aggregate([
        {
          $lookup: {
            from: "lookups",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: "$category"
        },
        { $match: { $expr : { $eq: [ '$pharmacyId' , { $toObjectId: "6380920946c6abc3c48115dc" } ] } } },
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
    let stock=new Stock(req.body);
    let isregister
    isregister= await stock.save().then((err,res)=>{
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
        var product = {
            name:req.body.name,
            category:req.body.categoryId,
            strength:req.body.strength,
            description:req.body.description,
            manufacturerName:req.body.manufacturerName
            // pharmacyId:req.body.pharmacyId
        }
        Stock.findByIdAndUpdate(req.params.id, {$set: product},{new:true},(err,docs)=>{
            if(!err)
            {
                res.send(docs);
            }
            else
            {
                console.log('Error in updating product : ' + JSON.stringify(err,undefined,2));
            }
        });  
});
router.delete("/:id",async(req,res)=>{
    Stock.findByIdAndDelete(req.params.id,(err,docs)=>
    {
        if(!err)
        {
            res.send(docs)
        }
        else
        {
            console.log('Error in deleting product : ' + JSON.stringify(err,undefined,2));
        }
    })
    
})

export default router;