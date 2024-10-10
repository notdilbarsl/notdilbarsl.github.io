/* global jest, describe, it, expect, beforeEach */

import { startGame } from '../client/startGame.js';
import { resetGameState } from '../client/gameState.js';
import { createGrid } from '../client/createGrid.js';
import { placeMines } from '../client/randomMinePlacement.js';
import { updateLeaderboard } from '../client/updateLeaderboard.js';

jest.mock('../client/gameState.js');
jest.mock('../client/createGrid.js');
jest.mock('../client/randomMinePlacement.js');
jest.mock('../client/updateLeaderboard.js');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('startGame', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="3">
      <input id="mine-count" value="2">
      <div id="grid-container" style="display:none;"></div>
      <div id="message" style="display:none;"></div>
      <div id="start-button"><button>Start Game</button></div>
      <div class="tries-container" style="display:none;"></div>
      <table id="leaderboardTable"><tbody></tbody></table>
    `;
    jest.clearAllMocks();
  });

  it('should call updateLeaderboard with correct gridSize and mineCount', () => {
    startGame();
    expect(updateLeaderboard).toHaveBeenCalledWith(3, 2);
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
