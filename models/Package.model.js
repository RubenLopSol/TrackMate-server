const { Schema, model } = require("mongoose");

const packageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,

    },
    creator: {
      type: Schema.Types.ObjectId, ref: "User",
    },
    description: String,
    address: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    coordinates: {
      lat: {type: Number},
      lng: {type: Number}
    },
    isTransported: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In delivery", "Delivered"]
    }
  },
  {
    timestamps: true,
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;