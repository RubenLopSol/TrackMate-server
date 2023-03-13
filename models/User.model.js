const { Schema, model, trusted } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true, 
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "Name is required."],
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    avatar: {
      type: String,
      default: " ",
    },
    myPackages:
      [{ type: Schema.Types.ObjectId, ref: "Package" }]
    ,

    isTransporter: {
      type: Boolean,
      default: false,
    },
    driverLicense: {
      type: String,
      unique: true,
      license: {
        type: String,
        enum: ["B1", "B", "C1"]

      },
      image: {
        type: String,
      }
    },
    licensePlate: {
      type: String,
    },

    transportedPackages: [{ type: Schema.Types.ObjectId, ref: "Package" }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
