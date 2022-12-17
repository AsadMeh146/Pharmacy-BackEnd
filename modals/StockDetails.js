import mongoose from "mongoose";

const stockDetailsSchema=new mongoose.Schema({
    stockId:{
        type: mongoose.Schema.Types.ObjectId,ref:'Stock'
    },
    purchasePrice:Number,
    salePrice:Number,
    manufacturingDate:Date,
    expiryDate:Date,
});
export default mongoose.model("StockDetail",stockDetailSchema);