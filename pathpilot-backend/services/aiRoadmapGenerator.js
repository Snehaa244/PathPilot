const OpenAI = require("openai");
const CareerPath = require("../models/CareerPath");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAIRoadmap = async (user) => {
  const careerPath = await CareerPath.findOne({
    interests: { $in: user.interests },
    difficulty: user.experienceLevel,
  }).populate("skillsRequired");

  if (!careerPath) {
    throw new Error("No suitable career path found");
  }

  const skillNames = careerPath.skillsRequired.map((s) => s.name).join(", ");

  const prompt = `
You are an expert career mentor.

User profile:
- Experience level: ${user.experienceLevel}
- Goal: ${user.goal}
- Interests: ${user.interests.join(", ")}

Career Path: ${careerPath.title}

Skills to cover:
${skillNames}

Generate a weekly learning roadmap.
Rules:
- Beginner = fewer skills per week
- Include milestones
- Output STRICT JSON only

JSON format:
{
  "weeks": [
    {
      "week": 1,
      "milestone": "Foundations",
      "skills": ["HTML", "CSS"]
    }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  const roadmapJSON = JSON.parse(response.choices[0].message.content);

  return {
    careerPath,
    weeks: roadmapJSON.weeks,
  };
};

module.exports = generateAIRoadmap;
