// Import the joe object from classes.js
import {Char, SpecChar, Word, Sentence, Prompt, GameInput} from './classes.js';

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
    // typedWords = 0; // Default score
    let typedWords = 0; // Default score
    // bestWPM = 0; // Default best words per minute
    let bestWPM = 0; // Default best words per minute
    // avgWPM = 0; // Default average words per minute
    let avgWPM = 0; // Default average words per minute
    // runTime = 0; // Default run time
    let runTime; // Default run time
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
    // Init selection
    let selection;

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
        'monster',
        'spell',
        'potion',
        'knight',
        'archer',
        'wizard',
        'elf',
        'orc',
        'goblin',
        'troll',
        'fairy',
        'giant',
        'hydra',
        'phoenix',
        'griffin',
        'goddess',
        'god',
        'myth',
        'legend',
        'fable',
        'tale',

    ];

    // test sentence
    const testSentence = 'the quick brown fox jumps over the lazy dog.';

    // Initialize game elements
    const gameContainer = document.querySelector('.game-container');
    // // make a current prompt div
    // const currentPromptDiv = document.createElement('div');
    // // set the class for the current prompt div
    // currentPromptDiv.classList.add('current-prompt');
    // // put currentPromptDiv in the game container
    // gameContainer.appendChild(currentPromptDiv);
    // game status display
    const gameStatusDisplay = document.querySelector('#game-status');
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
    // Make a playerInput GameInput object
    const playerInput = new GameInput(gameContainer);
    // input handler
    const inputHandler = (e) => {
        // if the input value is enter
        playerInput.submit.onclick = (clickEvent) => {
            clickEvent.preventDefault();
            try {
                // log 'Input value: Enter' to the console
                //console.log('Input value: Enter');
                // query the first prompt with the floating class
                const floatingPrompt = document.querySelector('.floating');
                // if the floating prompt exists
                if (floatingPrompt) {
                    // select the floating prompt
                    selection = floatingPrompt;
                    // log the floating prompt
                    console.log('Floating prompt found:', floatingPrompt);
                    // clear the input value
                    playerInput.input.value = '';
                    // resolve the floating prompt
                    floatingPrompt.classList.add('resolved');
                    // reject all other prompts
                    options.forEach(opt => {
                        if (opt.div !== floatingPrompt) {
                            opt.div.classList.add('rejected');
                        }
                    });
                } else {
                    // log an error if no floating prompt is found
                    console.error('No floating prompt found');
                }
            } catch (error) {
                // log any errors to the console
                console.error('Error querying floating prompt:', error);
            }
        }
        const value = e.target.value.toLowerCase();
        options.forEach(opt =>{
            // console.log(opt.div.className);
            const isVisible = opt.div.className.includes(value)
            opt.div.classList.toggle("hidden", !isVisible);
            opt.div.classList.toggle("floating", isVisible);
        })
        // log the input value
        console.log(`Input value: ${e.target.value}`);
    }
    // add the input event listener to the playerInput
    playerInput.input.addEventListener('input', inputHandler);
    // array of options
    const options = [];

    //function to display scene0
    function displayScene0() {
        // Clear the game container
        gameContainer.innerHTML = '';
        // append the player input form to the game container
        gameContainer.appendChild(playerInput.form);
        // Make a 'wStart' Word object
        const wStart = new Word('start');
        // Make a 'wGame' Word object
        const wGame = new Word('game','!');
        // Make a 'pStartGame' Prompt object
        const pStartGame = new Prompt(wStart, wGame);
        // Add the pStartGame to the game container
        gameContainer.appendChild(pStartGame.div);
        // float the start game prompt
        pStartGame.float(startGame);
        // Make a 'wTest' Word object
        const wTest = new Word('test');
        // Make a 'wSentence' Word object
        const wSentence = new Word('sentence');
        // Make a 'pTestSentence' Prompt object
        const pTestSentence = new Prompt(wTest, wSentence);
        // Add the pTestSentence to the game container
        gameContainer.appendChild(pTestSentence.div);
        // float the test sentence prompt
        pTestSentence.float(playTestSentence);
        // push pStartGame, pTestSentence to the options array
        options.push(pStartGame, pTestSentence);
        // focus on the player input
        playerInput.input.focus();

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
        // Make a 'randomSentence' Sentence object
        const randomSentence = new Sentence();
        // get ten random words from the words array
        for (let i = 0; i < 10; i++) {
            // Create a new Word object with a random word
            const randomWord = new Word(getRandomWord());
            // add the word to the prompt
            randomSentence.addWord(randomWord);
        }
        // Make a randomPrompt Prompt object
        const randomPrompt = new Prompt(randomSentence);
        // add the randomPrompt to the game container
        gameContainer.appendChild(randomPrompt.div);
        // logTotalWords
        randomPrompt.logTotalWords();
        // make the prompt current
        randomPrompt.isCurrent().then(() => {
            // get the number of typed words
            const typedWords = randomPrompt.div.querySelectorAll('.typed').length;
            // log the number of typed words
            console.log(`Typed words: ${typedWords}`);
            // complete the prompt
            promptComplete();
        });
    }

    // function to complete the prompt
    function promptComplete() {
        // after half a second
        setTimeout(() => {
            // clear the options array
            options.length = 0;
            // pause the game
            gameState = 'paused';
            // Update the game status display
            gameStatusDisplay.textContent = 'Completed';
            // new wReset Word object
            const wReset = new Word('reset', '!');
            // new pReset Prompt object
            const pReset = new Prompt(wReset);
            // add the pReset to the game container
            gameContainer.appendChild(pReset.div);
            // push pReset to the options array
            options.push(pReset);
            // float the reset prompt with the resetGame function
            pReset.float(resetGame);
            // pause the game timer
            pauseTimer();
            // append the player input to the game container
            gameContainer.appendChild(playerInput.form);
            // focus on the player input
            playerInput.input.focus();
        }, 500);
    }

    // function to start the game
    function startGame() {
        // Clear the game container
        gameContainer.innerHTML = '';
        // Reset the game state
        gameState = 'playing';
        // Update the game status display
        gameStatusDisplay.textContent = 'Playing';
        // create the typing prompt
        createTypingPrompt();
        // Start the game timer
        startTimer();
        // focus on the current word div
        //userInput.focus();
    }

    // function to reset the game
    function resetGame() {
        // Reset the game state
        gameState = 'paused';
        // Update the game status display
        gameStatusDisplay.textContent = 'Game reset';
        // remove the prompt div
        const currentPrompt = document.querySelector('.prompt');
        if (currentPrompt) currentPrompt.remove();
        // Reset the game timer
        resetTimer();
        // displayscene0
        displayScene0();
    }

    // Funtion to play the test sentence
    function playTestSentence() {
        // Clear the game container
        gameContainer.innerHTML = '';
        // Reset the game state
        gameState = 'playing';
        // Update the game status display
        gameStatusDisplay.textContent = 'Playing';
        // create new Sentence object with the test sentence
        const sTest = Sentence.fromString(testSentence);
        // Make a new Prompt object with the test sentence
        const pTest = new Prompt(sTest);
        // Add the pTest to the game container
        gameContainer.appendChild(pTest.div);
        // pTest is current
        pTest.isCurrent().then(() => {
            // complete the prompt
            promptComplete();
        });
        // Start the game timer
        startTimer();
    }

    // call displayScene0 to show the initial scene
    displayScene0();

});