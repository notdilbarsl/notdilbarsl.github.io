import { getGrid, isGameOver } from './gameState.js';

// Show Grid
export function showGrid(){
  const grid = getGrid();
  const gameOver = isGameOver();
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.getElementById(`cell-${i}-${j}`);
      if (gameOver){
        if (cell === 'M'){
          cellElement.style.backgroundColor = 'red';
        }
        else if (cell === 'P'){
          cellElement.style.backgroundColor = 'green';
        }
      }
      else{
        if (cell === 'P'){
          cellElement.style.backgroundColor = 'green';
        }
        else if (cellElement.style.backgroundColor !== 'green') {
          cellElement.style.backgroundColor = '';
        }
      }
    });
  });
}
