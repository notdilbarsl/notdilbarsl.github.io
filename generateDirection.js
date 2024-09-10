export function generateDirection(gridSize,x,y){
  if(x === gridSize - 1) {return false;}
  else if(y === gridSize - 1) {return true;}
  else {return Math.random() > 0.5;}
}
