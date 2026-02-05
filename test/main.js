const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dice1El = document.querySelector('.dice-1');
const dice2El = document.querySelector('.dice-2');

const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const TARGET_SCORE = 100;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    playing = true;

    activePlayer = Math.random() < 0.5 ? 0 : 1;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    dice1El.classList.add('hidden');
    dice2El.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    document.querySelector(`.player--0`).classList.remove('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice1 = Math.trunc(Math.random() * 6) + 1;
        const dice2 = Math.trunc(Math.random() * 6) + 1;

        dice1El.classList.remove('hidden');
        dice2El.classList.remove('hidden');

        dice1El.src = dice1;
        dice2El.src =  dice2;

        if (dice1 === dice2) {
            scores[activePlayer] = 0;
            document.getElementById(`score--${activePlayer}`).textContent = 0;
            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            switchPlayer();
        } else {
            const rollSum = dice1 + dice2;
            currentScore = rollSum;
            scores[activePlayer] += rollSum;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            document.getElementById(`current--${activePlayer}`).textContent = rollSum;

            if (scores[activePlayer] >= TARGET_SCORE) {
                playing = false;
                dice1El.classList.add('hidden');
                dice2El.classList.add('hidden');

                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

                const winnerName = activePlayer === 0 ? "Ron" : "Dani";
                alert(`${winnerName} wins! The loser guards the fridge.`);
            }
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        switchPlayer();
    }
});

btnNew.addEventListener('click', init);


// מכאן זה בונוס
const saveGame = function () {
    if (!playing)
        return alert('Unable to save the game');

    const gameState = {
        scores: scores,
        currentScore: currentScore,
        activePlayer: activePlayer,
        Data: new Date().toISOString()
    };

    localStorage.setItem('8200Dicegame', JSON.stringify(gameState));
    alert('Game Saved Successfully and good shabes')

}
