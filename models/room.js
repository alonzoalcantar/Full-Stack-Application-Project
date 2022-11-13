const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    bedsize: String,
    roompackage: String,
    smoking: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
