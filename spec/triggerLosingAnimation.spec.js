/* global jest, describe, it, expect, beforeEach, afterEach */

import { triggerLosingAnimation } from '../triggerLosingAnimation.js';

describe('triggerLosingAnimation function', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="grid-item" style="background-color: red;"></div>
      <div class="grid-item" style="background-color: blue;"></div>
      <div id="message"></div>
    `;

    jest.useFakeTimers(); // Use Jest's fake timers
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear all timers after each test
  });

  it('should display "You Lost!" and apply losing animation', () => {
    triggerLosingAnimation();
    const messageElement = document.getElementById('message');
    expect(messageElement.textContent).toBe('You Lost!');
    expect(messageElement.classList.contains('losing')).toBe(true);
    const gridItems = document.querySelectorAll('.grid-item');
    expect(gridItems[0].classList.contains('losing')).toBe(true);
    expect(gridItems[1].classList.contains('losing')).toBe(false);
    expect(document.body.classList.contains('screen-shake')).toBe(true);

    jest.advanceTimersByTime(2000);

    expect(messageElement.textContent).toBe('');
    expect(messageElement.classList.contains('losing')).toBe(false);
    expect(document.body.classList.contains('screen-shake')).toBe(false);
  });
});
