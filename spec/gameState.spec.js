import { resetGameState, setPlayerPos, getPlayerPos, setGameOver, isGameOver, setGrid, getGrid } from '../gameState.js';

describe('gameState functions', () => {
  beforeEach(() => {
    resetGameState();
    document.body.innerHTML = `
      <div id="cell-0-0"></div>
      <div id="cell-1-1"></div>
    `;
  });

  it('should reset the game state', () => {
    setGrid([['P', '', ''], ['', 'M', ''], ['', '', 'M']]);
    setPlayerPos({ x: 1, y: 1 });
    setGameOver(true);
    resetGameState();
    expect(getPlayerPos()).toEqual({ x: 0, y: 0 });
    expect(getGrid()).toEqual([]);
    expect(isGameOver()).toBe(false);
  });

  it('should set the player position correctly', () => {
    setGrid([['P', '', ''], ['', 'M', ''], ['', '', 'M']]);
    setPlayerPos({ x: 1, y: 1 });
    expect(getPlayerPos()).toEqual({ x: 1, y: 1 });
    expect(getGrid()[1][1]).toBe('P');
    expect(document.getElementById('cell-1-1').innerHTML).toBe('P');
    expect(document.getElementById('cell-1-1').style.backgroundColor).toBe('green');
  });

  it('should return the correct player position', () => {
    const pos = getPlayerPos();
    expect(pos).toEqual({ x: 0, y: 0 });
  });

  it('should set the game over status', () => {
    setGameOver(true);
    expect(isGameOver()).toBe(true);
    setGameOver(false);
    expect(isGameOver()).toBe(false);
    setGameOver(true);
    expect(isGameOver()).toBe(true);
  });

  it('should set and return the grid correctly', () => {
    const newGrid = [['P', '', ''], ['', 'M', ''], ['', '', 'M']];
    setGrid(newGrid);
    expect(getGrid()).toEqual(newGrid);
  });

});
