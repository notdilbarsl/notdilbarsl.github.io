export function calculateNewPosition(direction,gridSize,pos){
  if (direction === 'up' && pos.x > 0){
    pos.x -= 1;
  }
  else if (direction === 'down' && pos.x < gridSize - 1){
    pos.x += 1;
  }
  else if (direction === 'left' && pos.y > 0){
    pos.y -= 1;
  }
  else if (direction === 'right' && pos.y < gridSize - 1){
    pos.y += 1;
  }
  return pos;
  
}
