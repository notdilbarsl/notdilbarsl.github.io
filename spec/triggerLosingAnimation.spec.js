/* global jest, describe, it, expect, beforeEach, afterEach */

import { triggerLosingAnimation } from '../client/triggerLosingAnimation.js';

describe('triggerLosingAnimation function', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="tries">0</div>
      <div class="grid-item" style="background-color: red;"></div>
      <div class="grid-item" style="background-color: blue;"></div>
      <div id="message"></div>
    `;

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
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
  it('should increase the tries element by 1', () => {
    // Initial value of tries is 0
    const triesElement = document.getElementById('tries');
    expect(triesElement.textContent).toBe('0');
    triggerLosingAnimation();
    expect(triesElement.textContent).toBe('1');
    triggerLosingAnimation();
    expect(triesElement.textContent).toBe('2');
  });
});
