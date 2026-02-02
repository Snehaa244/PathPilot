const User = require("../models/User.model");

/**
 * GET /api/user/me
 * Get logged-in user profile
 */
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /api/user/me
 * Update profile
 */
const updateMyProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    ).select("-password -refreshToken");

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
