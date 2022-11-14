import mongoose from "mongoose";

const shipperSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    manufacturerId:{
        type: Schema.Types.ObjectId,
        ref: 'ManufacturerDetail'
    },
    phone:String,
});
export default mongoose.model("ShipperDetail",shipperSchema);