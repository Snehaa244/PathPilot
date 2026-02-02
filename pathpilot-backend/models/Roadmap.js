const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  careerPath: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CareerPath",
  },

  weeks: [
    {
      week: Number,
      title: String,
      skills: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
