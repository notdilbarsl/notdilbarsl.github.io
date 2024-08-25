// Generate Grid with Functionality
function createGrid(){
    const gridContainer = document.getElementById('grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gridContainer.innerHTML = '';
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(' '));
    grid[playerPos.x][playerPos.y] = 'P';
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

// Generate Grid without Functionality
function generateGrid(){
    const gridSize = document.getElementById('grid-size').value;
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    for(let i = 0; i < gridSize * gridSize; i++){
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridContainer.appendChild(gridItem);
    }
}