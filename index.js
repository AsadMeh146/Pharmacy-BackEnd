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
import user from "./routes/admin.js"
import lookup from "./routes/lookup.js";
import employee from "./routes/employee.js"
import loan from "./routes/loan.js"
import admin from "./routes/admin.js"
import stock from "./routes/stock.js"

//App Config
const app = express();
const port = process.env.PORT || 8001;


//MiddleWares
app.use(express.json());
app.use(cors());
app.use("/upload-files",express.static("upload-files"))
//Routes
app.use("/signup",signUp)
app.use("/signin",signin)
app.use("/add-manufacturer",manufacturer)
app.use("/edit-manufacturer",manufacturer)
app.use("/add-shipper",shipper)
app.use("/edit-shipper",shipper)
app.use("/add-pharmacy",pharmacy)
app.use("/view-pharmacy",pharmacy)
app.use("/get-designation",lookup)
app.use("/get-status",lookup)
app.use("/get-loanstatus",lookup)
app.use("/admin",user)
app.use("/view-admin",admin)
app.use("/add-employee",employee)
app.use("/view-employee",employee)
app.use("/add-loan",loan)
app.use("/view-loanapp",loan)
app.use("/get-loan-status",lookup)
app.use("/add-category",lookup)
app.use("/get-product-category",lookup)
app.use("/add-product",stock)
app.use("/get-product",stock)
app.use("/edit-product",stock)



// Listener
app.listen(port , ()=>console.log(`LISTENING TO PORT ${port}`));



