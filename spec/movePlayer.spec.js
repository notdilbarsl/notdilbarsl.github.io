/* global jest, describe, it, expect, beforeEach */

import { movePlayer } from '../movePlayer.js';
import { getPlayerPos, setPlayerPos, getGrid, setGrid, isGameOver } from '../gameState.js';
import { checkLoss } from '../checkLoss.js';
import { checkWin } from '../checkWin.js';

jest.mock('../gameState.js');
jest.mock('../checkLoss.js');
jest.mock('../checkWin.js');
jest.mock('../showGrid.js');

describe('movePlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <input id="grid-size" value="3">
      <div id="cell-0-0" class="grid-item"></div>
      <div id="cell-0-1" class="grid-item"></div>
      <div id="cell-0-2" class="grid-item"></div>
      <div id="cell-1-0" class="grid-item"></div>
      <div id="cell-1-1" class="grid-item"></div>
      <div id="cell-1-2" class="grid-item"></div>
      <div id="cell-2-0" class="grid-item"></div>
      <div id="cell-2-1" class="grid-item"></div>
      <div id="cell-2-2" class="grid-item"></div>
    `;

    isGameOver.mockReturnValue(false);
    getPlayerPos.mockReturnValue({ x: 1, y: 1 });
    getGrid.mockReturnValue([['', '', ''], ['', 'P', ''], ['', '', '']]);
    setPlayerPos.mockImplementation(() => {});
    setGrid.mockImplementation(() => {});
    checkLoss.mockReturnValue(false);
    checkWin.mockReturnValue(false);
  });

  it('moves player up', () => {
    movePlayer('up');
    expect(setPlayerPos).toHaveBeenCalledWith({ x: 0, y: 1 });
    expect(document.getElementById('cell-1-1').innerHTML).toBe('');
  });

  it('moves player down', () => {
    movePlayer('down');
    expect(setPlayerPos).toHaveBeenCalledWith({ x: 2, y: 1 });
    expect(document.getElementById('cell-1-1').innerHTML).toBe('');
  });

  it('moves player right', () => {
    movePlayer('right');
    expect(setPlayerPos).toHaveBeenCalledWith({ x: 1, y: 2 });
    expect(document.getElementById('cell-1-1').innerHTML).toBe('');
  });

  it('moves player left', () => {
    movePlayer('left');
    expect(setPlayerPos).toHaveBeenCalledWith({ x: 1, y: 0 });
    expect(document.getElementById('cell-1-1').innerHTML).toBe('');
  });

  it('does not move player if game is over', () => {
    isGameOver.mockReturnValue(true);
    movePlayer('down');
    expect(setPlayerPos).not.toHaveBeenCalled();
  });

});
