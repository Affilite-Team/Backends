const mongoose = require("mongoose");
const validator = require("validator");
const shortId = require("shortid");
const referals = shortId.generate();
const crypto = require("crypto");
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
      enum: ["marketer", "vendor", "superAdmin"],
      default: "marketer",
    },
    refreshToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createToken = function () {
  const resetToken = crypto.randomBytes(4).toString("hex"); // Convert buffer to hex
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000; // Added '+' for milliseconds
  return resetToken;
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
