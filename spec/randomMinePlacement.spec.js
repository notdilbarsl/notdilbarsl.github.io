/* global jest, describe, it, expect, beforeEach */

import { placeMines } from '../client/randomMinePlacement.js';
import { getGrid, setGrid } from '../client/gameState.js';
import { generateRandomPath } from '../client/generateRandomPath.js';

jest.mock('../client/gameState.js');
jest.mock('../client/generateRandomPath.js');

describe('placeMines', () => {
  let grid, path;

  beforeEach(() => {
    grid = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    path = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 }
    ];

    getGrid.mockReturnValue(grid);
    setGrid.mockImplementation((newGrid) => { grid = newGrid; });
    generateRandomPath.mockReturnValue(path);
    document.body.innerHTML = `<input id="grid-size" value="3">`;
  });

  it('should place the correct number of mines', () => {
    placeMines(2);
    const placedMines = grid.flat().filter((cell) => cell === 'M').length;
    expect(placedMines).toBe(2);
  });

  it('should not place mines on the path or starting position', () => {
    placeMines(3);
    path.forEach((cell) => {
      expect(grid[cell.x][cell.y]).not.toBe('M');
    });
    expect(grid[0][0]).not.toBe('M');
    const placedMines = grid.flat().filter((cell) => cell === 'M').length;
    expect(placedMines).toBe(3);
  });

});
