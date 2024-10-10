/* global describe, it, expect, beforeEach */

import { generateRandomPath } from '../client/generateRandomPath.js';

describe('generateRandomPath', () => {
  let gridSize;
  beforeEach(() => {
    gridSize = 3;
    document.body.innerHTML = `<input id="grid-size" value="${gridSize}">`;
  });

  it('should generate a valid path with only right or down moves', () => {
    const path = generateRandomPath();
    expect(path.length).toBe(2 * (gridSize - 1));
    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1];
      const curr = path[i];
      const moveDistance = Math.abs(curr.x - prev.x) + Math.abs(curr.y - prev.y);
      expect(moveDistance).toBe(1);
      expect(curr.x).toBeGreaterThanOrEqual(prev.x);
      expect(curr.y).toBeGreaterThanOrEqual(prev.y);  
    }
    expect(path[0]).toEqual(expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }));
    expect(
      (path[0].x === 0 && path[0].y === 1) || 
      (path[0].x === 1 && path[0].y === 0)
    ).toBe(true);
    expect(path[path.length - 1]).toEqual({ x: gridSize - 1, y: gridSize - 1 });
  });

  it('should only move within bounds of the grid', () => {
    const path = generateRandomPath();
    path.forEach((pos) => {
      expect(pos.x).toBeLessThanOrEqual(gridSize - 1);
      expect(pos.y).toBeLessThanOrEqual(gridSize - 1);
      expect(pos.x).toBeGreaterThanOrEqual(0);
      expect(pos.y).toBeGreaterThanOrEqual(0);  
    });
  });

});
