import { triggerWinningAnimation } from "./triggerWinningAnimation.js"
import { showGrid } from "./showGrid.js"
import { setGameOver } from "./gameState.js";

export function checkWin(pos){
    const gridSize = document.getElementById('grid-size').value;
    if (pos.x === gridSize - 1 && pos.y === gridSize - 1)
    {
        document.getElementById(`cell-${pos.x}-${pos.y}`).innerHTML = 'P';
        setGameOver(true);
        showGrid();
        const startButton = document.querySelector('#start-button button');
        startButton.textContent = "Start Game";
        startButton.style.background = "linear-gradient(145deg, #ff7e5f, #feb47b)";
        startButton.style.color = "#ffffff"; 
        triggerWinningAnimation();
        return 1;
    }
    return 0;
}
