import mongoose from "mongoose";

const manufacturerSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    phone:String,
});
export default mongoose.model("ManufacturerDetail",manufacturerSchema);