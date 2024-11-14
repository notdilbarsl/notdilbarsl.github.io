/* global fetch */
const hosts = ["notdilbarsl-github-io.onrender.com", "notdilbarsl-github-io-1.onrender.com"];
let currentHostIndex = 0;
export function postScore(){
  const gridSizeSelected = document.getElementById('grid-size').value;
  const mineCountSelected = document.getElementById('mine-count').value;
  const userId = document.getElementById('userID').value;
  const roundNumber = document.getElementById('tries').textContent;
  const grid = `${gridSizeSelected}x${gridSizeSelected}`;
  const selectedHost = hosts[currentHostIndex];
  currentHostIndex = (currentHostIndex + 1) % hosts.length; 
  fetch('https://notdilbarsl-github-io-3.onrender.com/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Host': selectedHost,
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
