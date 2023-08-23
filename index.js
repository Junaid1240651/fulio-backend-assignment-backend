const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
const InputNumberSchema = require("./mongoDB/inputNumberSchema");
const SavedData = require("./mongoDB/savedData");
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"));

app.post("/checkCompanyInfo", async function (req, res) {
  try {
    const inputWebLink = req.body.inputWebLink;
    const result = await SavedData.find({ websideName: inputWebLink }).exec();
    if (result.length > 0) {
      res.json(result);
    }  else {
      res.json("No Result Found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
app.post("/checkNumberValidation", async function (req, res) {
  try {
    const inputNumber = req.body.inputNumber;

    const isValid =
      /^(?:\+?1\s*-?)?(?:\(\d{3}\)|\d{3})(?:\s*[-.]?\s*)\d{3}(?:\s*[-.]?\s*)\d{4}$/.test(
        inputNumber
      );
    const responseMessage = isValid
      ? `The contact number ${inputNumber} is valid.`
      : `The contact number ${inputNumber} is invalid.`;

    res.send(responseMessage);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
// app.post("/save", async function (req, res) {
//   SavedData.create({
//     websideName: "https://ful.io",

//     socialLink: [
//       { websideLink: "https://www.facebook.com/fulioTech/" },
//       { linkeinLink: "https://www.linkedin.com/company/ful-io/" },
//     ],
//     email: "support@ful.io",
//     contact: "+1 343 303 6668",
//   });
//   res.status(201).json(SavedData);
// });

app.listen(3000, () => {
  console.log("connected");
});
