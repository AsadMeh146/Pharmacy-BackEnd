import mongoose from "mongoose";

const stockOrderDetailsSchema=new mongoose.Schema({
    stockOrderId:String,
    productId:{
        type: mongoose.Schema.Types.ObjectId,ref:'Stock'
    },
    quantity:Number
    
});
export default mongoose.model("StockOrderDetail",stockOrderDetailsSchema);