const mongoose = require('mongoose');

// Define the schema for scores
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

// Create the model using the schema
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
