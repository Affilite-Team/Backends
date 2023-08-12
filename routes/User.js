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

router.post("/signup", signup);
router.get("/", verifyJwt, getUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);
module.exports = router;
