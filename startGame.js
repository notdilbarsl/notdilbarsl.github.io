// Start Game
import { createGrid } from './createGrid.js';
import { resetGameState } from './gameState.js';
import { placeMines } from './randomMinePlacement.js';

export function startGame(){
  const gridSizeSelected = document.getElementById('grid-size').value;
  const mineCountSelected = document.getElementById('mine-count').value;
  if (!gridSizeSelected || !mineCountSelected){
    // eslint-disable-next-line no-alert
    alert('Please select both grid size and number of mines.');
    return;
  }
  resetGameState();
  createGrid();
  const mineCount = parseInt(mineCountSelected, 10);
  placeMines(mineCount);
  const gridContainer = document.getElementById('grid-container');
  gridContainer.style.display = 'grid';
  const startButton = document.querySelector('#start-button button');
  startButton.textContent = 'Game in Progress';
  startButton.style.background = 'linear-gradient(145deg, #00c853, #b2ff59)'; // Gradient green background
  startButton.style.color = '#ffffff';
  document.getElementById('message').style.display = 'block';
}
