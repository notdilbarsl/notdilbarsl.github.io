/* global jest, describe, it, expect, beforeEach, afterEach */

import { triggerWinningAnimation } from '../triggerWinningAnimation.js';

describe('triggerWinningAnimation function', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="grid-item" style="background-color: green;"></div>
      <div class="grid-item" style="background-color: blue;"></div>
      <div id="message"></div>
    `;

    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should display "You Won!" and apply winning animation', () => {
    triggerWinningAnimation();
    const messageElement = document.getElementById('message');
    expect(messageElement.textContent).toBe('You Won!');
    expect(messageElement.classList.contains('winning')).toBe(true);
    const gridItems = document.querySelectorAll('.grid-item');
    const greenItem = gridItems[0];
    expect(greenItem.classList.contains('winning')).toBe(true);

    jest.advanceTimersByTime(2000);

    expect(messageElement.textContent).toBe('');
    expect(messageElement.classList.contains('winning')).toBe(false);
  });
});
