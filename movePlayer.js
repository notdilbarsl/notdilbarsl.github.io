// Move player
function movePlayer(direction){
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

    if (grid[playerPos.x][playerPos.y] === 'M')
    {
        document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).style.backgroundColor = 'red';
        document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).innerHTML = 'P';
        gameOver = true;
        showGrid();
        const startButton = document.querySelector('#start-button button');
        startButton.textContent = "Start Game";
        startButton.style.background = "linear-gradient(145deg, #ff7e5f, #feb47b)";
        startButton.style.color = "#ffffff"; 
        triggerLosingAnimation();
        return;
    }

    grid[playerPos.x][playerPos.y] = 'P';
    document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).innerHTML = 'P'; 
    document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).style.backgroundColor = 'green';
    showGrid();

    if (playerPos.x === gridSize - 1 && playerPos.y === gridSize - 1)
    {
        document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).innerHTML = 'P';
        gameOver = true;
        showGrid();
        const startButton = document.querySelector('#start-button button');
        startButton.textContent = "Start Game";
        startButton.style.background = "linear-gradient(145deg, #ff7e5f, #feb47b)";
        startButton.style.color = "#ffffff"; 
        triggerWinningAnimation();
        return;
    }
}