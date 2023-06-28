import express from "express";
import { isValidObjectId } from "mongoose";
import Stock from "../modals/Stock.js";
import StockDetail from "../modals/StockDetails.js";
import StockOrder from "../modals/StockOrder.js";
import StockOrderDetails from "../modals/StockOrderDetails.js";

const router = express.Router()
// have to add pharmacy Id dynamically
//to show stock 
router.get("/:id" ,async(req,res)=>{
    Stock.aggregate([
        {
          $lookup: {
            from: "lookups",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: "$category"
        },
        { $match: { $expr : { $eq: [ '$pharmacyId' , { $toObjectId: req.params.id } ] } } }
        ,
      ])
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
})

//to show stock order details

router.get("/show/:orderId" ,async(req,res)=>{
    const orderId = req.params.orderId;
    StockOrder.aggregate([
        {
          $lookup: {
            from: "manufacturerdetails",
            localField: "manufacturerId",
            foreignField: "_id",
            as: "ManufacturerDetail"
          }
        },
        {
          $unwind: "$ManufacturerDetail"
        },
        {
            $lookup: {
              from: "shipperdetails",
              localField: "shipperId",
              foreignField: "_id",
              as: "ShipperDetail"
            }
          },
          {
            $unwind: "$ShipperDetail"
          },
          {
            $lookup: {
              from: "pharmacydetails",
              localField: "pharmacyId",
              foreignField: "_id",
              as: "PharmacyDetail"
            }
          },
          {
            $unwind: "$PharmacyDetail"
          },
          {
            $lookup: {
              from: "stockorderdetails",
              localField: "orderId",
              foreignField: "stockOrderId",
              as: "products"
            }
          },
          {
            $unwind: "$products"
          },
          {
            $lookup: {
              from: "stocks",
              localField: "products.productId",
              foreignField: "_id",
              as: "product_details"
            }
          },
          {
            $unwind: "$product_details"
          },
          {
            $lookup: {
              from: "lookups",
              localField: "product_details.category",
              foreignField: "_id",
              as: "product_category"
            }
          },
          {
            $unwind: "$product_category"
          },                   
        { $match: { $expr : { $eq: [ '$orderId' , orderId  ] } } }
        ,
        { $match: { $expr : { $eq: [ '$shipDate' , null  ] } } }
    ])
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.send(error);
        });
})
// to add stock
router.post("/" ,async (req,res)=>{
    console.log("Request Received")
    let stock=new Stock(req.body);
    let isregister
    isregister= await stock.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Failed")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    res.send(isregister)
});
//to add stock details
router.post("/order-details" ,async (req,res)=>{
  console.log("Request Received")
  let stockOrder=new StockDetail(req.body);
  let isregister
  isregister= await stockOrder.save().then((err,res)=>{
      if(err.body)
      {
          console.log("Failed")
          return false
      }
      else{
          console.log("Added successfully")
          return true
      }

  })
  res.send(isregister)
});

// to update the stock

router.put("/:id" ,async(req,res)=>{
        var product = {
            name:req.body.name,
            category:req.body.categoryId,
            strength:req.body.strength,
            description:req.body.description,
            manufacturerName:req.body.manufacturerName
            // pharmacyId:req.body.pharmacyId
        }
        Stock.findByIdAndUpdate(req.params.id, {$set: product},{new:true},(err,docs)=>{
            if(!err)
            {
                res.send(docs);
            }
            else
            {
                console.log('Error in updating product : ' + JSON.stringify(err,undefined,2));
            }
        });  
});


//to delete stock 
router.delete("/:id",async(req,res)=>{
    Stock.findByIdAndDelete(req.params.id,(err,docs)=>
    {
        if(!err)
        {
            res.send(docs)
        }
        else
        {
            console.log('Error in deleting product : ' + JSON.stringify(err,undefined,2));
        }
    })
    
});

// to update stock details

router.put("/update-quantity/:id" ,async(req,res)=>{
  var product = {
      quantity:req.body.quantity
      // pharmacyId:req.body.pharmacyId
  }
  StockDetail.findByIdAndUpdate(req.params.id, {$set: product},{new:true},(err,docs)=>{
      if(!err)
      {
          res.send(docs);
      }
      else
      {
          console.log('Error in updating product : ' + JSON.stringify(err,undefined,2));
      }
  });  
});

//to delete stock details

router.delete("/stock-detail/:id",async(req,res)=>{
  StockDetail.findByIdAndDelete(req.params.id,(err,docs)=>
  {
      if(!err)
      {
          res.send(docs)
      }
      else
      {
          console.log('Error in deleting product : ' + JSON.stringify(err,undefined,2));
      }
  })
  
});

// to add stock order
router.post("/ordered" ,async (req,res)=>{
    console.log("Request Received")
    let stockOrder=new StockOrder(req.body);
    let isregister
    isregister= await stockOrder.save().then((err,res)=>{
        if(err.body)
        {
            console.log("Failed")
            return false
        }
        else{
            console.log("Added successfully")
            return true
        }

    })
    res.send(isregister)
});
// to add stock order details

router.post("/stockorder-details" ,async (req,res)=>{
  console.log("Request Received")
  let stockOrder=new StockOrderDetails(req.body);
  let isregister
  isregister= await stockOrder.save().then((err,res)=>{
      if(err.body)
      {
          console.log("Failed")
          return false
      }
      else{
          console.log("Added successfully")
          return true
      }

  })
  res.send(isregister)
});

//to update stock order ship date

router.put("/update/:orderId" ,async(req,res)=>{
  console.log(req.params.orderId + " " + req.body.shipDate)
  var myquery = {     orderId:req.params.orderId };
  const shipDate = { shipDate:req.body.shipDate } ;
  StockOrder.findByIdAndUpdate(req.params.orderId, {$set: shipDate},{new:true},(err,docs)=>{
    if(!err)
    {
        res.send(docs);
    }
    else
    {
        console.log('Error in updating product : ' + JSON.stringify(err,undefined,2));
    }
});  
});





export default router;