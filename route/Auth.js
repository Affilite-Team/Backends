const express = require("express");
const app = express.Router();

app.route("/").post(async (req, res) => {
  res.json("welcome");
});
module.exports = app;
