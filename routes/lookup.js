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

export default router;

