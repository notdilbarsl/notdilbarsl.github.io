/* global jest, describe, it, expect, beforeEach */

import * as gameState from '../client/gameState.js';
import * as showGridModule from '../client/showGrid.js';
import * as triggerWinningAnimationModule from '../client/triggerWinningAnimation.js';
import { checkWin } from '../client/checkWin.js';

jest.spyOn(gameState, 'setGameOver').mockImplementation(() => {});
jest.spyOn(showGridModule, 'showGrid').mockImplementation(() => {});
jest.spyOn(triggerWinningAnimationModule, 'triggerWinningAnimation').mockImplementation(() => {});

describe('checkWin function', () => {
  let pos;
  beforeEach(() => {
    jest.clearAllMocks();
    pos = { x: 2, y: 2 };
    
    document.body.innerHTML = `
      <input id="grid-size" value="3" />
      <div id="cell-2-2" class="grid-item"></div>
      <div id="start-button">
        <button>Start</button>
      </div>
      <div id="message"></div>
    `;
  });

  it('should trigger win when player reaches the winning position', () => {
    const result = checkWin(pos);
    expect(result).toBe(1);
    expect(gameState.setGameOver).toHaveBeenCalledWith(true);
    expect(showGridModule.showGrid).toHaveBeenCalled();
    expect(triggerWinningAnimationModule.triggerWinningAnimation).toHaveBeenCalled();
  });

  it('should not trigger win when player is not at the winning position', () => {
    pos = { x: 1, y: 1 }; 
    const result = checkWin(pos);
    expect(result).toBe(0);
    expect(gameState.setGameOver).not.toHaveBeenCalled();
    expect(showGridModule.showGrid).not.toHaveBeenCalled();
    expect(triggerWinningAnimationModule.triggerWinningAnimation).not.toHaveBeenCalled();
  });
});
