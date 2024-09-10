import { generateDirection } from './generateDirection.js';

export function generateRandomPath(){
  const gridSize = document.getElementById('grid-size').value;
  const path = [];
  let x = 0, y = 0;
  while (x < gridSize - 1 || y < gridSize - 1){
    if(generateDirection(gridSize,x,y)){
      x+=1;
    }
    else{
      y+=1;
    }
    path.push({ x, y });
  }
  return path;
}
