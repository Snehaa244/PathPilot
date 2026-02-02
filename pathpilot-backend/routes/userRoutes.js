const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");

const router = express.Router();

// Protected routes
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

module.exports = router;
