// Winning Animation
import { postScore } from './postScore.js';
export function triggerWinningAnimation(){
  postScore();
  const gridItems = document.querySelectorAll('.grid-item');
  const messageElement = document.getElementById('message');
  messageElement.textContent = 'You Won!';
  messageElement.classList.add('winning');
  gridItems.forEach((item) => {
    if (item.style.backgroundColor === 'green') {
      item.classList.add('winning');
    }
  });
  setTimeout(() => {
    messageElement.textContent = '';
    messageElement.classList.remove('winning');
  }, 2000);
  setTimeout(() => document.body.classList.remove('screen-shake'), 2000);
}
