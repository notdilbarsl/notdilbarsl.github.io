import { startGame } from '../startGame.js';
import { resetGameState } from '../gameState.js';
import { createGrid } from '../createGrid.js';
import { placeMines } from '../randomMinePlacement.js';

jest.mock('../gameState.js');
jest.mock('../createGrid.js');
jest.mock('../randomMinePlacement.js');

describe('startGame', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="3">
      <input id="mine-count" value="2">
      <div id="grid-container" style="display:none;"></div>
      <div id="message" style="display:none;"></div>
      <div id="start-button"><button>Start Game</button></div>
    `;
    jest.clearAllMocks();
  });

  it('should show an alert if grid size or mine count is not selected', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    document.getElementById('grid-size').value = '';
    startGame();
    expect(window.alert).toHaveBeenCalledWith('Please select both grid size and number of mines.');
  });

  it('should reset the game state', () => {
    startGame();
    expect(resetGameState).toHaveBeenCalled(); 
  });

  it('should create a grid with the correct size', () => {
    startGame();
    expect(createGrid).toHaveBeenCalled();
  });

  it('should place the correct number of mines', () => {
    startGame();
    expect(placeMines).toHaveBeenCalledWith(2);
  });

  it('should update the grid-container display to grid', () => {
    startGame();
    const gridContainer = document.getElementById('grid-container');
    expect(gridContainer.style.display).toBe('grid');
  });

  it('should update the start button text and style', () => {
    startGame();
    const startButton = document.querySelector('#start-button button');
    expect(startButton.textContent).toBe('Game in Progress');
    expect(startButton.style.color).toBe('rgb(255, 255, 255)');
  });

  it('should display the message element', () => {
    startGame();
    const messageElement = document.getElementById('message');
    expect(messageElement.style.display).toBe('block');
  });
});
