const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  const isExist = await userModel.findOne({ userName: userName }).exec();
  const userID = isExist._id.toString();
  if (!isExist) {
    return res.json({ msg: "Invalid credentials", code: 401 });
  }

  // check if the password is correct
  if (!bcrypt.compare(password, isExist.password)) {
    return res.status(403).json({ msg: "Password does not match" });
  }

  // Generate Jwt token
  const acceToken = jwt.sign(
    {
      userInfo: {
        userName: isExist.userName,
        role: isExist.userRole,
      },
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "60s" }
  );

  const refreshToken = jwt.sign(
    {
      userName: isExist.userName,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "1d" }
  );

  // storing the refresh token in database
  isExist.refreshToken = refreshToken;
  await isExist.save();

  // // create a secure cookie to store the refresh token on the web
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    code: 200,
    msg: "logged in successfully",
    id: isExist.id,
    email: isExist.email,
    userName: isExist.userName,
    firstName: isExist.firstName,
    lastName: isExist.lastName,
    referalCode: isExist.referalId,
    accessToken: acceToken,
  });
};
