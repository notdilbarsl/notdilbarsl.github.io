// Function to update the leaderboard
/* global fetch */
export function updateLeaderboard(gridSize, mineCount) {
  fetch(`https://notdilbarsl-github-io-2.onrender.com/leaderboard?gridSize=${gridSize}x${gridSize}&mineCount=${mineCount}`)
    .then((response) => response.json())
    .then((data) => {
      const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
      leaderboardTableBody.innerHTML = '';
      if (data.length === 0) {
        const noDataRow = '<tr><td colspan="3">No User Has Played With These Settings</td></tr>';
        leaderboardTableBody.innerHTML = noDataRow;
        return;
      }

      data.forEach((entry, index) => {
        const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${entry.playerName}</td>
                        <td>${entry.tries}</td>
                    </tr>
                `;
        leaderboardTableBody.innerHTML += row;
      });
    });
}
