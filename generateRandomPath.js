export function generateRandomPath(){
    const gridSize = document.getElementById('grid-size').value;
    let path = [];
    let x = 0, y = 0;
    while (x < gridSize - 1 || y < gridSize - 1){
        if (x < gridSize - 1 && y < gridSize - 1){
            if (Math.random() < 0.5){
                x += 1;
            } 
            else{
                y += 1;
            }
        } else if (x < gridSize - 1){
            x += 1;
        } 
        else if (y < gridSize - 1){
            y += 1;
        }
        path.push({ x, y });
    }
    return path;
}