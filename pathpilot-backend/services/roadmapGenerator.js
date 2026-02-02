const CareerPath = require("../models/CareerPath");
const Roadmap = require("../models/Roadmap");

/* ===== HELPERS ===== */

const getSkillsPerWeek = (experienceLevel) => {
  if (experienceLevel === "beginner") return 2;
  if (experienceLevel === "intermediate") return 3;
  if (experienceLevel === "advanced") return 5;
  return 3;
};

const getMilestone = (weekNumber) => {
  if (weekNumber <= 2) return "Foundations";
  if (weekNumber <= 5) return "Core Skills";
  if (weekNumber <= 7) return "Projects";
  return "Advanced & Interview Prep";
};

/* ===== MAIN GENERATOR ===== */

const generateRoadmapForUser = async (user) => {
  //  Match career path
  const careerPath = await CareerPath.findOne({
    interests: { $in: user.interests },
    difficulty: user.experienceLevel,
  }).populate("skillsRequired");

  if (!careerPath) {
    throw new Error("No suitable career path found");
  }

  //  Remove already known skills
  const userSkillIds = user.currentSkills.map((id) => id.toString());

  const filteredSkills = careerPath.skillsRequired.filter(
    (skill) => !userSkillIds.includes(skill._id.toString())
  );

  //  Difficulty-based pacing
  const skillsPerWeek = getSkillsPerWeek(user.experienceLevel);
  const weeks = [];

  //  Split into weeks + milestones
  for (let i = 0; i < filteredSkills.length; i += skillsPerWeek) {
    const weekNumber = weeks.length + 1;

    weeks.push({
      week: weekNumber,
      milestone: getMilestone(weekNumber),
      title: `Week ${weekNumber}`,
      skills: filteredSkills.slice(i, i + skillsPerWeek),
    });
  }

  //  Save roadmap
  const roadmap = await Roadmap.create({
    user: user._id,
    careerPath: careerPath._id,
    weeks,
  });

  return roadmap;
};

module.exports = generateRoadmapForUser;
