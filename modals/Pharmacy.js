import mongoose from "mongoose";

const PharmacySchema=new mongoose.Schema({
    // Id:Number,
    Location:String,
    ContactNumber:String,
});
export default mongoose.model("Pharmacy",PharmacySchema);
