/* global jest, describe, it, expect, beforeEach */

import { createGrid } from '../createGrid.js';
import { setGrid, getPlayerPos } from '../gameState.js';
import { handleCellClick } from '../handleCellClick.js';

jest.mock('../gameState.js');
jest.mock('../handleCellClick.js');

describe('createGrid', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="3">
      <div id="grid-container"></div>
    `;
    
    getPlayerPos.mockReturnValue({ x: 0, y: 0 });
    setGrid.mockImplementation(() => {});

    jest.clearAllMocks();
  });

  it('should create a grid of the correct size', () => {
    createGrid();
    const gridContainer = document.getElementById('grid-container');
    expect(gridContainer.children.length).toBe(9);
    expect(gridContainer.style.gridTemplateColumns).toBe('repeat(3, 50px)');
  });

  it('should place the player at the correct starting position', () => {
    createGrid();
    const playerCell = document.getElementById('cell-0-0');
    expect(playerCell.innerHTML).toBe('P');
    expect(playerCell.style.backgroundColor).toBe('green');
  });

  it('should create grid items with correct IDs and add event listeners', () => {
    createGrid();
    const gridItem = document.getElementById('cell-1-1');
    expect(gridItem).not.toBeNull();
    expect(gridItem.id).toBe('cell-1-1');
    gridItem.click();
    expect(handleCellClick).toHaveBeenCalledWith(1, 1);
  });

  it('should set up the grid with empty cells except for the player', () => {
    createGrid();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === 0 && j === 0) continue;
        const cell = document.getElementById(`cell-${i}-${j}`);
        expect(cell.innerHTML).toBe(' ');
      }
    }
  });
});
