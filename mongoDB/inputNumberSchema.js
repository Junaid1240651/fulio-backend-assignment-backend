const mongoose = require("mongoose");

const inputNumberSchema = new mongoose.Schema({
  inputNumberSchema: { type: Number },
});
module.exports = mongoose.model("inputNumberSchema", inputNumberSchema);
