const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  skillTitle: { type: String, required: true },
  partnerName: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);