const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/verifyjwt");
const {
  signup,
  getUsers,
  getSingleUser,
  deleteUser,
  editUser,
} = require("../controller/User");
const { verify } = require("jsonwebtoken");

router.post("/signup", signup);
router.get("/", verifyJwt, getUsers);
router.get("/:id", verifyJwt, getSingleUser);
router.delete("/:id", verifyJwt, deleteUser);
router.put("/:id", verifyJwt, editUser);
module.exports = router;
