import mongoose from "mongoose";

const stockOrderSchema=new mongoose.Schema({
    orderId:String,
    manufacturerId:{
        type: mongoose.Schema.Types.ObjectId,ref:'ManufacturerDetail'
    },
    shipperId:{
        type: mongoose.Schema.Types.ObjectId,ref:'ShipperDetail'
    },
    productDetails:Object    
    ,
    orderDate:Date,
    shipDate:Date,
    pharmacyId:{
        type: mongoose.Schema.Types.ObjectId,ref:'PharmacyDetail'
    }
});
export default mongoose.model("StockOrder",stockOrderSchema);