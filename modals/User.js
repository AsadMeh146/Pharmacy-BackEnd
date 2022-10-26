import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    address:String,
    role:String,
    phone:String,
});
export default mongoose.model("user",userSchema);
