import express from "express";
import user from "../modals/User.js";
import { isValidObjectId } from "mongoose";
import multer from 'multer';
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload-files');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      let extenArr = file.originalname.split(".");
      let exten = extenArr[extenArr.length - 1];
      cb(null, `${file.fieldname} - ${uniqueSuffix}.${exten}`);
    },
})

const upload = multer({ storage: storage })

router.post('/',upload.array('image'),async(req,res)=>{
    const file = req.files
    console.log(file)
    let img;
    img = file[0].filename
        var admin = new user({
        Name:req.body.Name,
        PIN:req.body.PIN,
        CNIC:req.body.CNIC,
        Gender:req.body.Gender,
        Salary:req.body.Salary,
        Designation:req.body.Designation,
        DateOfBirth:req.body.DateOfBirth,
        Address:req.body.Address,
        PharmacyId:req.body.PharmacyId,
        Status:req.body.Status,
        Image:img,
        HireDate:req.body.HireDate,
        Email:req.body.Email,
        ContactNumber:req.body.ContactNumber,
     })  
    .save((err,doc)=>{
        if(!err){
            console.log("details saved");
            res.send(doc);
        }
        else{
            console.log("details not saved" + JSON.stringify(err,undefined,2));
            res.json({message:'error occured',error: err})
        }
    })
})

router.get("/" ,async(req , res)=>{

    user.find({}).then((user) => {
        res.send(user)
        console.log(user)
    })
    

})

// router.post("/" ,async (req,res)=>{
//     console.log("Request Received")
//     let admin=new user(req.body);
//     let isAdminAdd
//     isAdminAdd= await admin.save().then((err,res)=>{
//         if(err.body)
//         {
//             console.log("Admin details not added")
//             return false
//         }
//         else{
//             console.log("Added successfully")
//             return true
//         }

//     })
//     console.log("Done")
//     res.send(isAdminAdd)
    
// })



router.get("/:Name" ,async(req , res)=>{
    user.find({Name},(err , data)=>{
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

export default router;