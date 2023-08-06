require("dotenv").config();
const express = require("express");
const PORT = 3003;
const app = express();
const mongoose = require("mongoose");
const DBconnection = require("./config/Mongodb");

app.get("/", (req, res) => {
  res.send("Welcome to Affiliate Marketing");
});

DBconnection();
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));

app.use("/api/v1/register", require("./route/User"));
app.use("/api/v1/login", require("./route/Auth"));

mongoose.connection.once("open", function () {
  console.log("connected to mongodb");
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
