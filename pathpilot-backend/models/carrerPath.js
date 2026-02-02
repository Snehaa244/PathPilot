const mongoose = require("mongoose");

const careerPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  

  estimatedTime: String, // e.g. "6 months"

  interests: [String], // used for matching

  skillsRequired: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],

  goals: {
  type: [String],
  enum: ["job", "internship", "switch"],
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CareerPath", careerPathSchema);
