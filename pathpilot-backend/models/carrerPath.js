const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String },
  estimatedTime: { type: String },
  skillsRequired: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
});

module.exports = mongoose.model('CareerPath', careerPathSchema);
