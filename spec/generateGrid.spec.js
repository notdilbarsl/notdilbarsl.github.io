/* global describe, it, expect, beforeEach */

import { generateGrid } from '../client/generateGrid.js';

describe('generateGrid', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="3">
      <div id="grid-container"></div>
    `;
  });

  it('should set up the grid container with correct display properties', () => {
    generateGrid();
    const gridContainer = document.getElementById('grid-container');
    expect(gridContainer.style.display).toBe('grid');
    expect(gridContainer.style.gridTemplateColumns).toBe('repeat(3, 50px)');
  });

  it('should create the correct number of grid items', () => {
    generateGrid()
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-item');
    expect(gridItems.length).toBe(9);
  });

  it('should clear any previous grid items before creating new ones', () => {
    document.getElementById('grid-container').innerHTML = '<div class="grid-item"></div>';
    generateGrid();
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-item');
    expect(gridItems.length).toBe(9);
  });

  it('should create a square grid with the correct number of rows and columns', () => {
    generateGrid();
    const gridContainer = document.getElementById('grid-container');
    const gridItems = gridContainer.getElementsByClassName('grid-item');
    const gridSize = 3;
    expect(gridItems.length).toBe(gridSize * gridSize);
    let rowIndex = 0;
    for (let i = 0; i < gridItems.length; i++) {
      const columnIndex = i % gridSize;
      if (columnIndex === 0) {
        rowIndex = rowIndex + 1;
      }
    }
  });

});
