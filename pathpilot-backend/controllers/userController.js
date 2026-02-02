const User = require("../models/User.model");



/**
 * Complete user onboarding
 */
const completeOnboarding = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      role,
      education,
      experienceLevel,
      interests,
      goal,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        role,
        education,
        experienceLevel,
        interests,
        goal,
        onboardingCompleted: true,
      },
      { new: true }
    );

    res.json({
      message: "Onboarding completed successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.userId)
    .select("-password -refreshToken")
    .populate("currentSkills")
    .populate("selectedCareerPath");

  res.json(user);
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
  completeOnboarding
};
