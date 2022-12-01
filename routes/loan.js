import express from "express";
import user from "../modals/User.js";
import { isValidObjectId } from "mongoose";
import EmployeeLoan from "../modals/EmployeeLoan.js";

const router = express.Router()
router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let loan=new EmployeeLoan(req.body);
    let isLoanAdd
    isLoanAdd= await loan.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Details not added")
            return false
        }
        else{
            console.log("Applied successfully")
            return true
        }

    })
    console.log("Done")
    res.send(isLoanAdd)
    
})
router.put("/:id" ,(req,res)=>{
  var loanF = {

    loanstatus:req.body.loanstatus,
  }
  EmployeeLoan.findByIdAndUpdate(req.params.id, {$set: loanF},{new:true},(err,docs)=>{
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
router.get("/" ,async (req,res)=>{
    EmployeeLoan.aggregate([
        {
          $lookup: {
            from: "lookups",
            localField: "loanstatus",
            foreignField: "_id",
            as: "loanRequests"
          }
        },
        {
          $unwind: "$loanRequests"
        }
      ])
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });

})


export default router;