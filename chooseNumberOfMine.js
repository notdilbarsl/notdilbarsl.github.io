// Choose the Number of Mine
function chooseNumberOfMine(){
    gridSize = parseInt(document.getElementById('grid-size').value, 10);
    const mineSelect = document.getElementById('mine-count');
    mineSelect.innerHTML = '';
    const maxMines = (gridSize - 1) ** 2;
    for(let i = 1; i <= maxMines; i++){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        mineSelect.appendChild(option);
    }
    const placeholderOption = document.createElement('option');
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    placeholderOption.textContent = 'Number of Mines';
    mineSelect.insertBefore(placeholderOption, mineSelect.firstChild);
}