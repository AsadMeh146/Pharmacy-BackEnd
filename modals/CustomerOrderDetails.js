import mongoose from "mongoose";

const CustomerSchema=new mongoose.Schema({
    orderId:String,
    productId:{
        type: mongoose.Schema.Types.ObjectId,ref:'Stock'
    },
    quantity:Number
});
export default mongoose.model("CustomerOrderDetails",CustomerSchema);
