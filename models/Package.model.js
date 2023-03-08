const { Schema, model } = require("mongoose");

const packageSchema = new Schema(
  {
   title: {
    type: String,
    required: true,
 
   },
   creator: {
    type: Schema.Types.ObjectId, ref: "user"
   },
   description: String,
   adress: {
    type: String,
    required: true,
   },
   filepath: {
    type: String,
   }
  },
  {
    timestamps: true,
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;