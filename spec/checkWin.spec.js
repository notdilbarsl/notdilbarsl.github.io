require('jsdom-global')();

import * as gameState from '../gameState';
import * as showGridModule from '../showGrid';
import * as triggerWinningAnimationModule from '../triggerWinningAnimation';
import { checkWin } from '../checkWin';

describe('checkWin function', () => {
  let pos;
  beforeEach(() => {
    pos = { x: 2, y: 2 };
    
    document.body.innerHTML = `
      <input id="grid-size" value="3" />
      <div id="cell-2-2" class="grid-item"></div>
      <div id="start-button">
        <button>Start</button>
      </div>
      <div id="message"></div>
    `;

    spyOn(gameState, 'setGameOver').and.callThrough();
    spyOn(showGridModule, 'showGrid').and.callThrough();
    spyOn(triggerWinningAnimationModule, 'triggerWinningAnimation').and.callThrough();
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
