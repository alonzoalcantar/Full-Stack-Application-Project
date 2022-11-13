const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["Marriott", "Hyatt", "Hilton", "Wyndham"] },
    serviceSchedule: {
      type: String,
      enum: ["Daily", "Weekly", "Upon Request", "No Service"],
    },
    lengthOfStay: { type: Number, min: 1, max: 99, default: 7 },
    reviews: [reviewSchema],
    room: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);
