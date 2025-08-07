// Import classes from classes.js
import { Char, Word, Sentence, Prompt, PInput, Timer} from './classes.js';
// Import functions from minaMurraysJournalSixAugust.js
import { scene0, playRandomWords, scene1, scene2, scene3, scene4 } from './minaMurraysJournalSixAugust.js';

// listen for the DOM to load
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

    

    // Initialize game elements
    const gameContainer = document.querySelector('.game-container');
    // game status display
    const gameStatusDisplay = document.querySelector('#game-status');
    // test div
    const testDiv = document.querySelector('.test-div');
    // dateTimeGrid
    const dateTimeGrid = document.createElement('div');
    // set the class for the dateTimeGrid
    dateTimeGrid.classList.add('date-time-grid');
    // date block
    const dateBlock = document.createElement('b');
    dateBlock.id = 'date-block';
    // append the date block to the dateTimeGrid
    dateTimeGrid.appendChild(dateBlock);
    // time block
    const timeBlock = document.createElement('b');
    timeBlock.id = 'time-block';
    // append the time block to the dateTimeGrid
    dateTimeGrid.appendChild(timeBlock);
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

    // call scene0 to start the game
    scene0(gameContainer);


});