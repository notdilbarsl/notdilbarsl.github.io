// Some Additional Functionality
import { chooseGridSize } from './chooseGridSize.js';
import { chooseNumberOfMine } from './chooseNumberOfMine.js';
import { movePlayer } from './movePlayer.js';
import { generateGrid } from './generateGrid.js';
import { startGame } from './startGame.js';

document.getElementById('grid-container').style.display = 'none';
document.getElementById('message').style.display = 'none';
document.getElementById('grid-container').style.display = 'none';
document.getElementById('message').style.display = 'none';
document.getElementById('mine-count').addEventListener('focus',chooseGridSize);
document.getElementById('grid-size').addEventListener('change', function() {
  generateGrid();
  chooseNumberOfMine();
});
document.getElementById('start-game-btn').addEventListener('click', function() {
  startGame();
});
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
    movePlayer('up');
  } else if (event.key === 'ArrowDown') {
    movePlayer('down');
  } else if (event.key === 'ArrowLeft') {
    movePlayer('left');
  } else if (event.key === 'ArrowRight') {
    movePlayer('right');
  }
});

