/* global jest, describe, it, expect, beforeEach, afterEach */
import { updateLeaderboard } from '../updateLeaderboard.js';

describe('updateLeaderboard', () => {
  beforeEach(() => {
    // Set up the DOM elements required for the function
    document.body.innerHTML = `
      <div id="leaderboard">
        <table id="leaderboardTable">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User ID</th>
              <th>Tries</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    `;

    // Mock fetch globally
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              playerName: 'testUser1',
              tries: 3,
            },
            {
              playerName: 'testUser2',
              tries: 5,
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and update the leaderboard with user data', async () => {
    await updateLeaderboard(6, 10);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
    expect(leaderboardTableBody.children.length).toBe(2);
    const rows = leaderboardTableBody.querySelectorAll('tr');
    expect(rows[0].children[0].textContent).toBe('1'); 
    expect(rows[0].children[1].textContent).toBe('testUser1');
    expect(rows[0].children[2].textContent).toBe('3');

    expect(rows[1].children[0].textContent).toBe('2');
    expect(rows[1].children[1].textContent).toBe('testUser2');
    expect(rows[1].children[2].textContent).toBe('5');
  });

  it('should display "No User Has Played With These Settings" if no data is returned', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    await updateLeaderboard(6, 10);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
    expect(leaderboardTableBody.innerHTML.trim()).toBe(
      '<tr><td colspan="3">No User Has Played With These Settings</td></tr>'
    );
  });
});
