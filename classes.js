export class Char {
    // Each Char is a single character

    // The constructor takes a single character as input
    constructor(letter) {
        this.letter = letter || ' '; // default to space if no letter provided
        // new div element
        this.div = document.createElement('div');
        // add the char class
        this.div.classList.add('char');
        // set the text content to the letter
        this.div.textContent = letter;
        // assign this Char instance to the div
        this.div.charInstance = this;
    }

    // Async method to make the char current
    async isCurrent(timer = null) {
        // add the 'current' class to the char div
        this.div.classList.add('current');
        // return a new Promise
        return new Promise((resolve, reject) => {
            // If the char is already incorrect, resolve the promise
            if (this.div.classList.contains('incorrect')) {
                resolve(
                    this.div.classList.remove('current')
                );
                return;
            }
            // define the keydown event listener
            const kDEvent = (e) => {
                // If startTime is not set, set it to the current time
                if (timer && timer.startTime === 'waiting') {
                    timer.startSWatch();
                    // log start time
                    //console.log('char',timer);
                }
                // If e key matches this.letter
                if (e.key === this.letter) {
                    // Prevent default behavior
                    e.preventDefault();
                    // Resolve the promise
                    resolve(
                        // Remove the 'current' class
                        this.div.classList.remove('current'),
                        // Add the 'correct' class
                        this.div.classList.add('correct'),
                    );
                    // Remove the event listener
                    document.removeEventListener('keydown', kDEvent);
                }// else if e key is 'shift'
                else if (e.key === 'Shift') {
                    // add a one time keydown listener for the next key
                    const shiftEvent = (ev) => {
                        // log ev.key and this.letter
                        //console.log('shifted key:', ev.key, 'expected:', this.letter.toLowerCase());
                        // If ev key matches this.letter in lowercase
                        if (ev.key === this.letter) {
                            // Resolve the promise
                            resolve(
                                // Remove the 'current' class
                                this.div.classList.remove('current'),
                                // Add the 'correct' class
                                this.div.classList.add('correct')
                            );
                            // Remove the event listener
                            document.removeEventListener('keydown', shiftEvent);
                        } else {
                            // Resolve the promise
                            resolve(
                                // Remove the 'current' class
                                this.div.classList.remove('current'),
                                // Add the 'incorrect' class
                                this.div.classList.add('incorrect')
                            );
                        }
                    };
                    // Add the keydown event listener
                    document.addEventListener('keydown', shiftEvent, { once: true });
                }// else if e key is 'space' and this.letter is not a space
                else if (e.key === ' ' && this.letter !== ' ') {
                    // Prevent default behavior
                    e.preventDefault();
                    // get all remaining chars in the parent word
                    let parentWord = this.div.parentElement;
                    let remainingChars = Array.from(parentWord.querySelectorAll('.char')).filter(c => !c.classList.contains('correct') && !c.classList.contains('incorrect'));
                    //console.log('skipping', remainingChars);
                    // Mark all remaining chars as incorrect
                    for (let c of remainingChars) {
                        c.classList.remove('current');
                        c.classList.add('incorrect');
                    }
                    // add the 'skipped' class to the parent word
                    parentWord.classList.add('skipped');
                    // Resolve the promise
                    resolve(
                        // Remove the 'current' class
                        this.div.classList.remove('current')
                    );
                } else if (e.key === 'CapsLock') {
                    // add a one time keydown listener for the next key
                    const capsEvent = (ev) => {
                        // log ev.key and this.letter
                        //console.log('shifted key:', ev.key, 'expected:', this.letter.toLowerCase());
                        // If ev key matches this.letter in lowercase
                        if (ev.key === this.letter) {
                            // Resolve the promise
                            resolve(
                                // Remove the 'current' class
                                this.div.classList.remove('current'),
                                // Add the 'correct' class
                                this.div.classList.add('correct')
                            );
                            // Remove the event listener
                            document.removeEventListener('keydown', capsEvent);
                        } else {
                            // Resolve the promise
                            resolve(
                                // Remove the 'current' class
                                this.div.classList.remove('current'),
                                // Add the 'incorrect' class
                                this.div.classList.add('incorrect')
                            );
                        }
                    };
                    // Add the keydown event listener
                    document.addEventListener('keydown', capsEvent, { once: true });
                } else {
                    // Resolve the promise
                    resolve(
                        // Remove the 'current' class
                        this.div.classList.remove('current'),
                        // Add the 'incorrect' class
                        this.div.classList.add('incorrect')
                    );
                }
            }
            // Add the keydown event listener
            document.addEventListener('keydown', kDEvent, { once: true });
        });
    }
}

export class Word {
    // Each Word is a collection of Chars

    // The constructor takes a string and an optional split character as input
    constructor(term, split) {
        this.term = term;
        // Default split is a space
        this.split = split || ' ';
        // characters array
        this.chars = [];
        // this div new div element
        this.div = document.createElement('div');
        // add the word class
        this.div.classList.add('word');
        // For each character in the term, create a Char object and add it to the chars array
        for (let c of term) {
            // Create a new Char object
            let char = new Char(c);
            // Add the Char object to the chars array
            this.chars.push(char);
            // Append the Char's div to the Word's div
            this.div.appendChild(char.div);
        }
        // After all chars are created, add a split Char if needed
        let splitChar = new Char(this.split);
        // Append the split Char's div to the Word's div
        this.div.appendChild(splitChar.div);
        // Add the split Char to the chars array
        this.chars.push(splitChar);
            
        
    }

    // Async method to make the word current
    async isCurrent(timer = null) {
        // add the 'current' class to the word div
        this.div.classList.add('current');
        this.div.scrollIntoView({ behavior: 'smooth', block: 'center', container:'nearest' });
        // return a new Promise
        return new Promise(async (resolve, reject) => {
            // For each char in this.chars
            for (let char of this.chars) {
                // If startTime is not set, pass it to isCurrent
                if (timer) {
                    // log start time
                    //console.log(timer);
                    await char.isCurrent(timer)
                } else {
                    await char.isCurrent();
                }
            }
            // If the word becomes skipped, resolve the promise
            if (this.div.classList.contains('skipped')) {
                resolve(
                    this.div.classList.remove('current')
                );
                return;
            }
            // Resolve the promise
            resolve(
                // Remove the 'current' class from the word div
                this.div.classList.remove('current'),
                // add the 'typed' class to the word div
                this.div.classList.add('typed')
            );
        }).catch((err) => {
            console.error('Error in Word.isCurrent:', err);
        });
    }
}

export class Sentence {
    // Each Sentence is a string of words and other characters

    // The constructor takes a variable number of objects as input
    constructor(...objects) {
        // array of objects (Words, chars, etc.)
        this.objects = objects;
        // new div element
        this.div = document.createElement('div');
        // add 'sent' class
        this.div.classList.add('sent');
        // For each object, append its div to the Sentence's div
        for (let obj of objects) {
            // If the object is a Word or Char, append its div
            if (obj instanceof Word || obj instanceof Char) {
                this.div.appendChild(obj.div);
            }
        }
    }

    // Method to make the sentence from a string
    static fromString(str) {
        // Split the string into words based on spaces
        let words = str.split(' ').map(word => new Word(word, ' '));
        // Create a Sentence from the Word objects
        return new Sentence(...words);
    }

    // Method to add a Word object to the sentence
    addWord(word) {
        this.objects.push(word);
        this.div.appendChild(word.div);
    }


    // Async method to make the sentence current
    async isCurrent(timer = null) {
        // add the 'current' class to the sentence div
        this.div.classList.add('current');
        // Await a new Promise
        return new Promise(async (resolve, reject) => {
            // For each object in this.objects
            for (let obj of this.objects) {
                // If startTime is not set, pass it to isCurrent
                if (timer) {
                    // log start time
                    //console.log(timer);
                    await obj.isCurrent(timer);
                } else {
                    await obj.isCurrent();
                }
            }
            // Resolve the promise
            resolve(
                // Remove the 'current' class from the sentence div
                this.div.classList.remove('current')
            );
        }).catch((err) => {
            console.error('Error in Sentence.isCurrent:', err);
        });
    }

}

export class Prompt {
    // Each Prompt contains any number of objects (Words, Sentences, etc.)

    // The constructor takes a variable number of objects as input
    constructor(...objects) {
        // Timer object (optional)
        this.timer = new Timer();
        // array of objects (Words, Sentences, etc.)
        this.objects = objects;
        // new div element
        this.div = document.createElement('div');
        // add 'prompt' class
        this.div.classList.add('prompt');
        // total word count
        this.wordCount = 0;
        // Typed Word count
        this.typedWordCount = 0;
        // WPM
        this.wpm = 0;
        // end time
        this.endTime = null;
        // For each object
        for (let obj of objects) {
            // If its a Sentence
            if (obj instanceof Sentence) {
                // Append the Sentence's div to the Prompt's div
                this.div.appendChild(obj.div);
                // add the number of words to wordCount
                this.wordCount += obj.objects.filter(o => o instanceof Word).length;

            } else if (obj instanceof Word) {
                // If its a Word, append its div
                this.div.appendChild(obj.div);
                // add the number of words to wordCount
                this.wordCount += 1;
            } else if (obj instanceof Char) {
                // If its a Char, append its div
                this.div.appendChild(obj.div);
            }
        }
        if (this.wordCount < 7) {
            this.div.style.height = 'auto';
        } else if (this.wordCount < 21) {
            this.div.style.height = '10vw';
        } else if (this.wordCount < 31) {
            this.div.style.height = '15vw';
        } else if (this.wordCount < 61) {
            this.div.style.height = '21vw';
        } else if (this.wordCount < 101) {
            this.div.style.height = '27vw';
        } else if (this.wordCount < 121) {
            this.div.style.height = '30vw';
        } else {
            this.div.style.height = '34vw';
        }
    }

    // Async method to float the prompt
    async float() {
        // Add the 'float' class to the prompt div
        this.div.classList.add('float');
        // // Await a new Promise
        // await new Promise((resolve, reject) => {
        //     // Add a keydown listener to the window
        //     window.addEventListener('keydown', (event) => {
        //         // if event.key is 'Enter'
        //         if (event.key === 'Enter') {
        //             event.preventDefault();
        //         }
        //         if (event.key === 'Enter' 
        //             && this.div.classList.contains('float') 
        //             && !this.div.classList.contains('hiden') 
        //             && document.querySelectorAll('.float').length < 2) {
        //             // Resolve the promise
        //             resolve();
        //             // get the pinput textarea
        //             let pInput = document.querySelector('.pInput');
        //             // Nullify the pInput
        //             pInput.value = '';

        //         } else if (event.key === 'Enter' 
        //             && !this.div.classList.contains('float') 
        //             && this.div.classList.contains('hiden') 
        //             && document.querySelectorAll('.float').length < 2) {
        //             // Nullify the callback
        //             callback = null;    
        //             // Resolve the promise
        //             resolve();
        //         }
        //     });
        // }).then(() => {
        //     // Call the callback if provided
        //     if (callback) {
        //         callback();
        //     }

        // }).catch((err) => {
        //     console.error('Error in float:', err);
        // });
    }

    runSelected(gameContainer) {
        if (this.func) {
            this.func(gameContainer);
        }
    }

    // Async method to make the prompt current
    async isCurrent(callback) {
        // Add the 'current' class to the prompt div
        this.div.classList.add('current');
        // get all chars in this prompt
        const chars = this.div.querySelectorAll('.char');
        for (let char of chars) {
            char.classList.remove('correct', 'incorrect', 'current');
        }

        // Await a new Promise
        await new Promise(async (resolve, reject) => {
            // for obj in this.objects
            for (let obj of this.objects) {
                // If startTime is not set
                if (this.timer.startTime === 'waiting') {
                    // log start time
                    //console.log(startTime);
                    await obj.isCurrent(this.timer);
                } else {
                    await obj.isCurrent();
                }
            }
            // Resolve the promise
            resolve(
                // Set the end time
                this.timer.stopSWatch(),
            );
        }).then(() => {
            // Remove the 'current' class from the prompt div
            this.div.classList.remove('current');
            // Add the 'complete' class to the prompt div
            this.div.classList.add('complete');
            // Calculate the active time in seconds
            let seconds = (this.timer.tElapsed) / 1000;
            // Calculate typed word count
            this.typedWordCount = this.div.querySelectorAll('.word.typed').length;
            // Calculate WPM
            this.wpm = Math.round((this.typedWordCount / seconds) * 60) || 0;
            // Log WPM
            console.log(`WPM: ${this.wpm}, Typed Words: ${this.typedWordCount}, Total Words: ${this.wordCount}, Time: ${seconds.toFixed(2)}s`);
            // Calculate accuracy
            let correctChars = this.div.querySelectorAll('.char.correct').length;
            let incorrectChars = this.div.querySelectorAll('.char.incorrect').length;
            this.accuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 0;
            // Log accuracy
            console.log(`Accuracy: ${this.accuracy}%`);

            // Call the callback if provided
            if (callback) {
                callback();
            }
        }).catch((err) => {
            console.error('Error in Prompt.isCurrent:', err);
        });
    }
}

export class PInput {
    // PInput handles user input for the typing game

    constructor() {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('pInput');
        this.textarea.setAttribute('autocomplete', 'off');
        this.textarea.setAttribute('autocorrect', 'off');
        this.textarea.setAttribute('autocapitalize', 'off');
        this.textarea.setAttribute('spellcheck', 'false');
        this.textarea.placeholder = '...';
    }


    // Method to attach the input handler to filter options
    attachOptionsFilter(options) {
        // Add an input event listener to the textarea
        this.textarea.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            options.forEach(opt =>{
                // console.log(opt.div.className);
                const isVisible = opt.div.textContent.toLowerCase().includes(value)
                opt.div.classList.toggle("hidden", !isVisible);
                opt.div.classList.toggle("float", isVisible);
            });
        });
    }
}

export class Timer {
    // Timers handle any countdowns and time tracking

    constructor(seconds) {
        this.duration = seconds || 0; // default to 0 seconds
        this.remaining = null;
        this.startTime = 'waiting';
        this.endTime = null;
        this.tElapsed = null;
        this.laps = [];
    }

    // Start stopwatch
    startSWatch() {
        this.startTime = Date.now();
        this.lapStartTime = this.startTime;
    }

    // Pause stopwatch
    pauseSWatch() {
        this.pauseTime = Date.now();
        // store the time elapsed
        this.tElapsed = this.pauseTime - this.startTime;
        
    }

    // Lap stopwatch
    lapSWatch() {
        // store the lap end time
        this.lapEndTime = Date.now();
        // Make a lap object which will store the lapStart and lapEnd
        let lap = {
            lapStart: this.lapStartTime,
            lapEnd: this.lapEndTime,
            lapTime: this.lapEndTime - this.lapStartTime
        };
        // Push the lap object to the laps array
        this.laps.push(lap);
        // Reset the lapStartTime to the current time
        this.lapStartTime = this.lapEndTime;
    }

    // Continue stopwatch
    continueSWatch() {
        // Calculate the time paused
        let pausedDuration = Date.now() - this.pauseTime;
        // Adjust the startTime and lapStartTime by the paused duration
        this.startTime += pausedDuration;
        this.lapStartTime += pausedDuration;
        // Clear the pauseTime
        this.pauseTime = null;
    }

    // Stop stopwatch
    stopSWatch() {
        this.endTime = Date.now();
        // Calculate total elapsed time
        this.tElapsed = this.endTime - this.startTime;
        // If the stopwatch was paused, adjust the elapsed time
        if (this.pauseTime) {
            this.tElapsed -= (this.pauseTime - this.startTime);
        }
    }
}

export class Scene {

    constructor(gameContainer, prompts) {
        this.gameContainer = gameContainer;
        this.prompts = prompts;
        this.gameContainer.classList.remove('complete');
        this.gameContainer.innerHTML = '';
        this.visited = 0;
        this.optionsDiv = document.createElement('div');
    }

    static options = [];
    static previousDiv = document.createElement('div');
    static playerInput = new PInput();
    static timer = new Timer();

    static updateGameStats(prompt) {
        let wpmDisplay = document.getElementById('wpmDisplay');
        let accuracyDisplay = document.getElementById('accuracy');
        wpmDisplay.textContent = prompt.wpm;
        accuracyDisplay.textContent = prompt.accuracy;
    }

    async playScene() {
        if (this.visited === 0) {
            this.visited++;
            this.gameContainer.innerHTML = '';
            this.previousDiv = document.createElement('div');
            this.gameContainer.appendChild(this.previousDiv);
            this.previousDiv.classList.add('previouslyComplete');
            for(let p of this.prompts) {
                this.gameContainer.classList.remove('xSPrompt', 'smallPrompt', 'medPrompt', 'largePrompt', 'xLPrompt');
                if (p.wordCount < 21) {
                    this.gameContainer.classList.add('xSPrompt');
                } else if (p.wordCount < 31) {
                    this.gameContainer.classList.add('smallPrompt');
                } else if (p.wordCount < 61) {
                    this.gameContainer.classList.add('medPrompt');
                } else if (p.wordCount < 101) {
                    this.gameContainer.classList.add('largePrompt');
                } else {
                    this.gameContainer.classList.add('xLPrompt');
                }
                this.gameContainer.appendChild(p.div);
                await p.isCurrent();
                this.previousDiv.appendChild(p.div);
                Scene.updateGameStats(p);
            }
            this.playOptions();
        }
        if (this.visited > 0) {

        }
    }

    async playEvent(eventPrompts) {
            this.gameContainer.classList.remove('complete');
            this.optionsDiv.classList.add('hidden');
            Scene.playerInput.textarea.classList.add('hidden'); 
            for(let p of this.prompts) {
                this.gameContainer.classList.remove('xSPrompt', 'smallPrompt', 'medPrompt', 'largePrompt', 'xLPrompt');
                if (p.wordCount < 21) {
                    this.gameContainer.classList.add('xSPrompt');
                } else if (p.wordCount < 31) {
                    this.gameContainer.classList.add('smallPrompt');
                } else if (p.wordCount < 61) {
                    this.gameContainer.classList.add('medPrompt');
                } else if (p.wordCount < 101) {
                    this.gameContainer.classList.add('largePrompt');
                } else {
                    this.gameContainer.classList.add('xLPrompt');
                }
                this.gameContainer.appendChild(p.div);
                await p.isCurrent();
                this.previousDiv.appendChild(p.div);
                Scene.updateGameStats(p);
            }
            this.playOptions();
            this.optionsDiv.classList.remove('hidden');
            Scene.playerInput.textarea.classList.remove('hidden');

    }

    loadPrevComplete(prevPrompts) {
        for (let p of prevPrompts) {
            this.previousDiv.appendChild(p.div);
        }
    }

    async playOptions() {
        console.log('playOptions', Scene.options);
        this.gameContainer.classList.remove('xSPrompt', 'smallPrompt', 'medPrompt', 'largePrompt', 'xLPrompt');
        this.gameContainer.classList.add('complete');
        this.optionsDiv.innerHTML = '';
        this.optionsDiv.classList.add('options');
        this.gameContainer.appendChild(this.optionsDiv);
        for (let opt of Scene.options) {
            this.optionsDiv.appendChild(opt.div);
            //opt.float();
        }
        this.gameContainer.appendChild(Scene.playerInput.textarea);
        Scene.playerInput.textarea.focus();
        Scene.playerInput.attachOptionsFilter(Scene.options);
        document.addEventListener('keydown', (e) => {
        // if the enter key is pressed
            if (e.key === 'Enter' && document.querySelectorAll('.float').length === 1) {
                let selectedOption = document.querySelector('.float');
                selectedOption.classList.add('selected');
                console.log('Selected option:', selectedOption);
                e.preventDefault();
                console.log('Enter key pressed');
                console.log('options:', Scene.options);
                for (let opt of Scene.options) {
                    if (opt.div.classList.contains('selected')) {
                        console.log('Selected option:', opt);
                        opt.runSelected(this.gameContainer);
                        opt.div.classList.remove('selected');
                        // remove every prompt from the options array
                        Scene.options = [];
                        console.log('options after selection:', Scene.options);
                    }
                }
            } else if (e.key === 'Enter' && document.querySelectorAll('.float').length < 1) {
                console.log('please select type until there is only one option');
                e.preventDefault();
            }
        });
    }
}