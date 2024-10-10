// Generate Grid with Functionality
import { handleCellClick } from './handleCellClick.js';
import { setGrid, getPlayerPos } from './gameState.js';

export function createGrid(){
  const gridSize = document.getElementById('grid-size').value;
  const gridContainer = document.getElementById('grid-container');
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
  gridContainer.innerHTML = '';
  const grid = Array.from({ length: parseInt(gridSize) }, () => Array(parseInt(gridSize)).fill(' '));
  const playerPos = getPlayerPos();
  grid[playerPos.x][playerPos.y] = 'P';
  setGrid(grid);
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      gridItem.id = `cell-${i}-${j}`;
      gridItem.innerHTML = cell;
      gridItem.addEventListener('click', () => handleCellClick(i, j));
      gridContainer.appendChild(gridItem);
    });
  });
  document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).style.backgroundColor = 'green';
}

