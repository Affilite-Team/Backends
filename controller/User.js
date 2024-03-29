const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const isExist = await userModel.findOne({ email: req.body.email }).exec();
    if (isExist) {
      return res.status(400).json({
        message: "BAD REQUEST",
        reason: "Email must be unique",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const User = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      referalId: req.body.referalId,
      email: req.body.email,
      password: hashedPassword,
    });

    if (!User) {
      return res.json({ msg: "invalid fields" });
    }
    const newUser = await User.save();
    res.json({
      msg: "success",
      code: 200,
      // data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: error.status,
      message: error.message,
      data: [],
    });
  }
};

exports.getUsers = async (req, res) => {
  const user = await userModel.find().exec();
  if (!user) {
    return res.json({ msg: "user not found", code: 404 });
  }

  res.json({
    msg: "success",
    code: 200,
    data: user,
  });
};

exports.deleteUser = async (req, res) => {
  const user = await userModel.findOneAndDelete({ _id: req.params.id }).exec();
  if (!user) return res.json({ msg: "User not found", code: 404 });

  res.json({
    msg: "user deleted successfully",
    code: 200,
    data: user,
  });
};

exports.editUser = async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!user) return res.json({ msg: "user not found", code: 404 });

  res.json({
    msg: "user uppdated successfully",
    code: 200,
    data: user,
  });
};

exports.getSingleUser = async (req, res) => {
  const user = await userModel
    .findOne(
      { userName: req.user },
      "-password -createdAt -updatedAt -userRole -_id"
    )
    .exec();
  if (!user) {
    return res.json({
      msg: "User not found",
      code: 404,
    });
  }
  res.json({
    msg: "success",
    code: 200,
    data: user,
  });
};
