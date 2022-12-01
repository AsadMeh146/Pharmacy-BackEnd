// Imports
import express from "express";
import cors from "cors";
import mongoose from './dbconnect.js'
import routes from "./routes/route.js"
import signUp from "./routes/signUp.js"
import signin from "./routes/signin.js"
import manufacturer from "./routes/manufacturer.js"
import shipper from "./routes/shipper.js"
import pharmacy from "./routes/pharmacy.js"

//App Config
const app = express();
const port = process.env.PORT || 8001;


//MiddleWares
app.use(express.json());
app.use(cors());

//Routes
app.use("/signup",signUp)
app.use("/signin",signin)
app.use("/add-manufacturer",manufacturer)
app.use("/edit-manufacturer",manufacturer)
app.use("/add-shipper",shipper)
app.use("/add-pharmacy",pharmacy)
app.use("/view-pharmacy",pharmacy)


// Listener
app.listen(port , ()=>console.log(`LISTENING TO PORT ${port}`));



