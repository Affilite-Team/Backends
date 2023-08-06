const express = require("express");
const app = express.Router();
const userModel = require("../model/User");
const bycrypt = require("bcrypt");

app.route("/").post(async (req, res) => {
  try {
    if (!req.body) {
      return res.json({ message: "field required", code: 404 });
    }

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.json({ msg: "user already exists", code: 400 });
    }

    const hashed_password = await bycrypt.hash(req.body.password, 10);

    const User = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      referalId: req.body.referalId,
      password: hashed_password,
    });

    if (!User) {
      return res.json({ msg: "Field required", code: 400 });
    }
    const newUser = await User.save();
    res.json({
      msg: "user created successfully",
      code: 201,
      data: newUser,
    });
  } catch (error) {
    return res.json(error.message);
  }
});

app.route("/").get(async (req, res) => {
  const user = await userModel.find().exec();
  if (!user) {
    return res.json({ msg: "user not found", code: 404, data: null });
  }
  res.json({
    msg: "all users found",
    code: 200,
    data: user,
  });
});

app
  .route("/:id")
  .delete(async (req, res) => {
    const selectedUser = await userModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!selectedUser) {
      return res.json({ msg: "user not found", code: 404 });
    }

    res.json({
      msg: "user deleted successfully",
      code: 200,
      data: selectedUser,
    });
  })
  .put(async (req, res) => {
    try {
      const user = await userModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.json({
        msg: "user update successful",
        code: 200,
        data: user,
      });
    } catch (error) {}
  })
  .get(async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res.json({ msg: "User not found", code: 404 });
    }

    res.json({
      msg: "user found successfully",
      code: 200,
      data: user,
    });
  });

module.exports = app;
