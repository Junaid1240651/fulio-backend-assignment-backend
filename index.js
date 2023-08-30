const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

app.use(cors());
const ChartData = require("./mongoDB/ChartData");
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"));

app.get("/", async (req, res) => {
  try {
    const {
      endYear,
      topics,
      sector,
      region,
      pest,
      source,
      // swot,
      country,
      // city,
      limit,
    } = req.query;

    let query = ChartData.find({});

    if (endYear) {
      query = query.where("end_year").equals(parseInt(endYear));
    }

    if (topics) {
      const topicsArray = topics.split(",");
      query = query.where("topic").in(topicsArray);
    }

    if (sector) {
      query = query.where("sector").equals(sector);
    }

    if (region) {
      query = query.where("region").equals(region);
    }

    if (pest) {
      query = query.where("pestle").equals(pest);
    }

    if (source) {
      query = query.where("source").equals(source);
    }

    // if (swot) {
    //   query = query.where("swot").equals(swot);
    // }

    if (country) {
      query = query.where("country").equals(country);
    }

    // if (city) {
    //   query = query.where("city").equals(city);
    // }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const result = await query.exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
});

app.listen(3000, () => {
  console.log("connected");
});
