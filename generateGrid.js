// Generate Grid without Functionality
export function generateGrid(){
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