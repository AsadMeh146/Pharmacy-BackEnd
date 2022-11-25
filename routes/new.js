import express from "express";
import User from "../modals/User.js"

const router = express.Router()


router.get("/:email/:password" , (req , res)=>{
    console.log("qwerty")
})

export default router;