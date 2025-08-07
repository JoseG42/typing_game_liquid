// Import classes from classes.js
import { Char, Word, Sentence, Prompt, PInput, Timer} from './classes.js';
// I'm not sure that I need to import these here but I think it's okay, I don't think it hurts anything.

// Functions to export to use in script.js to generate the prompts to type through
// Mina Murray's Journal entry from 6 August from Dracula by Bram Stoker

// Scene0 should have a title, the current date and time, and three options:
// the first option is to start the game, the second option is to play random words, and the third option??? I'm not sure yet.
export function scene0(gameContainer) {
    // options array
    const options = [];
    // Clear the game container
    gameContainer.innerHTML = null;
    //variable for the title
    let title = document.createElement('h1');
    // title is 'TRPG'
    title.textContent = "Mina Murray's Journal";
    // append the title to the game container
    gameContainer.appendChild(title);
    // variable for the subtitle
    let subtitle = document.createElement('h2');
    // subtitle is 'A Typing Role Playing Game'
    subtitle.textContent = '6 August';
    // append the subtitle to the game container
    gameContainer.appendChild(subtitle);


    // display the dateTimeGrid
    //gameContainer.appendChild(dateTimeGrid);
    // Remember to rework the dateTimeGrid


    // Make a 'wStart' Word object
    const wStart = new Word('start');
    // Make a 'wGame' Word object
    const wGame = new Word('game','!');
    // Make a 'pStartGame' Prompt object
    const pStartGame = new Prompt(wStart, wGame);
    // Add the pStartGame to the game container
    gameContainer.appendChild(pStartGame.div);
    // float the start game prompt
    pStartGame.float();
    // Make a 'wPlay' Word object
    const wPlay = new Word('play');
    // Make a 'wRandom' Word object
    const wRandom = new Word('random');
    // Make a 'wWords' Word object
    const wWords = new Word('words');
    // Make a 'pPlayRandomWords' Prompt object
    const pPlayRandomWords = new Prompt(wPlay, wRandom, wWords);
    // Add the pPlayRandomWords to the game container
    gameContainer.appendChild(pPlayRandomWords.div);
    // float the play random words prompt
    pPlayRandomWords.float();
    // push pStartGame, pPlayRandomWords to the options array
    options.push(pStartGame, pPlayRandomWords);
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
                scene1(gameContainer);
                // remove the 'selected' class from pStartGame
                pStartGame.div.classList.remove('selected');
            }
            // if pPlayRandomWords is selected
            else if (pPlayRandomWords.div.classList.contains('selected')) {
                // log 'Play Random Words selected'
                console.log('Play Random Words selected');
                // call playRandomWords
                playRandomWords(gameContainer);
                // remove the 'selected' class from pPlayRandomWords
                pPlayRandomWords.div.classList.remove('selected');
            }
            else {
                console.log('No valid option selected');
            }
        }
    });





}

// Scene1 is the first paragraph of Mina's journal entry
export function scene1(gameContainer) {
    // Clear the game container
    gameContainer.innerHTML = null;
    // Create a new Sentence from the first sentence as a string
    const s1 = Sentence.fromString("Another three days, and no news.");
    // Create the second sentence
    const s2 = Sentence.fromString("This suspense is getting dreadful.");
    // Create the third sentence
    const s3 = Sentence.fromString("If I only knew where to write to or where to go to, I should feel easier; but no one has heard a word of Jonathan since that last letter.");
    // Fourth
    const s4 = Sentence.fromString("I must only pray to God for patience.");
    // Fifth
    const s5 = Sentence.fromString("Lucy is more excitable than ever, but is otherwise well.");
    // Sixth
    const s6 = Sentence.fromString("Last night was very threatening, and the fishermen say that we are in for a storm.");
    // Seventh
    const s7 = Sentence.fromString("I must try to watch it and learn the weather signs.");
    // Eighth
    const s8 = Sentence.fromString("To-day is a grey day, and the sun as I write is hidden in thick clouds, high over Kettleness.");
    // Ninth
    const s9 = Sentence.fromString("Everything is grey—except the green grass, which seems like emerald amongst it; grey earthy rock; grey clouds, tinged with the sunburst at the far edge, hang over the grey sea, into which the sand-points stretch like grey fingers.");
    // Tenth
    const s10 = Sentence.fromString("The sea is tumbling in over the shallows and the sandy flats with a roar, muffled in the sea-mists drifting inland.");
    // Eleventh
    const s11 = Sentence.fromString("The horizon is lost in a grey mist.");
    // Twelfth
    const s12 = Sentence.fromString("All is vastness; the clouds are piled up like giant rocks, and there is a \"brool\" over the sea that sounds like some presage of doom.");
    // Thirteenth
    const s13 = Sentence.fromString("Dark figures are on the beach here and there, sometimes half shrouded in the mist, and seem \"men like trees walking.\"");
    // Fourteenth
    const s14 = Sentence.fromString("The fishing-boats are racing for home, and rise and dip in the ground swell as they sweep into the harbour, bending to the scuppers.");
    // Fifteenth
    const s15 = Sentence.fromString("Here comes old Mr. Swales. He is making straight for me, and I can see, by the way he lifts his hat, that he wants to talk....");
    // Make the pScene1 Prompt object
    const pScene1 = new Prompt(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15);
    // Add the pScene1 to the game container
    gameContainer.appendChild(pScene1.div);
    // Make the prompt current
    pScene1.isCurrent().then(() => {
        // options array
        const options = [];
        // Make a 'wContinue' Word object
        const wContinue = new Word('continue');
        // Make a pContinue Prompt object
        const pContinue = new Prompt(wContinue);
        // Add the pContinue to the game container
        gameContainer.appendChild(pContinue.div);
        // float the continue prompt
        pContinue.float();
        // push pContinue to the options array
        options.push(pContinue);
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
                // if pContinue is selected
                if (pContinue.div.classList.contains('selected')) {
                    // log 'Continue selected'
                    console.log('Continue selected');
                    // call scene2
                    scene2(gameContainer);
                    // remove the 'selected' class from pContinue
                    pContinue.div.classList.remove('selected');
                } else {
                    console.log('No valid option selected');
                }
            }
        });
        // log Prompt completed
        console.log('Scene 1 completed');
    });

    // Remember to rework the dateTimeGrid
}

// Function to play random words
export function playRandomWords(gameContainer) {
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
    // Clear the game container
    gameContainer.innerHTML = null;
    // RandomWords array
    const randomWords = [];
    // Create ten random words from the array
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const w = new Word(words[randomIndex]);
        randomWords.push(w);
    }
    // Make a pRandom Prompt object
    const pRandom = new Prompt(...randomWords);
    // Add the pRandom to the game container
    gameContainer.appendChild(pRandom.div);
    // Make the prompt current
    pRandom.isCurrent().then(() => {
        // options array
        const options = [];
        // Make a 'wReturn' Word object
        const wReturn = new Word('return');
        // Make a pReturn Prompt object
        const pReturn = new Prompt(wReturn);
        // Add the pReturn to the game container
        gameContainer.appendChild(pReturn.div);
        // float the return prompt
        pReturn.float();
        // push pReturn to the options array
        options.push(pReturn);
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
                // if pReturn is selected
                if (pReturn.div.classList.contains('selected')) {
                    // log 'Return selected'
                    console.log('Return selected');
                    // call scene0
                    scene0(gameContainer);
                    // remove the 'selected' class from pReturn
                    pReturn.div.classList.remove('selected');
                } else {
                    console.log('No valid option selected');
                }
            }
        });
        //log Prompt completed
        console.log('Random words completed');
    });
}

// Scene2 is the next two sentences of Mina's journal entry
export function scene2(gameContainer) {
    // Clear the game container
    gameContainer.innerHTML = null;
    // Create a new Sentence fromstring
    const s1 = Sentence.fromString("I have been quite touched by the change in the poor old man. When he sat down beside me, he said in a very gentle way:—");
    // second sentence
    const s2 = Sentence.fromString("\"I want to say something to you, miss.\" I could see he was not at ease, so I took his poor old wrinkled hand in mine and asked him to speak fully; so he said, leaving his hand in mine:—");
    // make 'p1' Prompt object
    const p1 = new Prompt(s1);
    // make 'p2' Prompt object
    const p2 = new Prompt(s2);
    // Add the p1 and p2 to the game container
    gameContainer.appendChild(p1.div);
    gameContainer.appendChild(p2.div);
    // Make the p1 current
    p1.isCurrent().then(() => {
        // Make the p2 current
        p2.isCurrent().then(() => {
            // options array
            const options = [];
            // Make a 'wContinue' Word object
            const wContinue = new Word('continue');
            // Make a pContinue Prompt object
            const pContinue = new Prompt(wContinue);
            // Add the pContinue to the game container
            gameContainer.appendChild(pContinue.div);
            // float the continue prompt
            pContinue.float();
            // push pContinue to the options array
            options.push(pContinue);
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
                    // if pContinue is selected
                    if (pContinue.div.classList.contains('selected')) {
                        // log 'Continue selected'
                        console.log('Continue selected');
                        // call scene3
                        scene3(gameContainer);
                        // remove the 'selected' class from pContinue
                        pContinue.div.classList.remove('selected');
                    } else {
                        console.log('No valid option selected');
                    }
                }
            });
            // log Prompt completed
            console.log('Scene 2 completed');
        });
    });
}

// Scene3 is the next paragraph of Mina's journal entry
export function scene3(gameContainer) {
    // Clear the game container
    gameContainer.innerHTML = null;
    // Create a new Sentence fromstring
    const s1 = Sentence.fromString("\"I'm afraid, my deary, that I must have shocked you by all the wicked things I've been sayin' about the dead, and such like, for weeks past; but I didn't mean them, and I want ye to remember that when I'm gone.");
    // second sentence
    const s2 = Sentence.fromString("We aud folks that be daffled, and with one foot abaft the krok-hooal, don't altogether like to think of it, and we don't want to feel scart of it; an' that's why I've took to makin' light of it, so that I'd cheer up my own heart a bit.");
    // third sentence
    const s3 = Sentence.fromString("But, Lord love ye, miss, I ain't afraid of dyin', not a bit; only I don't want to die if I can help it.");
    // fourth sentence
    const s4 = Sentence.fromString("My time must be nigh at hand now, for I be aud, and a hundred years is too much for any man to expect; and I'm so nigh it that the Aud Man is already whettin' his scythe.");
    // fifth sentence
    const s5 = Sentence.fromString("Ye see, I can't get out o' the habit of caffin' about it all at once; the chafts will wag as they be used to.");
    // sixth sentence
    const s6 = Sentence.fromString("Some day soon the Angel of Death will sound his trumpet for me.");
    // seventh sentence
    const s7 = Sentence.fromString("But don't ye dooal an' greet, my deary!\"—for he saw that I was crying—\"if he should come this very night I'd not refuse to answer his call.");
    // eighth sentence
    const s8 = Sentence.fromString("For life be, after all, only a waitin' for somethin' else than what we're doin'; and death be all that we can rightly depend on.");
    // ninth sentence
    const s9 = Sentence.fromString("But I'm content, for it's comin' to me, my deary, and comin' quick.");
    // tenth sentence
    const s10 = Sentence.fromString("It may be comin' while we be lookin' and wonderin'.");
    // eleventh sentence
    const s11 = Sentence.fromString("Maybe it's in that wind out over the sea that's bringin' with it loss and wreck, and sore distress, and sad hearts. Look! look!\" he cried suddenly.");
    // twelfth sentence
    const s12 = Sentence.fromString("\"There's something in that wind and in the hoast beyont that sounds, and looks, and tastes, and smells like death.");
    // thirteenth sentence
    const s13 = Sentence.fromString("It's in the air; I feel it comin'. Lord, make me answer cheerful when my call comes!\"");
    // fourteenth sentence
    const s14 = Sentence.fromString("He held up his arms devoutly, and raised his hat. His mouth moved as though he were praying.");
    // fifteenth sentence
    const s15 = Sentence.fromString("After a few minutes' silence, he got up, shook hands with me, and blessed me, and said good-bye, and hobbled off.");
    // sixteenth sentence
    const s16 = Sentence.fromString("It all touched me, and upset me very much.");
    // make 'p1' Prompt object
    const p1 = new Prompt(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16);
    // Add the p1 to the game container
    gameContainer.appendChild(p1.div);
    // Make the p1 current
    p1.isCurrent().then(() => {
        // options array
        const options = [];
        // Make a 'wContinue' Word object
        const wContinue = new Word('continue');
        // Make a pContinue Prompt object
        const pContinue = new Prompt(wContinue);
        // Add the pContinue to the game container
        gameContainer.appendChild(pContinue.div);
        // float the continue prompt
        pContinue.float();
        // push pContinue to the options array
        options.push(pContinue);
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
                // if pContinue is selected
                if (pContinue.div.classList.contains('selected')) {
                    // log 'Continue selected'
                    console.log('Continue selected');
                    // call scene4
                    scene4(gameContainer);
                    // remove the 'selected' class from pContinue
                    pContinue.div.classList.remove('selected');
                } else {
                    console.log('No valid option selected');
                }
            }
        });
        // log Prompt completed
        console.log('Scene 2 completed');
    });



}

// Scene4 is the last two paragraphs of Mina's journal entry
export function scene4(gameContainer) {
    // Clear the game container
    gameContainer.innerHTML = null;
    // Create a new Sentence fromstring
    const s1 = Sentence.fromString("I was glad when the coastguard came along, with his spy-glass under his arm.");
    // second sentence
    const s2 = Sentence.fromString("He stopped to talk with me, as he always does, but all the time kept looking at a strange ship.");
    // p1 Prompt object
    const p1 = new Prompt(s1, s2);
    // new sentence from string
    const s3 = Sentence.fromString("\"I can't make her out,\" he said; \"she's a Russian, by the look of her; but she's knocking about in the queerest way.");
    // fourth sentence
    const s4 = Sentence.fromString("She doesn't know her mind a bit; she seems to see the storm coming, but can't decide whether to run up north in the open, or to put in here.");
    // fifth sentence
    const s5 = Sentence.fromString("Look there again! She is steered mighty strangely, for she doesn't mind the hand on the wheel; changes about with every puff of wind.");
    // sixth sentence
    const s6 = Sentence.fromString("We'll hear more of her before this time tomorrow.\"");
    // p2 Prompt object
    const p2 = new Prompt(s3, s4, s5, s6);
    // Add the p1 and p2 to the game container
    gameContainer.appendChild(p1.div);
    gameContainer.appendChild(p2.div);
    // Make the p1 current
    p1.isCurrent().then(() => {
        // Make the p2 current
        p2.isCurrent().then(() => {
            // log Prompt completed
            console.log('Scene 4 completed');
            // Game over or restart option could go here
            const gameOverMessage = document.createElement('h2');
            gameOverMessage.textContent = "End of Journal Entry. Thank you for playing!";
            gameContainer.appendChild(gameOverMessage);
        });
    });

}