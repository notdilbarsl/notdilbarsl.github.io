export let grid = [];
export let playerPos = { x: 0, y: 0 };
export let gameOver = false;

export function resetGameState() {
    playerPos = { x: 0, y: 0 };
    grid = [];
    gameOver = false;
}

export function setPlayerPos(newPos) {
    grid[playerPos.x][playerPos.y] = ' ';
    playerPos = newPos;
    grid[playerPos.x][playerPos.y] = 'P';
    document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).innerHTML = 'P'; 
    document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).style.backgroundColor = 'green';
}

export function getPlayerPos() {
    return playerPos;
}

export function setGameOver(status) {
    gameOver = status;
}

export function isGameOver() {
    return gameOver;
}

export function setGrid(newGrid) {
    grid = newGrid;
}

export function getGrid() {
    return grid;
}