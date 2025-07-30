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
    // make a current word variable
    let currentWord = '';

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

    ];

    // Initialize game elements
    const gameContainer = document.querySelector('.game-container');
    // make a current word div
    const currentWordDiv = document.createElement('div');
    // set the class for the current word div
    currentWordDiv.classList.add('current-word');
    // put currentWordDiv in the game container
    gameContainer.appendChild(currentWordDiv);
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
        testDiv.textContent = `Game paused at: ${pauseTime}`;
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
            // elapsedTime equals elapsed time plus the difference between the continue time and now
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

    // function to start the game
    function startGame() {
        // Reset the game state
        gameState = 'playing';
        // Get a random word
        randomWord = words[Math.floor(Math.random() * words.length)];
        // Update the game status display
        gameStatusDisplay.textContent = 'Running';
        // Display the pause button
        pauseGameButton.style.display = 'inline-block';
        // Display the reset button
        resetGameButton.style.display = 'inline-block';
        // Set the text in Current Word Div to the random word
        currentWordDiv.textContent = randomWord;
        // Hide the start game button
        startGameButton.style.display = 'none';
        // Start the game timer
        startTimer();
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

    // // while gameState is playing
    // while (gameState === 'playing') {
    //     // focus the game container
    //     gameContainer.focus();
    // }

    // listen for click events on the pause game button
    pauseGameButton.addEventListener('click', () => {
        // Pause the game
        gameState = 'paused';
        // get random word
        randomWord = words[Math.floor(Math.random() * words.length)];
        gameStatusDisplay.textContent = 'Paused';
        // Hide the pause button
        pauseGameButton.style.display = 'none';
        // Hide typing input
        //typingInput.style.display = 'none';
        // Set the text in Current Word Div to the random word
        currentWordDiv.textContent = randomWord;
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
        // Clear the text in Current Word Div
        currentWordDiv.textContent = '';
        // display the start game button
        startGameButton.style.display = 'inline-block';
        // Reset the game timer
        resetTimer();
    });

    // // while gameState is paused
    // while (gameState === 'paused') {
    //     // listen for click events on the start game button
    //     startGameButton.addEventListener('click', () => {
    //         // call the startGame function
    //         //startGame();
    //         // Start the game
    //         gameState = 'playing';
    //         // random word
    //         let randomWord = words[Math.floor(Math.random() * words.length)];
    //         // Update the game status display
    //         gameStatusDisplay.textContent = 'Running';
    //         // display the pause button
    //         pauseGameButton.style.display = 'inline-block';
    //         // display the reset button
    //         resetGameButton.style.display = 'inline-block';
    //         // Set the text in Current Word Div to the random word
    //         currentWordDiv.textContent = randomWord;
    //         // Hide the start game button
    //         startGameButton.style.display = 'none';
    //     });
    // }

});