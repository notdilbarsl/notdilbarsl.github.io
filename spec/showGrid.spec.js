/* global jest, describe, it, expect, beforeEach */

import { showGrid } from '../showGrid.js';
import { getGrid, isGameOver } from '../gameState.js';

jest.mock('../gameState.js');

describe('showGrid', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cell-0-0"></div>
      <div id="cell-0-1"></div>
      <div id="cell-0-2"></div>
      <div id="cell-1-0"></div>
      <div id="cell-1-1"></div>
      <div id="cell-1-2"></div>
      <div id="cell-2-0"></div>
      <div id="cell-2-1"></div>
      <div id="cell-2-2"></div>
    `;
    getGrid.mockReturnValue([
        [' ', 'M', ' '],
        [' ', 'P', ' '],
        [' ', ' ', 'M']
      ]);
    jest.clearAllMocks();
  });

  it('should highlight mines in red and player in green when game is over', () => {
    isGameOver.mockReturnValue(true);
    showGrid();
    expect(document.getElementById('cell-0-1').style.backgroundColor).toBe('red');
    expect(document.getElementById('cell-1-1').style.backgroundColor).toBe('green');
    expect(document.getElementById('cell-2-2').style.backgroundColor).toBe('red');
  });

  it('should only highlight the player in green when game is not over', () => {
    isGameOver.mockReturnValue(false);
    showGrid();
    expect(document.getElementById('cell-1-1').style.backgroundColor).toBe('green');
    expect(document.getElementById('cell-0-1').style.backgroundColor).toBe('');
    expect(document.getElementById('cell-2-2').style.backgroundColor).toBe('');
  });

  it('should reset non-player cells to default when game is not over', () => {
    isGameOver.mockReturnValue(false);
    document.getElementById('cell-0-1').style.backgroundColor = 'red';
    document.getElementById('cell-2-2').style.backgroundColor = 'red';
    showGrid();
    expect(document.getElementById('cell-0-1').style.backgroundColor).toBe(''); 
    expect(document.getElementById('cell-2-2').style.backgroundColor).toBe('');
    expect(document.getElementById('cell-1-1').style.backgroundColor).toBe('green');
  });
});
