import mongoose from "mongoose";

const lookupSchema=new mongoose.Schema({
    Name:String,
    Category:String,
});
export default mongoose.model("Lookup",lookupSchema);