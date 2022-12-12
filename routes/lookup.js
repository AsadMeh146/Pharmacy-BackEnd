import express from "express";
import Lookup from "../modals/lookup.js"

const router = express.Router()


router.get("/admin-designation" , (req , res)=>{
    Lookup.find({Category:"EMPLOYEE_DESIGNATION"} , (err , data)=>{
        if (err){res.send(err)}
        else{
            res.send(data);
            console.log(data)
            console.log("Done")
        }
    }
    )
})

router.get("/admin-status" , (req , res)=>{
    Lookup.find({Category:"EMPLOYEE_STATUS"} , (err , data)=>{
        if (err){res.send(err)}
        else{
            res.send(data);
            console.log(data)
            console.log("Done")
        }
    }
    )
})
router.get("/status-loan" , (req , res)=>{
    Lookup.find({Category:"LoanStatus"} , (err , data)=>{
        if (err){res.send(err)}
        else{
            res.send(data);
            console.log(data)
            console.log("Done")
        }
    }
    )
})
router.get("/" ,async(req,res)=>{
    Lookup.find({Category:"PRODUCT_CATEGORY"} ,(err,docs)=>
    {
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log("Error in retrieving Category : " + JSON.stringify(err,undefined,2));
        }
    })

})

router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let category=new Lookup(req.body);
    let isregister
    isregister= await category.save().then((err,res)=>{
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
    console.log(isregister)

})


export default router;

