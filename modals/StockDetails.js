import mongoose from "mongoose";

const stockDetailsSchema=new mongoose.Schema({
    stockId:{
        type: mongoose.Schema.Types.ObjectId,ref:'Stock'
    },
    manufacturerDate:Date,
    expiryDate:Date,
    unitPrice:Number,
    salePrice:Number,
    quantity:Number
 
});
export default mongoose.model("StockDetail",stockDetailsSchema);