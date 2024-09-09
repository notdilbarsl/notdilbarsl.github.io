require('jsdom-global')();

import { triggerWinningAnimation } from '../triggerWinningAnimation.js';

describe('triggerWinningAnimation function', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="grid-item" style="background-color: green;"></div>
      <div class="grid-item" style="background-color: blue;"></div>
      <div id="message"></div>
    `;

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should display "You Won!" and apply winning animation', () => {
    triggerWinningAnimation();
    const messageElement = document.getElementById('message');
    expect(messageElement.textContent).toBe('You Won!');
    expect(messageElement.classList.contains('winning')).toBe(true);
    const gridItems = document.querySelectorAll('.grid-item');
    const greenItem = gridItems[0];
    expect(greenItem.classList.contains('winning')).toBe(true);

    jasmine.clock().tick(2000);

    expect(messageElement.textContent).toBe('');
    expect(messageElement.classList.contains('winning')).toBe(false);
  });
});
