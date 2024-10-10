/* global jest, describe, it, expect, beforeEach, afterEach */

import { movePlayer } from '../client/movePlayer.js';
import { generateGrid } from '../client/generateGrid.js';
import { chooseGridSize } from '../client/chooseGridSize.js';
import { chooseNumberOfMine } from '../client/chooseNumberOfMine.js';
import { startGame } from '../client/startGame.js';

jest.mock('../client/movePlayer.js');
jest.mock('../client/generateGrid.js');
jest.mock('../client/chooseGridSize.js');
jest.mock('../client/chooseNumberOfMine.js');
jest.mock('../client/startGame.js');

describe('additionalFunctionality', () => {
    beforeEach(async () => {
    document.body.innerHTML = `
      <div id="grid-container" style="display: block;"></div>
      <div id="message" style="display: block;"></div>
      <select id="mine-count"></select>
      <select id="grid-size"></select>
      <button id="start-game-btn">Start Game</button>
    `;

    await import('../client/additionalFunctionality.js');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call chooseGridSize when mine-count is focused', () => {
    const mineCountSelect = document.getElementById('mine-count');
    mineCountSelect.dispatchEvent(new Event('focus'));
    expect(chooseGridSize).toHaveBeenCalled();
  });

  it('should call generateGrid and chooseNumberOfMine when grid-size is changed', () => {
    const gridSizeSelect = document.getElementById('grid-size');
    gridSizeSelect.addEventListener('change', generateGrid);
    gridSizeSelect.addEventListener('change', chooseNumberOfMine);
    gridSizeSelect.dispatchEvent(new Event('change'));
    expect(generateGrid).toHaveBeenCalled();
    expect(chooseNumberOfMine).toHaveBeenCalled();
  });

  it('should call startGame when the start button is clicked', () => {
    const startButton = document.getElementById('start-game-btn');
    startButton.addEventListener('click', startGame);
    startButton.click();
    expect(startGame).toHaveBeenCalled();
  });

  it('should call movePlayer with the correct direction on arrow key press', () => {
    const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(eventUp);
    expect(movePlayer).toHaveBeenCalledWith('up');

    const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    document.dispatchEvent(eventDown);
    expect(movePlayer).toHaveBeenCalledWith('down');

    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(eventLeft);
    expect(movePlayer).toHaveBeenCalledWith('left');

    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(eventRight);
    expect(movePlayer).toHaveBeenCalledWith('right');
  });
});
