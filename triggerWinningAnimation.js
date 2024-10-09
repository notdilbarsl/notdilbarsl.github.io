// Winning Animation
/* global fetch */
export function triggerWinningAnimation(){
  const gridSizeSelected = document.getElementById('grid-size').value;
  const mineCountSelected = document.getElementById('mine-count').value;
  const userId = document.getElementById('userID').value;
  const roundNumber = document.getElementById('tries').textContent;
  const gridSize = `${gridSizeSelected}x${gridSizeSelected}`;
  fetch('https://notdilbarsl-github-io.onrender.com/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playerName: userId,
      gridSize,
      mineCount: mineCountSelected,
      tries: roundNumber,
    }),
  })
    .then((response) => response.json())
    .then(()=> {
      document.getElementById('tries').textContent = 0;
    });
  const gridItems = document.querySelectorAll('.grid-item');
  const messageElement = document.getElementById('message');
  messageElement.textContent = 'You Won!';
  messageElement.classList.add('winning');
  gridItems.forEach((item) => {
    if (item.style.backgroundColor === 'green') {
      item.classList.add('winning');
    }
  });
  setTimeout(() => {
    messageElement.textContent = '';
    messageElement.classList.remove('winning');
  }, 2000);
  setTimeout(() => document.body.classList.remove('screen-shake'), 2000);
}
