const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const levelSelect = document.getElementById('level');

const emojiPool = ['😀', '🐶', '🍕', '🚗', '🎵', '🌟', '🍎', '🏀', '🐱', '🎲', '🍔', '📚', '✈️', '🧃', '💡', '🐸', '⚽', '🌈'];

let cards = [], revealed = [], matched = [], wrongTries = 0;

function getCardCountByLevel(level) {
    switch (level) {
      case 'easy': return 8;
      case 'medium': return 16;
      case 'hard': return 24;
      case 'extreme': return 36;
      default: return 16;
    }
  }
  

function updateScore() {
  scoreDisplay.innerText = `Wrong Tries: ${wrongTries}`;
}

function adjustGridStyle(totalCards) {
  const size = Math.round(Math.sqrt(totalCards));
  grid.style.gridTemplateColumns = `repeat(${size}, 80px)`;
}

function createBoard() {
  grid.innerHTML = '';
  cards = [];
  revealed = [];
  matched = [];
  wrongTries = 0;
  updateScore();

  const level = levelSelect.value;
  const totalCards = getCardCountByLevel(level);
  const pairCount = Math.floor(totalCards / 2);
  let emojis = [...emojiPool.slice(0, pairCount), ...emojiPool.slice(0, pairCount)];

  if (totalCards % 2 !== 0) emojis.push('❓');
  emojis = emojis.sort(() => 0.5 - Math.random());

  emojis.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.innerText = '';
    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
    cards.push(card);
  });

  adjustGridStyle(totalCards);
}

function flipCard(card) {
  if (revealed.length === 2 || revealed.includes(card) || matched.includes(card)) return;

  card.classList.add('revealed');
  card.innerText = card.dataset.emoji;
  revealed.push(card);

  if (revealed.length === 2) {
    const [a, b] = revealed;
    if (a.dataset.emoji === b.dataset.emoji) {
      matched.push(a, b);
      revealed = [];
    } else {
      wrongTries++;
      updateScore();
      setTimeout(() => {
        a.classList.remove('revealed');
        b.classList.remove('revealed');
        a.innerText = '';
        b.innerText = '';
        revealed = [];
      }, 800);
    }
  }
}

function restartGame() {
  createBoard();
}


document.addEventListener('DOMContentLoaded', () => {
  createBoard();
});
