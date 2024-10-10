// Losing Animation
export function triggerLosingAnimation(){
  const roundNumber = parseInt(document.getElementById('tries').textContent,10);
  document.getElementById('tries').textContent = roundNumber + 1;
  const gridItems = document.querySelectorAll('.grid-item');
  const messageElement = document.getElementById('message');
  messageElement.textContent = 'You Lost!';
  messageElement.classList.add('losing');
  gridItems.forEach((item) => {
    if (item.style.backgroundColor === 'red') {
      item.classList.add('losing');
    }
  });
  document.body.classList.add('screen-shake');
  setTimeout(() => {
    messageElement.textContent = '';
    messageElement.classList.remove('losing');
  }, 2000);
  setTimeout(() => document.body.classList.remove('screen-shake'), 2000);
}
