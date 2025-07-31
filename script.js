// Import the joe object from classes.js
import {Char, SpecChar, Word, Sentence} from './classes.js';

// JavaScript code for the Typing Role-Playing Game (TRPG)
// listen for the DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize game variables
    // characterName = 'Hero'; // Default character name
    let characterName = 'Hero'; // Default character name
    // gameState = 'paused'; // Default game state
    let gameState = 'paused'; // Default game state
    // currentLevel = 0; // Default current level
    let currentLevel = 0; // Default current level
    // score = 0; // Default score
    let score = 0; // Default score
    // bestWPM = 0; // Default best words per minute
    let bestWPM = 0; // Default best words per minute
    // avgWPM = 0; // Default average words per minute
    let avgWPM = 0; // Default average words per minute
    // runTime = 0; // Default run time
    let runTime; // Default run time
    // randomWord = ''; // Default random word
    let randomWord = 'random'; // Default random word
    // Initialize the game timer
    let timerInterval;
    // Initialize gameStartTimeStamp and gameEndTimeStamp
    let gameStartTimeStamp;
    let gameEndTimeStamp;
    // Initialize the elapsed time
    let elapsedTime;
    // init pauseTime
    let pauseTime;
    // Init continueTime
    let continueTime;

    // Array of words for the game
    const words = [
        "adventure",
        "mystery",
        "exploration",
        "fantasy",
        "quest",
        "hero",
        "villain",
        "battle",
        "magic",
        'sword',
        'shield',
        'dragon',
        'castle',
        'dungeon',
        'treasure',

    ];

    // Initialize game elements
    const gameContainer = document.querySelector('.game-container');
    // make a current prompt div
    const currentPromptDiv = document.createElement('div');
    // set the class for the current prompt div
    currentPromptDiv.classList.add('current-prompt');
    // put currentPromptDiv in the game container
    gameContainer.appendChild(currentPromptDiv);
    // get the user input element
    const userInput = document.getElementById('user-input');
    // start game button
    const startGameButton = document.querySelector('#start-game');
    // continue game button
    const continueGameButton = document.querySelector('#continue-game');
    // game status display
    const gameStatusDisplay = document.querySelector('#game-status');
    // pause game button
    const pauseGameButton = document.getElementById('pause-game');
    // reset game button
    const resetGameButton = document.getElementById('reset-game');
    // test div
    const testDiv = document.querySelector('.test-div');
    // date block
    const dateBlock = document.getElementById('date-block');
    // time block
    const timeBlock = document.getElementById('time-block');

    // format the date to YYYY-MM-DD
    const formattedDate = new Date().toISOString().split('T')[0];
    // set the text content of the date block
    dateBlock.textContent = formattedDate;
    // program the time block to update every second using setInterval
    setInterval(function() {
        // format the time to HH:MM:SS
        let formattedTime = new Date().toTimeString().split(' ')[0];
        // set the text content of the time block
        timeBlock.textContent = formattedTime;    
    }, 999); // update every 999 milliseconds

    // program the game timer
    const gameTimer = document.getElementById('game-timer');
    // program the game start time
    const gameStartTime = document.getElementById('game-start-time');
    // program the game pause time
    const gamePauseTime = document.getElementById('game-pause-time');
    // program the game end time
    const gameEndTime = document.getElementById('game-end-time');
    // program the total run time
    const totalRunTime = document.getElementById('total-run-time');

    // function to add a class to an element

    // function to remove a class from an element

    // function to format the word
    function formatWord(word) {
        // make a word div with each character in a span
        const wordDiv = document.createElement('div');
        // add the class 'word' to the word div
        wordDiv.classList.add('word');

        word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            // set the class for the character span
            charSpan.classList.add('char');
            charSpan.textContent = char;
            wordDiv.appendChild(charSpan);
        });
        return wordDiv;
    }

    // Function to start the game timer
    function startTimer() {
        // gameStartTimeStamp
        gameStartTimeStamp = new Date();
        // set the game start time to the current time
        gameStartTime.textContent = gameStartTimeStamp.toTimeString().split(' ')[0];
        // set the test div to the game start time
        //testDiv.textContent = `Game started at: ${gameStartTimeStamp.toString()}`;

        // start the timer interval
        timerInterval = setInterval(function() {
            // get the difference between the current time and the game start time
            elapsedTime = new Date() - gameStartTimeStamp;
            // set the test div to the elapsed time
            //testDiv.textContent = `Elapsed time: ${elapsedTime} seconds`;
            // format the time as MM:SS:DS
            let formattedTime = `${(Math.floor(elapsedTime / 60000)).toString().padStart(2, '0')}:${(Math.floor(elapsedTime / 1000) % 60).toString().padStart(2, '0')}:${(Math.floor(elapsedTime / 100) % 10).toString().padStart(1, '0')}`;
            // set the text content of the game timer
            gameTimer.textContent = formattedTime;
        }, 17); // update every 17 milliseconds
    }

    // function to stop the game timer
    function pauseTimer() {
        // getthe pauseTime
        pauseTime = new Date();
        // runTime equals the difference between the pause time and the game start time
        runTime = pauseTime - gameStartTimeStamp;
        // set the test div to the pause time
        //testDiv.textContent = `Game paused at: ${pauseTime}`;
        // stop the timer interval
        clearInterval(timerInterval);
        // gamePauseTime
        gamePauseTime.textContent = pauseTime.toTimeString().split(' ')[0];
        // set the total run time
        totalRunTime.textContent = `${Math.floor(runTime / 60000)}:${String(Math.floor(runTime / 1000) % 60).padStart(2, '0')}`;

    }

    // function to continue the game timer
    function continueTimer() {
        // get the continue time
        continueTime = new Date();
        // start the timer interval
        timerInterval = setInterval(function() {
            // elapsedTime increases by 17 milliseconds
            elapsedTime += 17; // 17 milliseconds
            // set the test div to the elapsed time
            //testDiv.textContent = `Elapsed time: ${elapsedTime} seconds`;
            // format the time as MM:SS:DS
            let formattedTime = `${(Math.floor(elapsedTime / 60000)).toString().padStart(2, '0')}:${(Math.floor(elapsedTime / 1000) % 60).toString().padStart(2, '0')}:${(Math.floor(elapsedTime / 100) % 10).toString().padStart(1, '0')}`;
            // set the text content of the game timer
            gameTimer.textContent = formattedTime;
        }, 17); // update every 17 milliseconds
    }

    // function to reset the game timer
    function resetTimer() {
        // stop the timer interval
        clearInterval(timerInterval);
        // reset start and end times
        gameStartTime.textContent = '00:00';
        gameEndTime.textContent = '00:00';
        // reset game timer display
        gameTimer.textContent = '00:00';
        // reset timestamps
        gameStartTimeStamp = null;
        gameEndTimeStamp = null;
    }
    
    // Function to get a random word from the words array
    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    // function to create the typing prompt
    function createTypingPrompt() {
        // Clear the current prompt div
        currentPromptDiv.textContent = '';
        // Make a 'prompt' Sentence object
        const prompt = new Sentence();
        // get three random words from the words array
        for (let i = 0; i < 3; i++) {
            // Create a new Word object with a random word
            const randomWord = new Word(getRandomWord());
            // add the word to the prompt
            prompt.addWord(randomWord);
        }
        // append the prompt to the current prompt div
        currentPromptDiv.appendChild(prompt.div);
        // make the prompt current
        prompt.isCurrent().then(() => {
            // complete the prompt
            promptComplete();
        });
    }

    // function to complete the prompt
    function promptComplete() {
        // pause the game
        gameState = 'paused';
        // Update the game status display
        gameStatusDisplay.textContent = 'Completed';
        // Hide the pause button
        pauseGameButton.style.display = 'none';
        // pause the game timer
        pauseTimer();
    }

    // function to start the game
    function startGame() {
        // Reset the game state
        gameState = 'playing';
        // Get a random word
        randomWord = words[Math.floor(Math.random() * words.length)];
        // Update the game status display
        gameStatusDisplay.textContent = 'Playing';
        // Display the pause button
        pauseGameButton.style.display = 'inline-block';
        // Display the reset button
        resetGameButton.style.display = 'inline-block';
        // create the typing prompt
        createTypingPrompt();
        // Hide the start game button
        startGameButton.style.display = 'none';
        // Start the game timer
        startTimer();
        // focus on the current word div
        //userInput.focus();
    }

    // listen for click events on the start game button
    startGameButton.addEventListener('click', () => {
        // Call the startGame function
        startGame();
        
    });

    // listen for click events on the continue game button
    continueGameButton.addEventListener('click', () => {
        // Continue the game
        gameState = 'playing';
        gameStatusDisplay.textContent = 'Running';
        // display the pause button
        pauseGameButton.style.display = 'inline-block';
        // display the reset button
        resetGameButton.style.display = 'inline-block';
        // Hide the continue game button
        continueGameButton.style.display = 'none';
        // Start the game timer
        continueTimer();
    });


    // listen for click events on the pause game button
    pauseGameButton.addEventListener('click', () => {
        // Pause the game
        gameState = 'paused';
        // Update the game status display
        gameStatusDisplay.textContent = 'Paused';
        // Hide the pause button
        pauseGameButton.style.display = 'none';
        // Hide typing input
        //typingInput.style.display = 'none';
        // display the continue game button
        continueGameButton.style.display = 'inline-block';
        // Stop the game timer
        pauseTimer();
    });

    // listen for click events on the reset game button
    resetGameButton.addEventListener('click', () => {
        // Reset the game
        gameState = 'paused';
        // get random word
        randomWord = words[Math.floor(Math.random() * words.length)];
        gameStatusDisplay.textContent = 'Game reset';
        // Hide the pause button
        pauseGameButton.style.display = 'none';
        // Hide the continue game button
        continueGameButton.style.display = 'none';
        // Hide the reset button
        resetGameButton.style.display = 'none';
        // Clear the text in Current Prompt Div
        currentPromptDiv.textContent = '';
        // display the start game button
        startGameButton.style.display = 'inline-block';
        // Reset the game timer
        resetTimer();
    });


    // // listen for keyup events on game container
    // gameContainer.addEventListener('keyup', (event) => {
    //     // constants
    //     // key input
    //     const key = event.key;
    //     // current word
    //     const currentWord = currentPromptDiv.querySelectorAll('.word.current');
    //     // current letter
    //     const currentLetter = currentPromptDiv.querySelector('.char.current');
    //     // expected
    //     const expected = currentLetter?. textContent || '';
    //     // isChar
    //     const isChar = key.length === 1 && key !== ' ';
    //     // isSpace
    //     const isSpace = key === ' ';
    //     // isBackspace
    //     const isBackspace = key === 'Backspace';
    //     // isFirstLetter
    //     const isFirstLetter = currentLetter === currentWord.firstChild;
    //
    //     // if the game is paused, do nothing
    //     if (gameState === 'paused') {
    //         return;
    //     }// else
    //     else{
    //         // log key and expected
    //         console.log(`Key input: ${key}, Expected: ${expected}`);
    //         if (isChar) {
    //             if (currentLetter) {
    //                 // check if the pressed key matches the character in the span
    //                 if (key === expected) {
    //                     // add the 'correct' class to the span
    //                     currentLetter.classList.add('correct');
    //                     if (currentLetter.nextSibling) {
    //                         currentLetter.nextSibling.classList.add('current');
    //                         currentLetter.classList.remove('current');
    //                     }
    //                     // else {
    //                     //     // If it's the last character, end the game
    //                     //     gameState = 'paused';
    //                     //     gameStatusDisplay.textContent = 'Completed';
    //                     //     pauseGameButton.style.display = 'none';
    //                     //     resetGameButton.style.display = 'inline-block';
    //                     //     // Stop the game timer
    //                     //     pauseTimer();
    //                     // }
    //                 } else {
    //                     // create new mistake span
    //                     const mistakeSpan = document.createElement('span');
    //                     mistakeSpan.textContent = key;
    //                     mistakeSpan.classList.add('incorrect', 'mistake');
    //                     // add the mistake span to the current word
    //                     currentWord.appendChild(mistakeSpan);
    //                 }
    //             }
    //         }
    //         if (isSpace) {
    //             if (expected !== '') {
    //                 // invalidate the word's remaining characters
    //                 const remainingChars = document.querySelectorAll('.word.current .char:not(.correct)');
    //                 remainingChars.forEach((char) => {
    //                     char.classList.add('incorrect');
    //                 });
    //             }
    //             // Get the current word element (single element, not NodeList)
    //             const currentWordElem = currentPromptDiv.querySelector('.word.current');
    //             if (currentWordElem) {
    //                 // Remove 'current' class from current word
    //                 currentWordElem.classList.remove('current');
    //                 // Remove 'current' class from current letter
    //                 const currentCharElem = currentWordElem.querySelector('.char.current');
    //                 if (currentCharElem) {
    //                     currentCharElem.classList.remove('current');
    //                 }
    //                 // Advance to next word
    //                 const nextWordElem = currentWordElem.nextSibling;
    //                 if (nextWordElem && nextWordElem.classList.contains('word')) {
    //                     nextWordElem.classList.add('current');
    //                     // Add 'current' class to the first letter of the next word
    //                     const nextCharElem = nextWordElem.querySelector('.char');
    //                     if (nextCharElem) {
    //                         nextCharElem.classList.add('current');
    //                     }
    //                 }
    //             }
    //             // Clear the user input field
    //             userInput.value = '';
    //         }
    //             currentWord[0]?.nextSibling?.firstChild?.classList.add('current');
    //         }
    // });

    
});