const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  level: {
    type: String,
    enum: ["basic", "intermediate", "advanced"],
  },
  resources: [{ type: String }],
});

module.exports = mongoose.model('Skill', skillSchema);
