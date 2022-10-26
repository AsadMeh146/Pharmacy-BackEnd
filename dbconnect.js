import mongoose from "mongoose";
const connection_url = "mongodb+srv://AzeemaSiddique:AzeemaSiddique@cluster0.odj1yil.mongodb.net/Test";

mongoose.connect(connection_url,(err)=>{
    if(err){
        console.log("Failed to Connect to database. Error: " + err.body);
    }
    else{
        console.log("Successfully connected to the Database!");
    }
});

export default mongoose;

