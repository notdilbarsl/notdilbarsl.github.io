// Choose the Size of the Grid
function chooseGridSize(){
    const gridSize = document.getElementById('grid-size').value;
    const mineSelect = document.getElementById('mine-count');
    if (!gridSize){
        mineSelect.innerHTML = ''; 
        const chooseGridSizeOption = document.createElement('option');
        chooseGridSizeOption.disabled = true;
        chooseGridSizeOption.selected = true;
        chooseGridSizeOption.textContent = 'Choose Grid Size';
        mineSelect.appendChild(chooseGridSizeOption);
    }
}