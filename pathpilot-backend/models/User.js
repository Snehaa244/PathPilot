const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["student", "professional"],
  },

  education: String,

  experienceLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  interests: [String],
  currentSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  goal: String,
  selectedCareerPath: { type: mongoose.Schema.Types.ObjectId, ref: 'CareerPath' },
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
});

// FIXED PRE-SAVE
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
