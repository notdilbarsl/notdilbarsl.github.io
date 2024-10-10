import { getGrid, setGrid } from './gameState.js';
import { generateRandomPath } from './generateRandomPath.js';

export function placeMines(numMines){
  const gridSize = document.getElementById('grid-size').value;
  const grid = getGrid();
  const path = generateRandomPath();
  const minePositions = new Set(path.map((pos) => `${pos.x}-${pos.y}`));

  const availablePositions = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const key = `${x}-${y}`;
      if (grid[x][y] === ' ' && !(x === 0 && y === 0) && !minePositions.has(key)) {
        availablePositions.push({ x, y });
      }
    }
  }


  for (let i = availablePositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
  }

  for (let i = 0; i < numMines; i++) {
    const { x, y } = availablePositions[i];
    grid[x][y] = 'M';
  }
  setGrid(grid);
}
