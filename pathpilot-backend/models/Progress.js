const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  status: { type: String, enum: ['not-started','in-progress','completed'], default: 'not-started' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', progressSchema);
