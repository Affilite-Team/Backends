const express = require("express");
const PORT = 3003;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Affiliate Marketing");
});
app.listen(PORT, () => {
  console.log("Server Started On Port " + PORT);
});
