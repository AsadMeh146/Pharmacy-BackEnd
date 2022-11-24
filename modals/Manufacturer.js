import mongoose from "mongoose";

const manufacturerSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    contact:String,
});
export default mongoose.model("ManufacturerDetail",manufacturerSchema);