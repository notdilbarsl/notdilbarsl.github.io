// Move player
import { showGrid } from "./showGrid.js"
import { checkLoss } from "./checkLoss.js"
import { checkWin } from "./checkWin.js"
import { isGameOver, getGrid, setPlayerPos, getPlayerPos, setGrid } from "./gameState.js";

export function movePlayer(direction){
    const gridSize = document.getElementById('grid-size').value;
    let gameOver = isGameOver();
    let grid = getGrid();
    let playerPos = getPlayerPos();
    if (gameOver) return;
    grid[playerPos.x][playerPos.y] = ' ';
    document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).innerHTML = '';
    if (direction === 'up' && playerPos.x > 0){
        playerPos.x -= 1;
    } 
    else if (direction === 'down' && playerPos.x < gridSize - 1){
        playerPos.x += 1;
    } 
    else if (direction === 'left' && playerPos.y > 0){
        playerPos.y -= 1;
    } 
    else if (direction === 'right' && playerPos.y < gridSize - 1){
        playerPos.y += 1;
    }
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
