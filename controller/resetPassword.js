const crypto = require("crypto");
const userModel = require("../model/User");
exports.resetPassword = async (req, res) => {
  try {
    const token = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const User = await userModel.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() }, // this is to check if the token has not or has expired
    });

    if (!User) {
      res.json({
        msg: "Token is invalid or has expired",
        status: "invalid",
        code: 400,
      });
    }

    User.password = req.body.password;
    User.passwordResetToken = undefined;
    User.passwordResetTokenExpire = undefined;

    await User.save();
    res.json({
      msg: "password changed successfully",
      status: "success",
      code: 200,
      data: User,
    });
  } catch (error) {
    console.log(error);
  }
};
