import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    Name:String,
    PIN:String,
    CNIC:String,
    Gender:String,
    Salary:Number,
    Designation:{
        type: mongoose.Schema.Types.ObjectId,ref:'Lookup'
    },
    DateOfBirth:String,
    Address:String,
    PharmacyId:{
        type: mongoose.Schema.Types.ObjectId,ref:'PharmacyDetail'
    },
    Status:{
        type: mongoose.Schema.Types.ObjectId,ref:'Lookup'
    },

    Image:String,
    HireDate:String,
    Email:String,
    ContactNumber:Number,
});
export default mongoose.model("user",userSchema);




