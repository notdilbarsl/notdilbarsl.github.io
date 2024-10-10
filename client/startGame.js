// Start Game
import { createGrid } from './createGrid.js';
import { resetGameState } from './gameState.js';
import { placeMines } from './randomMinePlacement.js';
import { updateLeaderboard } from './updateLeaderboard.js';

export function startGame(){
  const gridSizeSelected = document.getElementById('grid-size').value;
  const mineCountSelected = document.getElementById('mine-count').value;
  const grid = parseInt(gridSizeSelected, 10);
  const mine = parseInt(mineCountSelected, 10);
  updateLeaderboard(grid, mine);
  if (!gridSizeSelected || !mineCountSelected){
     
    alert('Please select both grid size and number of mines.');
    return;
  }
  document.querySelector('.tries-container').style.display = 'flex';
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
