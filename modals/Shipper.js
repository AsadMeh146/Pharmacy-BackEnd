import mongoose from "mongoose";

const shipperSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    manufacturerId:{
        type: mongoose.Schema.Types.ObjectId,ref:'ManufacturerDetail'
    },
    contact:String,
});
export default mongoose.model("ShipperDetail",shipperSchema);