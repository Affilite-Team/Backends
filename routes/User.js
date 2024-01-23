const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/verifyjwt");
const userVerify = require("../middleware/userRole.js");
const {
  signup,
  getUsers,
  getSingleUser,
  deleteUser,
  editUser,
} = require("../controller/User");

router.post("/signup", signup);
router.get("/", getUsers);
router.get("/:id", verifyJwt, getSingleUser);
router.delete("/profile", verifyJwt, userVerify, deleteUser);
router.put("/:id", verifyJwt, editUser);
module.exports = router;
