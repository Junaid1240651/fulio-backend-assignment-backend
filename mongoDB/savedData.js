const mongoose = require("mongoose");
const social = new mongoose.Schema({
  websideLink: { type: String },
  linkeinLink: { type: String },
});
const savedData = new mongoose.Schema({
  websideName: { type: String },
  socialLink: [social],
  email: { type: String },
  contact: { type: String },
});
module.exports = mongoose.model("savedData", savedData);
