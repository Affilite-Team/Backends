require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) return res.sendStatus(403);
      req.user = decodedToken.userInfo.userName;
      req.role = decodedToken.userInfo.role;
      next();
    });
  } else {
    return res.status(403).json({
      msg: "Aunthorised access denied",
    });
  }
};
module.exports = verifyJwt;
