// Winning Animation
export function triggerWinningAnimation(){
    const gridItems = document.querySelectorAll('.grid-item');
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'You Won!';
    messageElement.classList.add('winning');
    gridItems.forEach(item => {
        if (item.style.backgroundColor === 'green') {
            item.classList.add('winning');
        }
    });
    setTimeout(() => {
        messageElement.textContent = ''; 
        messageElement.classList.remove('winning');
    }, 2000); 
    setTimeout(() => document.body.classList.remove('screen-shake'), 2000); // Stops "You Won" message after 2 seconds
}