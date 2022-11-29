import mongoose from "mongoose";

const stockOrderSchema=new mongoose.Schema({
    name:String,
    category:{
        type: mongoose.Schema.Types.ObjectId,ref:'Lookup'
    },
    purchasePrice:String,
    salePrice:String,
    description:String,
    manufacturerName:String,
    manufacturingDate:String,
    expiryDate:String,
    pharmacyId:{
        type: mongoose.Schema.Types.ObjectId,ref:'PharmacyDetail'
    }
});
export default mongoose.model("StockOrderDetail",stockOrderSchema);