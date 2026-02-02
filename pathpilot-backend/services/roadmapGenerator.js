const CareerPath = require("../models/CareerPath");
const Roadmap = require("../models/Roadmap");

const generateRoadmapForUser = async (user) => {
  //  Match career path based on interest + experience
  const careerPath = await CareerPath.findOne({
    interests: { $in: user.interests },
    difficulty: user.experienceLevel,
  }).populate("skillsRequired");

  if (!careerPath) {
    throw new Error("No suitable career path found");
  }

  //  Split skills into weeks
  const skillsPerWeek = 3;
  const weeks = [];

  for (let i = 0; i < careerPath.skillsRequired.length; i += skillsPerWeek) {
    weeks.push({
      week: weeks.length + 1,
      title: `Week ${weeks.length + 1}`,
      skills: careerPath.skillsRequired.slice(i, i + skillsPerWeek),
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
