/* global describe, it, expect, beforeEach */

import { chooseNumberOfMine } from '../chooseNumberOfMine.js';

describe('chooseNumberOfMine', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="grid-size" value="4">
      <select id="mine-count"></select>
    `;
  });

  it('should populate mine select with correct number of mine options', () => {
    chooseNumberOfMine();
    const mineSelect = document.getElementById('mine-count');
    const maxMines = (4 - 1) ** 2;
    expect(mineSelect.children.length).toBe(maxMines + 1);
    expect(mineSelect.children[1].value).toBe('1');
    expect(mineSelect.children[maxMines].value).toBe(String(maxMines));
  });

  it('should include a "Number of Mines" placeholder option', () => {
    chooseNumberOfMine();
    const mineSelect = document.getElementById('mine-count');
    const placeholderOption = mineSelect.children[0];
    expect(placeholderOption.textContent).toBe('Number of Mines');
    expect(placeholderOption.disabled).toBe(true);
    expect(placeholderOption.selected).toBe(true);
  });
});
