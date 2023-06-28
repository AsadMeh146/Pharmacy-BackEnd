import mongoose from "mongoose";

const PharmacySchema=new mongoose.Schema({
    Location:String,
    ContactNumber:String,
});
export default mongoose.model("PharmacyDetail",PharmacySchema);
