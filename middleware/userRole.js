const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const validateUser = (req, res, next) => {
  if (req.role === "superAdmin") {
    next();
  }
  return res.json({
    msg: ReasonPhrases.UNAUTHORIZED,
    status: StatusCodes.FORBIDDEN,
    reason: "you must be a super admin",
  });
};

module.exports = validateUser;
