const express = require("express");
const router = express.Router();
const resetController = require("../controller/resetPassword");
router.patch("/", resetController.resetPassword);
module.exports = router;
