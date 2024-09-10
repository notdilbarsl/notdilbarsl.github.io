import { handleCellClick } from '../handleCellClick.js';
import { isGameOver, getPlayerPos } from '../gameState.js';
import { movePlayer } from '../movePlayer.js';

jest.mock('../gameState.js');
jest.mock('../movePlayer.js');

describe('handleCellClick', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do nothing if the game is over', () => {
    isGameOver.mockReturnValue(true);
    handleCellClick(1, 1);
    expect(movePlayer).not.toHaveBeenCalled();
  });

  it('should call movePlayer with "up" if the clicked cell is above the player', () => {
    isGameOver.mockReturnValue(false);
    getPlayerPos.mockReturnValue({ x: 1, y: 1 });
    handleCellClick(0, 1);
    expect(movePlayer).toHaveBeenCalledWith('up');
  });

  it('should call movePlayer with "down" if the clicked cell is below the player', () => {
    isGameOver.mockReturnValue(false);
    getPlayerPos.mockReturnValue({ x: 1, y: 1 });
    handleCellClick(2, 1);
    expect(movePlayer).toHaveBeenCalledWith('down');
  });

  it('should call movePlayer with "left" if the clicked cell is to the left of the player', () => {
    isGameOver.mockReturnValue(false);
    getPlayerPos.mockReturnValue({ x: 1, y: 1 });
    handleCellClick(1, 0);
    expect(movePlayer).toHaveBeenCalledWith('left');
  });

  it('should call movePlayer with "right" if the clicked cell is to the right of the player', () => {
    isGameOver.mockReturnValue(false);
    getPlayerPos.mockReturnValue({ x: 1, y: 1 });
    handleCellClick(1, 2);
    expect(movePlayer).toHaveBeenCalledWith('right');
  });

  it('should not call movePlayer if the clicked cell is not adjacent to the player', () => {
    isGameOver.mockReturnValue(false);
    getPlayerPos.mockReturnValue({ x: 1, y: 1 });
    handleCellClick(0, 0);
    expect(movePlayer).not.toHaveBeenCalled();
  });
});
