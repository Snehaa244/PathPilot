const User = require("../models/User.models");
const generateRoadmapForUser = require("../services/roadmapGenerator");

const createMyRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user.onboardingCompleted) {
      return res.status(400).json({ message: "Complete onboarding first" });
    }

    const roadmap = await generateRoadmapForUser(user);

    user.selectedCareerPath = roadmap.careerPath;
    await user.save();

    res.json({
      message: "AI Roadmap generated successfully",
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMyRoadmap,
};
