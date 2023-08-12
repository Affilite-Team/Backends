const express = require("express");
const app = express.Router();
const Auth = require("../controller/Auth");

app.post("/login", Auth.login);
module.exports = app;
