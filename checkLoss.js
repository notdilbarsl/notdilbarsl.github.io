import { triggerLosingAnimation } from './triggerLosingAnimation.js';
import { showGrid } from './showGrid.js';
import { setGameOver } from './gameState.js';

export function checkLoss(pos,grid){
  if (grid[pos.x][pos.y] === 'M')
  {
    document.getElementById(`cell-${pos.x}-${pos.y}`).style.backgroundColor = 'red';
    document.getElementById(`cell-${pos.x}-${pos.y}`).innerHTML = 'P';
    setGameOver(true);
    showGrid();
    const startButton = document.querySelector('#start-button button');
    startButton.textContent = 'Start Game';
    startButton.style.background = 'linear-gradient(145deg, #ff7e5f, #feb47b)';
    startButton.style.color = '#ffffff';
    triggerLosingAnimation();
    return 1;
  }
  return 0;
}

