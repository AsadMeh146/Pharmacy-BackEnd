import express from "express";
import User from "../modals/User.js"

const router = express.Router()


router.get("/:email/:password" , (req , res)=>{
    const email = req.params.email;
    const password = req.params.password;
    console.log("ENTERED")
    User.find({Email:email ,PIN:password} , (err , data)=>{
        if (err){res.send(err)}
        else{
            res.send(data);
            console.log("Done")
        }
    }
    )
})




export default router;