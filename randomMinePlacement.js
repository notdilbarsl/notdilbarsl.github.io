import { getGrid, setGrid } from "./gameState.js";

// Function to generate a random path from (0,0) to (n-1,n-1)
function generateRandomPath(){
    const gridSize = document.getElementById('grid-size').value;
    let path = [];
    let x = 0, y = 0;
    while (x < gridSize - 1 || y < gridSize - 1){
        if (x < gridSize - 1 && y < gridSize - 1){
            if (Math.random() < 0.5){
                x += 1;
            } 
            else{
                y += 1;
            }
        } else if (x < gridSize - 1){
            x += 1;
        } 
        else if (y < gridSize - 1){
            y += 1;
        }
        path.push({ x, y });
    }
    return path;
}

export function placeMines(numMines){
    const gridSize = document.getElementById('grid-size').value;
    let grid = getGrid();
    let path = generateRandomPath();
    let minePositions = new Set(path.map(pos => `${pos.x}-${pos.y}`));

    let availablePositions = [];
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let key = `${x}-${y}`;
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
