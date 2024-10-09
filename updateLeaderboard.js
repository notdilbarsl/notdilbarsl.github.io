// Function to update the leaderboard
export function updateLeaderboard(gridSize, mineCount) {
    fetch(`http://localhost:3001/leaderboard?gridSize=${gridSize}x${gridSize}&mineCount=${mineCount}`)
        .then(response => response.json())
        .then(data => {
            // Get the table body element
            const leaderboardTableBody = document.querySelector("#leaderboardTable tbody");
            leaderboardTableBody.innerHTML = "";

            if (data.length === 0) {
                const noDataRow = `<tr><td colspan="3">No User Has Played With These Settings</td></tr>`;
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
        })
        .catch(error => {
            console.error("Error fetching leaderboard data:", error);
        });
}
