// middleware/verifyJwt.js
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ msg: "Unauthorized: Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized: Token not present in Authorization header" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ msg: "Forbidden: Invalid or expired token" });
    }
    req.user = decodedToken.userInfo.userName;
    req.role = decodedToken.userInfo.role;
    req.id = decodedToken.id;
    next();
  });
};

module.exports = verifyJwt;
