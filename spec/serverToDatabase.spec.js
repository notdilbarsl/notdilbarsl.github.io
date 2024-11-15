/**
 * @jest-environment node
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/index.js'); // Path to your server file
const Score = require('../server/models/score.js');

describe('Server to Database Integration', () => {
  beforeAll(async () => {
    const mongoURI = 'mongodb+srv://notdilbarsl:Rise1.618@gridrunner.onl43.mongodb.net/gridrunner_test?retryWrites=true&w=majority&appName=GridRunner';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  }, 100000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 100000);

  it('should save a new score to the database and return the saved score', async () => {
    const scoreData = {
      playerName: 'testUser',
      gridSize: '6x6',
      mineCount: 10,
      tries: 1000,
    };

    const response = await request(app)
      .post('/submit-score')
      .send(scoreData)
      .expect(200);

    // Check if the response contains the success message
    expect(response.body.message).toBe('Score submitted successfully!');

    // Verify if the score was saved correctly in the database
    const savedScore = await Score.findOne({ playerName: 'testUser', gridSize: '6x6', mineCount: 10 });
    expect(savedScore).not.toBeNull();
    expect(savedScore.playerName).toBe('testUser');
    expect(savedScore.gridSize).toBe('6x6');
    expect(savedScore.mineCount).toBe(10);
    expect(savedScore.tries).toBe(1000);
  }, 100000);
});
