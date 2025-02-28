'use strict';

// Selecting eLements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const gameRules = document.querySelector('.game-rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const overlay2 = document.querySelector('.overlay2');
const btnClose = document.querySelector('.btn-close');
const btnAccept = document.querySelector('.btn-accept');
const btnPlayer = document.querySelector('.btn--player');
const modal2 = document.querySelector('form .modal');

const playerOneName = document.getElementById('name--0');
const playerTwoName = document.getElementById('name--1');
const playerOneInput = document.getElementById('player1');
const playerTwoInput = document.getElementById('player2');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  playerOneName.textContent = 'Player 1';
  playerTwoName.textContent = 'Player 2';

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;
    // diceEl.setAttribute('src', `dice-${diceNum}.png`);

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      // current0El.textContent = currentScore;    // CHANGE LATER
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      // CONFETTI EFFECT
      const end = Date.now() + 3 * 1000;
      const colors = ['#bb0000', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

gameRules.addEventListener('click', openModal);

btnClose.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

const openPlayerModal = function () {
  modal2.classList.remove('hidden');
  overlay2.classList.remove('hidden');
};

const closePlayerModal = function () {
  modal2.classList.add('hidden');
  overlay2.classList.add('hidden');
};

btnPlayer.addEventListener('click', openPlayerModal);

btnAccept.addEventListener('click', closePlayerModal);

overlay2.addEventListener('click', closePlayerModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

document.getElementById('player-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Extract values
  const playerOneValue = playerOneInput.value.trim();
  const playerTwoValue = playerTwoInput.value.trim();

  if (playerOneValue && playerTwoValue) {
    playerOneName.textContent = playerOneValue;
    playerTwoName.textContent = playerTwoValue;
  }

  playerOneInput.value = '';
  playerTwoInput.value = '';
});
