// Handle Cell Click for Movement
import { movePlayer } from './movePlayer.js';
import { isGameOver, getPlayerPos} from './gameState.js';

export function handleCellClick(x, y){
  const gameOver = isGameOver();
  if (gameOver) {return;}
  const playerPos = getPlayerPos();
  const dx = Math.abs(x - playerPos.x);
  const dy = Math.abs(y - playerPos.y);
  if (dx + dy === 1){
    if (x < playerPos.x){
      movePlayer('up');
    }
    else if (x > playerPos.x){
      movePlayer('down');
    }
    else if (y < playerPos.y){
      movePlayer('left');
    }
    else if (y > playerPos.y){
      movePlayer('right');
    }
  }
}
