const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  education: { type: String },
  experienceLevel: { type: String },
  interests: [{ type: String }],       // array of strings
  currentSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  goal: { type: String },
  selectedCareerPath: { type: mongoose.Schema.Types.ObjectId, ref: 'CareerPath' },
  createdAt: { type: Date, default: Date.now },
  refreshToken: {
  type: String,
}

});

module.exports = mongoose.model('User', userSchema);
