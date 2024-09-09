require('jsdom-global')();

import * as gameState from '../gameState';
import * as showGridModule from '../showGrid';
import * as triggerLosingAnimationModule from '../triggerLosingAnimation';
import { checkLoss } from '../checkLoss';

describe('checkLoss function', () => {
  let grid, pos;
  beforeEach(() => {
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
    spyOn(gameState, 'setGameOver').and.callThrough();
    spyOn(showGridModule, 'showGrid').and.callThrough();
    spyOn(triggerLosingAnimationModule, 'triggerLosingAnimation').and.callThrough();
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
