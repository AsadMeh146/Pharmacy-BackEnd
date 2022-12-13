import mongoose from "mongoose";

const CustomerSchema=new mongoose.Schema({

    Name:String,
    ContactNumber:String,
});
export default mongoose.model("CustomerInfo",CustomerSchema);
