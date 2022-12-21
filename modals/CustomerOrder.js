import mongoose from "mongoose";

const CustomerSchema=new mongoose.Schema({
    orderId:String,
    name:String,
    contact:String,
    pharmacyId:{
        type: mongoose.Schema.Types.ObjectId,ref:'PharmacyDetail'
    }
});
export default mongoose.model("CustomerOrder",CustomerSchema);
