import mongoose from "mongoose";

const stockSchema=new mongoose.Schema({
    name:String,
    category:{
        type: mongoose.Schema.Types.ObjectId,ref:'Lookup'
    },
    strength:String,
    description:String,
    manufacturerName:String,
    strength:String,
    pharmacyId:{
        type: mongoose.Schema.Types.ObjectId,ref:'PharmacyDetail'
    }
});
export default mongoose.model("Stock",stockSchema);