import mongoose from "mongoose";

const stockSchema=new mongoose.Schema({
    name:String,
    category:{
        type: mongoose.Schema.Types.ObjectId,ref:'Lookup'
    },
    // purchasePrice:Number,
    // salePrice:Number,
    strength:String,
    description:String,
    manufacturerName:String,
    strength:String,
    // manufacturingDate:Date,
    // expiryDate:Date,
    pharmacyId:{
        type: mongoose.Schema.Types.ObjectId,ref:'PharmacyDetail'
    }
});
export default mongoose.model("Stock",stockSchema);