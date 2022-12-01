import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    email:String,
    Purpose:String,
    AmountRequested:Number,
    ApplyDate:String,
    loanstatus:{
        type: mongoose.Schema.Types.ObjectId,ref:'Lookup'
    },
   
    
});
export default mongoose.model("EmployeeLoan",employeeSchema);




