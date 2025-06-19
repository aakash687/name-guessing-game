const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const difficultySelect = document.getElementById('difficultySelect');
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('startButton');
const gameCard = document.getElementById('gameCard');

let randomNumber;
let attempts;
let maxAttempts;
let maxNumber;

function setDifficultySettings() {
    const difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            maxNumber = 50;
            maxAttempts = 15;
            break;
        case 'medium':
            maxNumber = 100;
            maxAttempts = 10;
            break;
        case 'hard':
            maxNumber = 200;
            maxAttempts = 5;
            break;
        default:
            maxNumber = 100;
            maxAttempts = 10;
    }
    instructions.textContent = `Guess a number between 1 and ${maxNumber}. You have ${maxAttempts} attempts.`;
    guessInput.min = 1;
    guessInput.max = maxNumber;
}

function initializeGame() {
    setDifficultySettings();
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    feedback.textContent = '';
    attemptsDisplay.textContent = `Attempts left: ${maxAttempts}`;
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
}

function checkGuess() {
    const userGuess = Number(guessInput.value);
    if (!userGuess || userGuess < 1 || userGuess > maxNumber) {
        feedback.textContent = `Please enter a valid number between 1 and ${maxNumber}.`;
        return;
    }
    attempts++;
    if (userGuess === randomNumber) {
        feedback.textContent = `🎉 Congratulations! You guessed the number in ${attempts} attempts! 🎉`;
        feedback.classList.add('happy-scene');
        guessInput.disabled = true;
        guessButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
    } else if (attempts >= maxAttempts) {
        feedback.textContent = `Game over! The number was ${randomNumber}.`;
        feedback.classList.remove('happy-scene');
        guessInput.disabled = true;
        guessButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
    } else if (userGuess < randomNumber) {
        feedback.textContent = 'Too low! Try again.';
        feedback.classList.remove('happy-scene');
        attemptsDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;
    } else {
        feedback.textContent = 'Too high! Try again.';
        feedback.classList.remove('happy-scene');
        attemptsDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;
    }
    guessInput.value = '';
    guessInput.focus();
}

function flipCard() {
    gameCard.classList.add('flipped');
}

startButton.addEventListener('click', () => {
    flipCard();
    initializeGame();
});

guessButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', () => {
    gameCard.classList.remove('flipped');
    feedback.textContent = '';
    attemptsDisplay.textContent = '';
    guessInput.value = '';
});
