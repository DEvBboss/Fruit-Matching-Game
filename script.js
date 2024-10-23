// script.js
document.addEventListener('DOMContentLoaded', () => {
  const fruits = ['🍎', '🍌', '🍊', '🍉', '🍎', '🍌', '🍊', '🍉'];
  let grid = document.getElementById('grid');
  let firstCard = null;
  let secondCard = null;
  let matches = 0;
  let startTime = null;
  let timerInterval = null;

  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function startTimer() {
      startTime = Date.now();
      timerInterval = setInterval(() => {
          let elapsed = Math.floor((Date.now() - startTime) / 1000);
          document.getElementById('time').textContent = elapsed;
      }, 1000);
  }

  function stopTimer() {
      clearInterval(timerInterval);
      let elapsed = Math.floor((Date.now() - startTime) / 1000);
      let bestTime = localStorage.getItem('bestTime');
      if (!bestTime || elapsed < bestTime) {
          localStorage.setItem('bestTime', elapsed);
          document.getElementById('best-time').textContent = elapsed + ' seconds';
      }
  }

  function createBoard() {
      shuffle(fruits);
      fruits.forEach(fruit => {
          let card = document.createElement('div');
          card.classList.add('card', 'hidden');
          card.dataset.fruit = fruit;
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
      });
      if (!localStorage.getItem('bestTime')) {
          document.getElementById('best-time').textContent = 'N/A';
      } else {
          document.getElementById('best-time').textContent = localStorage.getItem('bestTime') + ' seconds';
      }
  }

  function flipCard() {
      if (this === firstCard || this.classList.contains('matched')) return;
      this.classList.remove('hidden');
      this.textContent = this.dataset.fruit;

      if (!firstCard) {
          firstCard = this;
          if (!startTime) startTimer();
      } else {
          secondCard = this;
          checkForMatch();
      }
  }

  function checkForMatch() {
      if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          matches++;
          if (matches === fruits.length / 2) {
              stopTimer();
          }
          firstCard = null;
          secondCard = null;
      } else {
          setTimeout(() => {
              firstCard.classList.add('hidden');
              secondCard.classList.add('hidden');
              firstCard.textContent = '';
              secondCard.textContent = '';
              firstCard = null;
              secondCard = null;
          }, 1000);
      }
  }

  createBoard();
});
