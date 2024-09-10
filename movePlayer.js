// Move player
import { showGrid } from './showGrid.js';
import { checkLoss } from './checkLoss.js';
import { checkWin } from './checkWin.js';
import { isGameOver, getGrid, setPlayerPos, getPlayerPos, setGrid } from './gameState.js';
import { calculateNewPosition } from './calculateNewPosition.js';

export function movePlayer(direction){
  const gridSize = document.getElementById('grid-size').value;
  const gameOver = isGameOver();
  const grid = getGrid();
  let playerPos = getPlayerPos();
  if (gameOver) {return;}
  grid[playerPos.x][playerPos.y] = ' ';
  document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).innerHTML = '';
  playerPos = calculateNewPosition(direction,gridSize,playerPos);
  if(checkLoss(playerPos,grid)){
    return;
  }
  if(checkWin(playerPos,grid)){
    setPlayerPos(playerPos);
    return;
  }
  setPlayerPos(playerPos);
  setGrid(grid);
  showGrid();
}
