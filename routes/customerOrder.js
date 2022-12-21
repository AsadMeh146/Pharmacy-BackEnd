import express from "express";
import { isValidObjectId } from "mongoose";
import CustomerOrder from "../modals/CustomerOrder.js";
import Stock from "../modals/Stock.js";
import Shipper from "../modals/Shipper.js";
import CustomerOrderDetails from "../modals/CustomerOrderDetails.js";


const router = express.Router()

router.get("/:pharmacyId" ,async (req,res)=>{
    Stock.aggregate([
        {
          $lookup: {
            from: "stockdetails",
            localField: "_id",
            foreignField: "stockId",
            as: "stockDetails"
          }
        },
        {
          $unwind: "$stockDetails"
        },
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
        { $match: { $expr : { $eq: [ '$pharmacyId' , { $toObjectId: req.params.pharmacyId } ] } } }
        
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
    let customer=new CustomerOrder(req.body);
    let isregister
    isregister= await customer.save().then((err,res)=>{
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
});

router.post("/order-details" ,async (req,res)=>{
    console.log("Request Received")
    let customer=new CustomerOrderDetails(req.body);
    let isregister
    isregister= await customer.save().then((err,res)=>{
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
});

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
// router.delete("/:id",(req,res)=>{
//     Shipper.findByIdAndDelete(req.params.id,(err,docs)=>
//     {
//         if(!err)
//         {
//             res.send(docs)
//         }
//         else
//         {
//             console.log('Error in deleting shipper : ' + JSON.stringify(err,undefined,2));
//         }
//     })
// })

export default router;