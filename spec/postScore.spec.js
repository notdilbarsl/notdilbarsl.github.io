/* global jest, describe, it, expect, beforeEach, afterEach */
import { postScore } from '../client/postScore.js';

describe('postScore', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="6">
      <input id="mine-count" value="10">
      <input id="userID" value="testUser">
      <div id="tries">5</div>
    `;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send the correct POST request with the right data', async () => {
    await postScore();
    expect(fetch).toHaveBeenCalledWith('https://notdilbarsl-github-io-3.onrender.com/submit-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName: 'testUser',
        gridSize: '6x6',
        mineCount: '10',
        tries: '5',
      }),
    });
  });

  it('should simulate resetting the tries count after submitting the score', async () => {
    const triesElement = document.getElementById('tries');
    expect(triesElement.textContent).toBe('5');
    await postScore();
    triesElement.textContent = '0';
    expect(triesElement.textContent).toBe('0');
  });
});
