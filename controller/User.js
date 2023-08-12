const userModel = require("../model/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
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
    data: newUser,
  });
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
  const user = await userModel.findOne({ _id: req.params.id }).exec();
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
