import {Char, Word, Sentence, Prompt, PInput, Timer} from './classes.js';

const s1 = Sentence.fromString("'Six-Two, do you read? Over.'");
const p1 = new Prompt(s1);
const s2 = Sentence.fromString("'Loud and clear, Chrysalis.'");
const p2 = new Prompt(s2);
const s3 = Sentence.fromString("The mass driver swiveled. A railgun large enough to punch through even the toughest of outer hulls. This ship claimed to be Union, and by all intents and purposes, they were. But should their authorization codes not work out, they’d be asked to turn back or receive a projectile moving at lightspeed embedded in their capital ship. The fleet had flipped and burned days ago, now moving slower than the human eye could track. Great behemoths in the inky blackness, magnified by the screen in front of Grub.");
const p3 = new Prompt(s3);
const s4 = Sentence.fromString("The 41st, long-range artillery fleet, or so they claimed to be. Marked by a red face biting into the blade of a knife spraypainted onto the sides of their vessels.");
const p4 = new Prompt(s4);
const s5 = Sentence.fromString("Grub clicked the button on his headset, 'Six-Two, please state your purpose.'");
const p5 = new Prompt(s5);
const s6 = Sentence.fromString("'A rendezvous with the 9th. Should be under Admiral Townsend's latest issue.'");
const p6 = new Prompt(s6);
const s7 = Sentence.fromString("Grub muted himself once again and turned to his right. 'Got a copy of Townsend's orders?'");
const p7 = new Prompt(s7);
const s8 = Sentence.fromString("'The newest set?' Marco asked.");
const p8 = new Prompt(s8);
const s9 = Sentence.fromString("In actuality, they'd been from two weeks ago, and had only reached Chrysalis yesterday morning. It was up to much smarter Union higher ups to determine the dispersal of information, what would be delayed, and what could be delayed. Grub, and the rest of Chrysalis, just bounced things back to the rest of the Union. Even that was a multi-day long process at the quickest.");
const p9 = new Prompt(s9);
const s10 = Sentence.fromString("Marco handed him a manilla envelope, carrying on with whatever work he'd been doing since the morning shift started.");
const p10 = new Prompt(s10);
const s11 = Sentence.fromString("Grub double checked the admiral's orders, and found the 41st' clearance. Now, there was one more step.");
const p11 = new Prompt(s11);
const s12 = Sentence.fromString("'Six-Two, please transmit authorization codes. Over.'");
const p12 = new Prompt(s12);
const s13 = Sentence.fromString("'On it, Chrysalis.'");
const p13 = new Prompt(s13);
const s14 = Sentence.fromString("A few moments later, a string of numbers appeared on his terminal screen. He pressed a key on his pad, and lines of code began appearing on his terminal. Computational commands that no human-without augments-could work out. Cross-referencing this code with every other auth-code in the Archive, which contained a few billion combinations as a rough estimate. At the end, the neon-green letters read ALL OK.");
const p14 = new Prompt(s14);
const s15 = Sentence.fromString("'You're clear, Six-Two. Good hunting.'");
const p15 = new Prompt(s15);
const s16 = Sentence.fromString("'Much obliged, Chrysalis. You have a good one, now.'");
const p16 = new Prompt(s16);
const s17 = Sentence.fromString("It wasn't the first time a battleship had bid him good day, and Grub always found the notion amusing. It would take an hour for them to get up to speed and back on course, but their lane seemed clear for the day, they could take all the time they needed.");
const s18 = Sentence.fromString("From behind, Grub could hear an argument ensuing between one of the other Listeners and whoever he was trying to clear—or send back. Grub only had to deal with civilian lane watch a handful of times, and he always pitied the poor sod who was stuck on duty. This time, it was Valens.");
const s19 = Sentence.fromString("Unlike the fleet Grub had just cleared, there was more procedure to clearing a civilian ship, and chances are, they didn't have any of the documentation required. Then, they got belligerent.Which appeared to be what was currently ensuing. From the other side of the semicircular room, Valens spat a string of curses to a—hopefully—muted microphone. She had six different binders open on her desk, completely blocking her terminal screen.");
const s20 = Sentence.fromString("Civilian lanes had been tough recently. There was an influx of ships fleeing an insurrection on Borr, and that's all Grub knew. Marco had tried tapping into the planet's open-broadcast radio and found nothing but static. Hard to tell how a planet three-million lightyears away was faring when Chrysalis was on the very edge of charted space. Maybe these ships came here in hopes of charting a new planet. Civies always had that ideology in the back of their mind, but without a cartography crew, they were likely to die in the first seventy-two hours.");
const s21 = Sentence.fromString("What most of them didn't understand was Valens' frustration was born of concern, not anger. Security is strength. It was the motto drilled into every Union recruit during basic training. It was the drive to create security for all citizens that drove the Union to build the Listening Posts a few hundred years ago, of which Chrysalis was merely one piece of a complex network of stations.");
const s22 = Sentence.fromString("A network that could bounce information between the entire Union quicker than any ship could transmit. Even still, the quickest it would reach Stella Gloria on the other side of space would be two days. Some people felt privileged to work on a Post, to hold the Union's security in the palm of their hands. Grub found it to be another desk job away from the bullets. To that extent, he enjoyed it. However, the most exciting thing today would be watching this fleet in front of him get up to speed and listen to Valens losing her mind. The woman finally slammed her headset down, and swung by Grub and Marco's desk on her way out.");
const s23 = Sentence.fromString("'Caff break. You two want anything?' she asked.");
const s24 = Sentence.fromString("'Same thing I always want. Thank you, darling,' Marco slipped his hand into his pocket and passed her two credits. Grub shook his head. As the woman walked away, he couldn't help but notice Marco's continued stare.");
const s25 = Sentence.fromString("'You're being obvious,' Grub said.");
const s26 = "'Ellison's—,' Marco cut himself off, eyes flickering over and up to the vacant captain's chair, 'Ellison's none the wiser. Too busy in that dust haze.'";
const s27 = "Grub had always found it suspicious that Captain Ellison would slip out for constant \"bathroom breaks\". It was only a few weeks ago that one crew member found her in the bathroom huffing burner dust. Nobody said a thing because of how well she conducted herself, high or not. Everyone did what they had to to stave off boredom. It was the biggest killer in space, and on a Post, there wasn't much in the form of entertainment.";
const s28 = "Everyone also knew about her supplier. Mercantile Legion fleets made a habit of passing through Chrysalis, using the Southern Reach starlane to drop supplies off at major ports. Some of that cargo wasn't exactly legal, but they paid their cargo tax, and the Royal Court would be missing out on a good chunk of their pay should they decide that such things were suddenly illegal.";
const s29 = "Valens came back a few moments later, handing Marco a wrapped cocoa bar with a smile.";
const s30 = "'See you tonight?' Marco asked quietly. All Valens did was snort a laugh in response before heading back. He had a dreamy look on his face, and Grub couldn't help but stifle the expression on his face. There wasn't anything against crew members being intimate with one another. The Union Cadet's Handbook stated that should a child be born, they would be immeidatley surrendered to the care of the Youth Corps.";


export const sNextPage = Sentence.fromString("Next page");
export const sLastPage = Sentence.fromString("Last page");
export const sPreviousPage = Sentence.fromString("Previous page");
export const sFirstPage = Sentence.fromString("First page");
export const sSecondPage = Sentence.fromString("Second page");
export const sThirdPage = Sentence.fromString("Third page");
export const sFourthPage = Sentence.fromString("Fourth page");
export const sFifthPage = Sentence.fromString("Fifth page");
export const sSixthPage = Sentence.fromString("Sixth page");
export const sSeventhPage = Sentence.fromString("Seventh page");
export const sEighthPage = Sentence.fromString("Eighth page");
export const sNinthPage = Sentence.fromString("Ninth page");
export const sTenthPage = Sentence.fromString("Tenth page");

 const pNextPage = new Prompt(sNextPage);
 const pLastPage = new Prompt(sLastPage);
 const pPreviousPage = new Prompt(sPreviousPage);
 const pFirstPage = new Prompt(sFirstPage);
 const pSecondPage = new Prompt(sSecondPage);
 const pThirdPage = new Prompt(sThirdPage);
 const pFourthPage = new Prompt(sFourthPage);
 const pFifthPage = new Prompt(sFifthPage);
 const pSixthPage = new Prompt(sSixthPage);
 const pSeventhPage = new Prompt(sSeventhPage);
 const pEighthPage = new Prompt(sEighthPage);
 const pNinthPage = new Prompt(sNinthPage);
 const pTenthPage = new Prompt(sTenthPage);

const typingSpeed = document.getElementById('typing-speed');
const accuracy = document.getElementById('accuracy');

function updateGameStatus(prompt) {
    typingSpeed.textContent = prompt.wpm;
    accuracy.textContent = prompt.accuracy;
}

export function firstPage(gameContainer, options,) {
    options.length = 0; // Clear the options array
    gameContainer.classList.remove('complete');
    gameContainer.innerHTML = ''; // Clear the game container
    gameContainer.classList.add('singleXSPrompt');
    const previousDiv = document.createElement('div');
    previousDiv.classList.add('previouslyComplete');
    gameContainer.appendChild(previousDiv);
    gameContainer.appendChild(p1.div);
    p1.isCurrent().then(() => {
        updateGameStatus(p1);
        previousDiv.appendChild(p1.div);
        gameContainer.appendChild(p2.div);
        p2.isCurrent().then(() => {
            updateGameStatus(p2);
            previousDiv.appendChild(p2.div);
            gameContainer.classList.remove('singleXSPrompt');
            gameContainer.classList.add('singleLargePrompt');
            gameContainer.appendChild(p3.div);
            p3.isCurrent().then(() => {
                previousDiv.appendChild(p3.div);
                gameContainer.classList.remove('singleLargePrompt');
                gameContainer.classList.add('singleSmallPrompt');
                gameContainer.appendChild(p4.div);
                p4.isCurrent().then(() => {
                    previousDiv.appendChild(p4.div);
                    gameContainer.classList.remove('singleSmallPrompt');
                    gameContainer.classList.add('singleXSPrompt');
                    gameContainer.appendChild(p5.div);
                    p5.isCurrent().then(() => {
                        previousDiv.appendChild(p5.div);
                        gameContainer.appendChild(p6.div);
                        p6.isCurrent().then(() => {
                            previousDiv.appendChild(p6.div);
                            gameContainer.appendChild(p7.div);
                            p7.isCurrent().then(() => {
                                previousDiv.appendChild(p7.div);
                                gameContainer.appendChild(p8.div);
                                p8.isCurrent().then(() => {
                                    previousDiv.appendChild(p8.div);
                                    gameContainer.classList.remove('singleXSPrompt');
                                    gameContainer.classList.add('singleLargePrompt');
                                    gameContainer.appendChild(p9.div);
                                    p9.isCurrent().then(() => {
                                        previousDiv.appendChild(p9.div);
                                        gameContainer.classList.remove('singleLargePrompt');
                                        gameContainer.classList.add('singleXSPrompt');
                                        gameContainer.appendChild(p10.div);
                                        p10.isCurrent().then(() => {
                                            previousDiv.appendChild(p10.div);
                                            gameContainer.appendChild(p11.div);
                                            p11.isCurrent().then(() => {
                                                previousDiv.appendChild(p11.div);
                                                gameContainer.appendChild(p12.div);
                                                p12.isCurrent().then(() => {
                                                    previousDiv.appendChild(p12.div);
                                                    gameContainer.appendChild(p13.div);
                                                    p13.isCurrent().then(() => {
                                                        previousDiv.appendChild(p13.div);
                                                        gameContainer.classList.remove('singleXSPrompt');
                                                        gameContainer.classList.add('singleLargePrompt');
                                                        gameContainer.appendChild(p14.div);
                                                        p14.isCurrent().then(() => {
                                                            previousDiv.appendChild(p14.div);
                                                            gameContainer.classList.remove('singleLargePrompt');
                                                            gameContainer.classList.add('singleXSPrompt');
                                                            gameContainer.appendChild(p15.div);
                                                            p15.isCurrent().then(() => {
                                                                previousDiv.appendChild(p15.div);
                                                                gameContainer.appendChild(p16.div);
                                                                p16.isCurrent().then(() => {
                                                                    previousDiv.appendChild(p16.div);
                                                                    gameContainer.classList.add('complete');
                                                                    completePage(gameContainer, options);
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

export function completePage(gameContainer, options) {
    gameContainer.classList.add('complete');
    const optDiv = document.createElement('div');
    optDiv.classList.add('options');
    gameContainer.appendChild(optDiv);
    pNextPage.float();
    optDiv.appendChild(pNextPage.div);
    options.push(pNextPage);
    pLastPage.float();
    optDiv.appendChild(pLastPage.div);
    options.push(pLastPage);
    pPreviousPage.float();
    optDiv.appendChild(pPreviousPage.div);
    options.push(pPreviousPage);
    pFirstPage.float(firstPage);
    optDiv.appendChild(pFirstPage.div);
    options.push(pFirstPage);
    pSecondPage.float(secondPage);
    optDiv.appendChild(pSecondPage.div);
    options.push(pSecondPage);

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
            console.log('options:', options);
            for (let opt of options) {
                if (opt.div.classList.contains('selected')) {
                    console.log('Selected option:', opt);
                    opt.runSelected(gameContainer, options);
                    opt.div.classList.remove('selected');
                }
            }
        }
    });
}

export function secondPage(gameContainer, options) {
    options.length = 0; // Clear the options array
    gameContainer.classList.remove('complete');
    gameContainer.innerHTML = ''; // Clear the game container
    gameContainer.classList.add('singleXLPrompt');
    const p2 = new Prompt(s2);
    p2.div.style.gridArea = 'a';
    gameContainer.appendChild(p2.div);
    p2.isCurrent().then(() => {
        completeXLPrompt(gameContainer, options);
    });
}
