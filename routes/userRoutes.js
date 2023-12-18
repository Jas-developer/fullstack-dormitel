const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/useController");
const { protect } = require("../middleware/authHandler");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/current", protect, currentUser);
module.exports = router;
