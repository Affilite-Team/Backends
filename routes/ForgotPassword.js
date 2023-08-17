const express = require("express");
const route = express.Router();
const forgottenPassword = require("../controller/ForgotPassword");

route.post("/", forgottenPassword.forgotPassword);
module.exports = route;
