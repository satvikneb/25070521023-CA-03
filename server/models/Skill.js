const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Technology', 'Music & Arts', 'Languages', 'Fitness', 'Academics'] },
  type: { type: String, required: true, enum: ['Offering', 'Looking For'] },
  proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Intermediate' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);