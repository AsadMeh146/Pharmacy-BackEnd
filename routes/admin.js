import express from "express";
import user from "../modals/User.js";
import { isValidObjectId } from "mongoose";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload-files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extenArr = file.originalname.split(".");
    let exten = extenArr[extenArr.length - 1];
    cb(null, `${file.fieldname} - ${uniqueSuffix}.${exten}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("image"), async (req, res) => {
  const file = req.files;
  console.log(file);
  let img;
  img = file[0].filename;
  var admin = new user({
    Name: req.body.Name,
    PIN: req.body.PIN,
    CNIC: req.body.CNIC,
    Gender: req.body.Gender,
    Salary: req.body.Salary,
    Designation: req.body.Designation,
    DateOfBirth: req.body.DateOfBirth,
    Address: req.body.Address,
    PharmacyId: req.body.PharmacyId,
    Status: req.body.Status,
    Image: img,
    HireDate: req.body.HireDate,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
  }).save((err, doc) => {
    if (!err) {
      console.log("details saved");
      res.send(doc);
    } else {
      console.log("details not saved" + JSON.stringify(err, undefined, 2));
      res.json({ message: "error occured", error: err });
    }
  });
});

router.put("/:id", async (req, res) => {
  var admin = {
    Name: req.body.Name,
    CNIC: req.body.CNIC,
    Salary: req.body.Salary,
    Designation: req.body.Designation,
    DateOfBirth: req.body.DateOfBirth,
    Address: req.body.Address,
    PharmacyId: req.body.PharmacyId,
    Status: req.body.Status,
    HireDate: req.body.HireDate,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
  };
  user.findByIdAndUpdate(
    req.params.id,
    { $set: admin },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
        console.log(
          "Error in updating pharmacy Data:" + JSON.stringify(err, undefined, 2)
        );
      } else {
        res.send(data);
        console.log("Data update successfully ");
      }
    }
  );
});

router.delete("/:id", async (req, res) => {
  user.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      console.log("successfully deleted");
      res.send(docs);
    } else {
      console.log(
        "Error in deleting product : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/", async (req, res) => {
  user
    .aggregate([
      {
        $lookup: {
          from: "lookups",
          localField: "Designation",
          foreignField: "_id",
          as: "Designation",
        },
      },
      {
        $unwind: "$Designation",
      },
      {
        $lookup: {
          from: "pharmacydetails",
          localField: "PharmacyId",
          foreignField: "_id",
          as: "Pharmacy",
        },
      },
      {
        $unwind: "$Pharmacy",
      },
      {
        $lookup: {
          from: "lookups",
          localField: "Status",
          foreignField: "_id",
          as: "Status",
        },
      },
      {
        $unwind: "$Status",
      },
    ])

    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/:Name", async (req, res) => {
  user.find({ Name }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default router;
