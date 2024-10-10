/* global jest, describe, it, expect, beforeEach */

import * as gameState from '../client/gameState.js';
import * as showGridModule from '../client/showGrid.js';
import * as triggerLosingAnimationModule from '../client/triggerLosingAnimation.js';
import { checkLoss } from '../client/checkLoss.js';

jest.spyOn(gameState, 'setGameOver').mockImplementation(() => {});
jest.spyOn(showGridModule, 'showGrid').mockImplementation(() => {});
jest.spyOn(triggerLosingAnimationModule, 'triggerLosingAnimation').mockImplementation(() => {});

describe('checkLoss function', () => {
  let grid, pos;

  beforeEach(() => {
    jest.clearAllMocks();
    grid = [
      ['', '', ''],
      ['', 'M', ''],
      ['', '', '']
    ];
    pos = { x: 1, y: 1 };
    document.body.innerHTML = `
      <div id="cell-1-1" class="grid-item"></div>
      <div id="start-button">
        <button>Start</button>
      </div>
      <div id="message"></div>
    `;
  });

  it('should trigger loss when player steps on a mine', () => {
    const result = checkLoss(pos, grid);
    expect(result).toBe(1);
    expect(gameState.setGameOver).toHaveBeenCalledWith(true);
    expect(showGridModule.showGrid).toHaveBeenCalled();
    expect(triggerLosingAnimationModule.triggerLosingAnimation).toHaveBeenCalled();
  });

  it('should continue game when player does not step on a mine', () => {
    pos = { x: 0, y: 0 };
    const result = checkLoss(pos, grid);
    expect(result).toBe(0);
    expect(gameState.setGameOver).not.toHaveBeenCalled();
    expect(showGridModule.showGrid).not.toHaveBeenCalled();
    expect(triggerLosingAnimationModule.triggerLosingAnimation).not.toHaveBeenCalled();
  });
});
