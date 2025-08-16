// Import classes from classes.js
import { Char, Word, Sentence, Prompt, PInput, Timer, Scene} from './classes.js';

// Scene0 should have a title, the current date and time, and three options:
// the first option is to start the game, the second option is to play random words, and the third option??? I'm not sure yet.
export function scene0(gameContainer) {
    // options array
    let options = [];
    // Clear the game container
    gameContainer.innerHTML = null;
    // add the 'scene0' class to the gamecontainer div
    gameContainer.classList.add('scene0');
    let bContainer = document.createElement('div');
    bContainer.style.gridArea = 'b';
    gameContainer.appendChild(bContainer);
    //variable for the title
    let title = document.createElement('h1');
    // title is 'TRPG'
    title.textContent = "TRPG";
    // append the title to the game container
    bContainer.appendChild(title);
    // variable for the subtitle
    let subtitle = document.createElement('h2');
    // subtitle is 'A Typing Role Playing Game'
    subtitle.textContent = 'Navigate a simple maze using your keyboard';
    // append the subtitle to the game container
    bContainer.appendChild(subtitle);


    // display the dateTimeGrid
    //gameContainer.appendChild(dateTimeGrid);
    // Remember to rework the dateTimeGrid

    let cContainer = document.createElement('div');
    cContainer.style.gridArea = 'c';
    cContainer.classList.add('options');
    gameContainer.appendChild(cContainer);
    // Make a 'wStart' Word object
    const wStart = new Word('start');
    // Make a 'wGame' Word object
    const wGame = new Word('game','!');
    // Make a 'pStartGame' Prompt object
    const pStartGame = new Prompt(wStart, wGame);
    // Add the pStartGame to the cContainer
    cContainer.appendChild(pStartGame.div);
    // float the start game prompt
    pStartGame.float();
    // push pStartGame, pPlayRandomWords to the options array
    options.push(pStartGame);
    // Make a playerInput PInput object
    const playerInput = new PInput();
    // append the player input text area to the game container
    gameContainer.appendChild(playerInput.textarea);
    // focus on the text area
    playerInput.textarea.focus();
    // call attachOptionsFilter with the options array
    playerInput.attachOptionsFilter(options);
    
    // add keydown event listener to the document
    document.addEventListener('keydown', (e) => {
        // if the enter key is pressed
        if (e.key === 'Enter' && document.querySelectorAll('.float').length === 1) {
            let selectedOption = document.querySelector('.float');
            selectedOption.classList.add('selected');
            console.log('Selected option:', selectedOption);
            e.preventDefault();
            console.log('Enter key pressed');
            // prevent the default action
            e.preventDefault();
            // log the event
            console.log('Enter key pressed');
            // if pStartGame is selected
            if (pStartGame.div.classList.contains('selected')) {
                // log 'Start Game selected'
                console.log('Start Game selected');
                // call scene1
                startRoom(gameContainer);
                // remove the 'selected' class from pStartGame
                pStartGame.div.classList.remove('selected');
                // remove the 'scene0' class from gameContainer
                gameContainer.classList.remove('scene0');
            }
            else {
                console.log('No valid option selected');
            }
        }
    });
}

const sIntro = Sentence.fromString("You stand in a room roughly three by five meters in size. You sense the walls are made of rock, a plant is growing in the northeastern corner of the room. There are exits at the northern, eastern, and southern walls.");
const pIntro = new Prompt(sIntro);
const s1 = Sentence.fromString("From the north oppening you sense water flowing.");
const p1 = new Prompt(s1);
const s2 = Sentence.fromString("From the east oppening you sense more plantlife.");
const p2 = new Prompt(s2);
const s3 = Sentence.fromString("From the south you can hear a faint but steady dripping sound.");
const p3 = new Prompt(s3);

const scene1Prompts = [
    pIntro,
    p1,
    p2,
    p3
];

const wNorth = new Word('north');
const wEast = new Word('east');
const wSouth = new Word('south');
const wWest = new Word('west');
const wNorthEast = new Word('northeast');
const wSouthEast = new Word('southeast');
const wSouthWest = new Word('southwest');
const wNorthWest = new Word('northwest');
const pNorth = new Prompt(wNorth);
const pEast = new Prompt(wEast);
const pSouth = new Prompt(wSouth);
const pWest = new Prompt(wWest);
const pNorthEast = new Prompt(wNorthEast);
const pSouthEast = new Prompt(wSouthEast);
const pSouthWest = new Prompt(wSouthWest);
const pNorthWest = new Prompt(wNorthWest);

function startRoom(gameContainer) {
    let scene1 = new Scene(gameContainer,scene1Prompts);
    scene1.playScene();
    pNorth.func = room1S;
    pEast.func = room2W;
    pSouth.func = room3N;
    Scene.options.push(pNorth, pEast, pSouth);
    console.log('startRoom', Scene.options);
}

const r1S1 = Sentence.fromString("You enter a larger, less defined room. You can sense now that the water is flowing west, just above this room and to the north.");
const r1P1 = new Prompt(r1S1);
const r1S2 = Sentence.fromString("A ramp descends gently to the west.");
const r1P2 = new Prompt(r1S2);
const r1S3 = Sentence.fromString("A small opening to the north.");
const r1P3 = new Prompt(r1S3);
const r1S4 = Sentence.fromString("To the east you can only sense a long corridor.");
const r1P4 = new Prompt(r1S4);

const scene2Prompts = [
    r1P1,
    r1P2,
    r1P3,
    r1P4
];

function room1S(gameContainer) {
    let scene2 = new Scene(gameContainer, scene2Prompts);
    scene2.playScene();
    //pNorth.func =
    //pEast.func =
    //pSouth.func = 
    //pWest.func =
    Scene.options.push(pNorth, pEast, pWest, pSouth);
}

const r2S1 = Sentence.fromString("You follow a short hall to an intersection. To the North, the flowing water grows distant. To the south, you begin to smell the plants.");
const r2P1 = new Prompt(r2S1);

const scene3Prompts = [
    r2P1
];

function room2W(gameContainer) {
    let scene3 = new Scene(gameContainer, scene3Prompts);
    scene3.playScene();
    //pNorth.func =
    pSouth.func = room21N;
    //pWest.func =
    setTimeout(() => {
        Scene.options.push(pNorth, pSouth, pWest);
        //console.log('room2W options:', Scene.options);
    }, 1000);
}

const r21S1 = Sentence.fromString("The hall connects to a larger natural cave. Roots grow from cracks in the walls, and an agressive moss clings to the stone everywhere it can find purchase.");
const r21P1 = new Prompt(r21S1);
const r21S2 = Sentence.fromString("The tunnel opens to the east and narrows to the west. You once again hear water dripping from somewhere west of you.");
const r21P2 = new Prompt(r21S2);
const r21S3 = Sentence.fromString("To the east, you sense more life. Plants rustle in a gentle breeze, while unknown critters occupy their concealment.");
const r21P3 = new Prompt(r21S3);

const scene5Prompts = [
    r21P1,
    r21P2,
    r21P3
];

function room21N(gameContainer) {
    let scene5 = new Scene(gameContainer, scene5Prompts);
    scene5.playScene();
    pEast.func = room211W;
    setTimeout(() => {
        Scene.options.push(pNorth, pEast, pWest);
    }, 1000);
}

const r211S1 = Sentence.fromString("As you approach what seems to be an oppening to the outside, you come across two dug tunnels.");
const r211P1 = new Prompt(r211S1);
const r211S2 = Sentence.fromString("The cave you're in continues to the east. You can even feel the light of day filtering in, dancing in the air. The plants are not growing where you are, but ahead of you, they thrive. The insects here seem to keep the moss at bay. The smell of moist earth sneaks into your nostrils and makes itself known.");
const r211P2 = new Prompt(r211S2);
const r211S3 = Sentence.fromString("The tunnel to the north is wider than the earlier corridors, it turns to the east about ten meters in.");
const r211P3 = new Prompt(r211S3);
const r211S4 = Sentence.fromString("The tunnel to the south is narrow and arrives at a small room. It all smells heavily of moss.");
const r211P4 = new Prompt(r211S4);

const scene6Prompts = [
    r211P1,
    r211P2,
    r211P3,
    r211P4
];

function room211W(gameContainer) {
    let scene6 = new Scene(gameContainer, scene6Prompts);
    scene6.playScene();
    pNorth.func = room2111W;
    pEast.func = room2112W;
    setTimeout(() => {
        Scene.options.push(pNorth, pSouth, pEast);
    }, 1000);
}

const r2112S1 = Sentence.fromString("You finally smell the outside air, just before sensing the opening in the earth above. Forty or fifty meters out of reach, a narrow ravine cuts the cave ceiling revealing the sounds of nature and the hue of a bright sky. Indeed the light of day, a gentle breeze, and a steady flow of ground water allows life here to flourish.");
const r2112P1 = new Prompt(r2112S1);
const r2112S2 = Sentence.fromString("A large centipede captures a spider, elsewhere two cold blooded lizards fight.");
const r2112S3 = Sentence.fromString("A territory dispute?");
const r2112P2 = new Prompt(r2112S2);
const r2112S4 = Sentence.fromString("There is no way forward. The walls are too steep, too slick with moss. You can't climb out this way.");
const r2112P3 = new Prompt(r2112S3);

const scene10Prompts = [
    r2112P1,
    r2112P2,
    r2112P3
];

const sEvent1 = Sentence.fromString("Witness the lizards fight");
const pEvent1 = new Prompt(sEvent1);

function room2112W(gameContainer) {
    const scene10 = new Scene(gameContainer, scene10Prompts);
    scene10.playScene();
    pWest.func = room211E;
    pEvent1.func = event1;
    setTimeout(() => {
        Scene.options.push(pWest, pEvent1);
    }, 1000);
}

const r211S5 = Sentence.fromString("You return the way you came from. The fresh mountain air gives way to a slower colder atmosphere.")
const r211P5 = new Prompt(r211S5);
const r211S6 = Sentence.fromString("You arrive back at the tunnel intersecting this cave.");
const r211P6 = new Prompt(r211S6);

const r211PrevPrompts = [
    r211P3,
    r211P4
];

function room211E(gameContainer) {
    let scene11 = new Scene(gameContainer, scene11Prompts);
    scene11.playScene();
    scene11.loadPrevComplete(r211PrevPrompts);
    pNorth.func = room2111W;
    setTimeout(() => {
        Scene.options.push(pNorth);
    }, 1000);
}

const e1S1 = Sentence.fromString("You watch as the lizards fight, their movements quick and agile.");
const e1P1 = new Prompt(e1S1);

const e1Prompts = [
    e1P1
];

function event1(gameContainer) {
    scene10.playEvent(e1Prompts);
    setTimeout(() => {
        Scene.options.push(pWest, pEvent1);
    }, 1000);
}

const r2111S1 = Sentence.fromString("You follow the tunnel north, turn right and reach the bottom of a stairs. You reach out and touch the wall, sensing it's not the rough rock of the cave anymore. The walls here are carved with a large hexagonal grid. The stairs end at a short landing with a single door to the east.");
const r2111P1 = new Prompt(r2111S1);
const r2111S2 = Sentence.fromString("Beyond the door you only sense a faint warmth. You open the door and enter a large room. There is a shortwall separating this door from the rest of the room, chairs lay about in two piles. Heavy dust suggests that no human has been here in a long time. The walls here display intricate carvings and sound echoes softly. Two doors, one heavy and one light stand closed to the northeast and east respectively.");
const r2111P2 = new Prompt(r2111S2);
const r2111S3 = Sentence.fromString("You sense nothing from the heavy northeast door");
const r2111P3 = new Prompt(r2111S3);
const r2111S4 = Sentence.fromString("The warmth of daylight exudes from the eastern door.");
const r2111P4 = new Prompt(r2111S4);

const scene7Prompts = [
    r2111P1,
    r2111P2,
    r2111P3,
    r2111P4
];

function room2111W(gameContainer) {
    let scene7 = new Scene(gameContainer, scene7Prompts);
    scene7.playScene();
    pEast.func = room21112E;
    setTimeout(() => {
        Scene.options.push(pEast);
    }, 1000);
}

const r21112S1 = Sentence.fromString("As you open the door and cross it's threshold, a gentle warmth envelops you. The air here holds all the scents of the mountain.");
const r21112P1 = new Prompt(r21112S1);
const r21112S2 = Sentence.fromString("There are only a single door to the north and a large set of stairs ascending some thirty meters to the outside.");
const r21112P2 = new Prompt(r21112S2);
const r21112S3 = Sentence.fromString("The words \"Staff Only\" are written on the door.");
const r21112P3 = new Prompt(r21112S3);

const scene8Prompts = [
    r21112P1,
    r21112P2,
    r21112P3
];

function room21112E(gameContainer) {
    let scene8 = new Scene(gameContainer, scene8Prompts);
    scene8.playScene();
    pEast.func = exit;
    setTimeout(() => {
        Scene.options.push(pEast);
    }, 1000);
}

const exitS1 = Sentence.fromString("The sounds of the mountain echo down the stairs as you ascend. You reach the light of day, the warmth spreading over you. You can hear it all clearly now, small creatures sneak through the refuge of vegetation, birds of all kinds fly in and out of the trees, a river flows nearby.");
const exitP1 = new Prompt(exitS1);
const exitS2 = Sentence.fromString("You reach the top of the stairs, stepping out of this unknown cave structure and into the wilds of an unknown mountain");
const exitP2 = new Prompt(exitS2);
const exitS3 = Sentence.fromString("Life is all around you now. The river flows eastwards, it must be nearby. You sense a pack of dogs higher up, to the northwest. Something bigger is moving down the mountian to the south. You witness a raptor diving bellow the canopy to the east. A sharp moment later, prey in talon, the predator ascends.");
const exitP3 = new Prompt(exitS3);

const scene9Prompts = [
    exitP1,
    exitP2,
    exitP3
];

function exit(gameContainer) {
    let scene9 = new Scene(gameContainer, scene9Prompts);
    scene9.playScene();
}

const r3S1 = Sentence.fromString("You enter a larger, less defined room. You can sense many plants to the east and beyond. The dripping is coming from a small opening in the southern wall.");
const r3P1 = new Prompt(r3S1);
const r3S2 = Sentence.fromString("A ramp descends gently to the west.");
const r3P2 = new Prompt(r3S2);
const scene4Prompts = [
    r3P1,
    r3P2
];

function room3N(gameContainer) {
    let scene4 = new Scene(gameContainer, scene4Prompts);
    scene4.playScene();
    //pNorth.func =
    //pSouth.func =
    //pWest.func =
    Scene.options.push(pNorth, pSouth, pWest);
}