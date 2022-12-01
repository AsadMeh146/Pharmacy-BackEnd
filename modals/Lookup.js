import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    Name:String,
    Category:String
});
export default mongoose.model("Lookup",userSchema);
