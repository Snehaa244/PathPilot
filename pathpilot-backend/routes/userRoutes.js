const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getMyProfile,
  completeOnboarding,
  updateMyProfile,
} = require("../controllers/userController");

const router = express.Router();

// Protected routes
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.post("/onboarding", authMiddleware, completeOnboarding);
module.exports = router;
