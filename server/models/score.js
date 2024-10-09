const mongoose = require('mongoose');
const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  gridSize: {
    type: String,
    required: true
  },
  mineCount: {
    type: Number,
    required: true
  },
  tries: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
