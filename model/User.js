const mongoose = require("mongoose");
const validator = require("validator");
const shortId = require("shortid");
const referals = shortId.generate();
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value) {
          if (!validator.isEmail(value)) {
            return false;
          } else {
            return true;
          }
        },
        message: "Please enter a valid email address",
      },
    },
    referalId: {
      type: String,
      unique: true,
      default: `register?Affiliate?referrer=${referals}`,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      validate: {
        validator(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return false;
          } else {
            return true;
          }
        },
        message: "Password must contain at least one letter and one number",
      },
    },
    userRole: {
      type: String,
      enum: ["user", "admin", "super"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
