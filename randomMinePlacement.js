// Function to generate a random path from (0,0) to (n-1,n-1)
function generateRandomPath(){
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

// Function to place mines
function placeMines(numMines){
    let path = generateRandomPath();
    let minePositions = new Set(path.map(pos => `${pos.x}-${pos.y}`));   
    let placedMines = 0;
    while (placedMines < numMines){
        let x = Math.floor(Math.random() * gridSize);
        let y = Math.floor(Math.random() * gridSize);
        let key = `${x}-${y}`;
        if (grid[x][y] === ' ' && !(x === 0 && y === 0) && !minePositions.has(key)){
            grid[x][y] = 'M';
            placedMines++;
        }
    }
}