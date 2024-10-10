/* global describe, it, expect, beforeEach */

import { chooseGridSize } from '../client/chooseGridSize.js';

describe('chooseGridSize', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="">
      <select id="mine-count"></select>
    `;
  });

  it('should add "Choose Grid Size" option if no grid size is selected', () => {
    chooseGridSize();
    const mineSelect = document.getElementById('mine-count');
    expect(mineSelect.innerHTML).toContain('Choose Grid Size');
    expect(mineSelect.children.length).toBe(1);
  });

  it('should clear mine options if grid size is not selected', () => {
    chooseGridSize();
    const mineSelect = document.getElementById('mine-count');
    expect(mineSelect.innerHTML).toContain('Choose Grid Size');
  });

  it('should not modify the mine select options when a grid size is selected', () => {
    document.getElementById('grid-size').value = '3';
    chooseGridSize();
    const mineSelect = document.getElementById('mine-count');
    expect(mineSelect.innerHTML).not.toContain('Choose Grid Size');
  });
});
