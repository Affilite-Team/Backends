require("dotenv").config();
const express = require("express");
const PORT = 3003;
const app = express();
const mongoose = require("mongoose");
const DBconnect = require("./config/Mongodb");
const cors = require("cors");

DBconnect();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors(require("./config/corsOptions")));

app.get("/", (req, res) => {
  res.send("Welcome to Affiliate Marketing");
});

app.use("/api/v1/auth", require("./routes/Auth"));
app.use("/api/v1/users", require("./routes/User"));
mongoose.connection.once("open", () => {
  console.log("database connected successfully");
  app.listen(PORT, () => console.log("listening on port " + PORT));
});
