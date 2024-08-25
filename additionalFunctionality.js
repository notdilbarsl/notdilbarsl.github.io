let gridSize = 3;
let grid = [];
let playerPos = { x: 0, y: 0 };
document.getElementById('grid-container').style.display = 'none';
document.getElementById('message').style.display = 'none';
document.getElementById('grid-container').style.display = 'none';
document.getElementById('message').style.display = 'none';
document.getElementById('mine-count').addEventListener('focus',chooseGridSize);
document.getElementById('grid-size').addEventListener('change', chooseNumberOfMine);
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        movePlayer('up');
    } else if (event.key === 'ArrowDown') {
        movePlayer('down');
    } else if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    }
});