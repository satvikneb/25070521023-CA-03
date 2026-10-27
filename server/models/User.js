const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'Passionate student eager to learn and teach!' },
  coins: { type: Number, default: 50 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);