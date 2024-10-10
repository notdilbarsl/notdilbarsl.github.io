const request = require('supertest');  // Supertest to simulate HTTP requests
const renderUrl = 'https://notdilbarsl-github-io.onrender.com';  // Replace with your Render backend URL

describe('Client to Server Integration', () => {
  it('should respond with leaderboard data when a GET request is made', async () => {
    const gridSize = '6x6';
    const mineCount = 5;

    const response = await request(renderUrl)
      .get(`/leaderboard?gridSize=${gridSize}&mineCount=${mineCount}`);
    
    expect(response.statusCode).toBe(200); // Check if status code is OK
    expect(Array.isArray(response.body)).toBe(true); // Ensure it returns an array
    // Optionally, check the content of the response
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('playerName');
      expect(response.body[0]).toHaveProperty('tries');
    }
  });

  it('should submit user score with a POST request', async () => {
    const postData = {
      playerName: 'TestUser',
      gridSize: '6x6',
      mineCount: 5,
      tries: 3
    };

    const response = await request(renderUrl)
      .post('/submit-score')
      .send(postData);

    expect(response.statusCode).toBe(200);  // Check if submission was successful
    expect(response.body.message).toBe('Score submitted successfully!');
  });
});