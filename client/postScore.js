/* global fetch */
export function postScore(){
  const gridSizeSelected = document.getElementById('grid-size').value;
  const mineCountSelected = document.getElementById('mine-count').value;
  const userId = document.getElementById('userID').value;
  const roundNumber = document.getElementById('tries').textContent;
  const grid = `${gridSizeSelected}x${gridSizeSelected}`;
  fetch('https://notdilbarsl-github-io-2.onrender.com/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playerName: userId,
      gridSize : grid,
      mineCount: mineCountSelected,
      tries: roundNumber,
    }),
  })
    .then((response) => response.json())
    .then(()=> {
      document.getElementById('tries').textContent = 0;
    });
}
