// Losing Animation
function triggerLosingAnimation(){
    const gridItems = document.querySelectorAll('.grid-item');
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'You Lost!';
    messageElement.classList.add('losing');
    gridItems.forEach(item => {
        if (item.style.backgroundColor === 'red') {
            item.classList.add('losing');
        }
    });
    document.body.classList.add('screen-shake'); // Shake the Screen on Losing
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.classList.remove('losing');
    }, 2000);
    setTimeout(() => document.body.classList.remove('screen-shake'), 2000); // Stops the shaking and the "You Lost" message after 2 seconds
}