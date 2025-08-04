// Make a Letter class
export class Char {
    constructor(char) {
        this.char = char;
        // Char is a div element
        this.div = document.createElement("div");
        this.div.textContent = char;
        this.div.tabIndex = 0; // Make the div focusable
    }

    //Method to get the letter
    getLetter() {
        return this.char;
    }

    //Method to make the letter correct
    correct() {
        this.div.classList.add("correct");
    }

    // Method to append the letter to a parent element
    appendTo(parent) {
        parent.appendChild(this.div);
    }

    // Method to make the character incorrect
    incorrect() {
        this.div.classList.add("incorrect");
    }

    // Method to make the character current
    isCurrent() {
        return new Promise((resolve, reject) => {
            // focus the div element
            this.div.focus();
            // if the div has the incorrect class, reject the promise
            if (this.div.classList.contains("incorrect")) {
                reject(
                    // remove the current class from the div
                    this.div.classList.remove("current"),
                    'rejected at isCurrent method of Char class'
                );
            }
            // define the handler
            const handler = (event) => {
                if (event.key === this.char) {
                    this.correct();
                    document.removeEventListener("keydown", handler);
                    resolve(
                        // remove the current class from the div
                        this.div.classList.remove("current")
                    );
                } else if (event.key === ' ') {
                    // select all remaining characters
                    const remainingChars = Array.from(this.div.parentNode.children).filter(child => !child.classList.contains("correct"));
                    remainingChars.forEach(char => char.classList.add("incorrect", 'skipped'));
                    document.removeEventListener("keydown", handler);
                    resolve(
                        // remove the current class from the div
                        this.div.classList.remove("current"),
                        // add the skipped class to the parent div
                        this.div.parentNode.classList.add("skipped")
                    );
                } else {
                    this.incorrect();
                    document.removeEventListener("keydown", handler);
                    resolve(
                        // remove the current class from the div
                        this.div.classList.remove("current")
                    );
                }
            };
            // add keydown event listener to the document
            document.addEventListener("keydown", handler, { once: true });
            
            // store the number of .correct characters
            let correctChars = document.querySelectorAll('.correct').length;
            // store the number of .incorrect characters
            let incorrectChars = document.querySelectorAll('.incorrect').length;
            // calculate the accuracy
            let accuracy = (correctChars / (correctChars + incorrectChars)) * 100;
            // get an element with id 'accuracy'
            const accuracyElement = document.getElementById('accuracy');
            accuracyElement.textContent = `${accuracy.toFixed(2)}%`;
            // log correct, incorrect and total characters
            // console.log(`Correct characters: ${correctChars}`);
            // console.log(`Incorrect characters: ${incorrectChars}`);
            // console.log(`Total characters: ${correctChars + incorrectChars}`);
        });
    }
}

// Make a special Char class for space
export class SpecChar {
    constructor(char = null) {
        this.char = char || " "; // Default to space if no char is provided
        // Char is a div element
        this.div = document.createElement("div");
        this.div.textContent = this.char;
        this.div.classList.add("space");
        this.div.tabIndex = 0; // Make the div focusable
    }

    // Method to append the space to a parent element
    appendTo(parent) {
        parent.appendChild(this.div);
    }

    // Method to make the Special character current
    isCurrent() {
        // new Promise
        return new Promise((resolve, reject) => {
            // focus the div element
            this.div.focus();
            // if the div has the incorrect class, reject the promise
            if (this.div.classList.contains("incorrect")) {
                reject(
                    // remove the current class from the div
                    this.div.classList.remove("current")
                );
            }
            // define the handler
            const handler = (event) => {
                if (event.key === this.char) {
                    this.div.classList.add("correct");
                    document.removeEventListener("keydown", handler);
                    resolve(
                        // remove the current class from the div
                        this.div.classList.remove("current")
                    );
                } else {
                    this.div.classList.add("incorrect");
                    document.removeEventListener("keydown", handler);
                    resolve(
                        // remove the current class from the div
                        this.div.classList.remove("current")
                    );
                }
            }
            // add keydown event listener to the document
            document.addEventListener("keydown", handler, { once: true });
        });
    }
}

//Make a word class
export class Word {
    constructor(word, split) {
        this.word = word;
        this.split = split || ' '; // Default split character is space
        // Array to hold the characters of the word
        this.characters = [];
        // Word is a div element
        this.div = document.createElement("div");
        this.div.classList.add("word");
        // for each character in the word, create a Char object
        for (let char of word) {
            const charObj = new Char(char);
            this.characters.push(charObj);
            charObj.appendTo(this.div);
        }
        // make the split character a special Char object
        if (this.split) {
            const splitChar = new SpecChar(this.split);
            this.characters.push(splitChar);
            splitChar.appendTo(this.div);
        }

    }

    //Method to get the word
    getWord() {
        return this.word;
    }

    // Method to append the word to a parent element
    appendTo(parent) {
        parent.appendChild(this.div);
    }

    // Method 'isCurrent'
    isCurrent() {
        // new Promise
        return new Promise(async (resolve, reject) => {
            try {
                // for char of characters
                for (let char of this.characters) {
                    // add the current class to the character's div
                    char.div.classList.add("current");
                    // call the isCurrent method on each Char object
                    await char.isCurrent();
                }
                // resolve after all characters are processed
                resolve(
                    // remove the current class from the div
                    this.div.classList.remove("current"),
                    // add the typed class to the div
                    this.div.classList.add("typed"),
                );
                // if the word becomes skipped, reject the promise
                if (this.div.classList.contains("skipped")) {
                    reject(
                        // remove the current class from the div
                        this.div.classList.remove("current")
                    );
                }
            } catch (error) {
                // if an error occurs, reject the promise
                reject(error);
            }
        });
    }
}

// Make a sentence class
export class Sentence {
    // Constructor should take any number of Word, Char, or SpecChar objects
    constructor(...objects) {
        this.words = [];
        this.div = document.createElement("div");
        this.div.classList.add("sentence");
        for (let obj of objects) {
            if (obj instanceof Word || obj instanceof Char || obj instanceof SpecChar) {
                this.words.push(obj);
                this.div.appendChild(obj.div);
            }
        }
    }

    // Method to get words from a string
    static fromString(sentenceString, split = ' ') {
        // Split the sentence string into words
        const wordsArray = sentenceString.split(split);
        // Map the words to Word objects
        const wordObjects = wordsArray.map(word => new Word(word));
        // Create a new Sentence object
        return new Sentence(...wordObjects);
    }

    // Method to add a Word object to the sentence
    addWord(word) {
        this.words.push(word);
        word.appendTo(this.div);
    }

    // Method to get the sentence
    getSentence() {
        return this.words.map(word => word.getWord()).join(" ");
    }

    // Method to make the sentence current
    async isCurrent() {
        // new Promise
        return new Promise(async (resolve, reject) => {
            // for word of words
          for (let word of this.words) {
              // add the current class to the word's div
              word.div.classList.add("current");
              try {
                  // call the isCurrent method on each Word object
                  await word.isCurrent();
              } catch (error) {
                  // remove the current class from the word's div
                  word.div.classList.remove("current");
              }
          }
          // resolve after all words are processed
          resolve(
              // remove the current class from the div
              this.div.classList.remove("current")
          );

        });

        // complete prompt
        //promptComplete();
    }
}

// Make a prompt class
export class Prompt {
  // Constructor takes any number of objects that may be Sentence, Word, Char, or SpecChar
  constructor(...objects) {
        this.all = [];
        this.div = document.createElement("div");
        // totalWords
        this.totalWords = 0;
        for (let obj of objects) {
            if (obj instanceof Sentence) {
                // push to all
                this.all.push(obj);
                // add the number of words to totalWords
                this.totalWords += obj.words.length;
                //appendChild
                this.div.appendChild(obj.div);
            } else if (obj instanceof Word) {
                // push to all
                this.all.push(obj);
                // add one to totalWords
                this.totalWords += 1;
                // add the word as a class to the div
                this.div.classList.add(obj.getWord())
                // appendChild
                this.div.appendChild(obj.div);
            } else if (obj instanceof Char || obj instanceof SpecChar) {
                // push to all
                this.all.push(obj);
                // add one to totalWords
                this.totalWords += 1;
                // add the character as a class to the div
                this.div.classList.add(obj.char)
                // appendChild
                this.div.appendChild(obj.div);
            }
        }
        this.div.classList.add("prompt");
        // typedWords
        this.typedWords = 0;
        //WPM
        this.wpm = 0;
        // prompts should have a function to call when the prompt is resolved
        this.onResolve = null;
    }

    // Method to calculate and log the total words in the prompt
    logTotalWords() {
        console.log(`Total words in prompt: ${this.totalWords}`);
    }

    


    // async Method to float the prompt accepts a function that is calledback when the prompt is resolved
    async float(onResolve) {
        // store the onResolve function
        this.onResolve = onResolve;
        // add the floating class to the div
        this.div.classList.add("floating");
        // Await a new Promise
        //let interval;
        try {
            await new Promise((resolve, reject) => {
                // at an interval
                const interval = setInterval(() => {
                    // if the div has the 'resolved' class, resolve the promise immediately
                    if (this.div.classList.contains("resolved")) {
                        // stop the interval
                        clearInterval(interval);
                        // remove the floating class from the div
                        this.div.classList.remove("floating");
                        resolve(this);
                    } else if (this.div.classList.contains('rejected')) {
                        // stop the interval
                        clearInterval(interval);
                        // remove the floating class from the div
                        this.div.classList.remove("floating");
                        //log `Prompt rejected: ${this.div.className}`
                        //console.log(`Prompt rejected: ${this.div.className}`),
                        // erase this.onResolve
                        this.onResolve = null;
                        // resolve the promise
                        resolve(this);
                    }

                }, 17);// 60 FPS
        });
        // stop the interval
        //clearInterval(interval);
        } catch (error) {
            //stop the interval
            //clearInterval(interval);
            // log the error
            console.error('Error in float method:', error);
        }
        // if the onResolve function is provided, call it
        if (this.onResolve) {
            this.onResolve(this);
        }
        // if thisdiv has the floating class and not the hidden class and there is only one floating prompt

        // // return a new Promise
        // return new Promise((resolve) => {
        //     // if thisdiv has the floating class and not the hidden class and there is only one floating prompt
        //     if (this.div.classList.contains("floating") && !this.div.classList.contains("hidden") && document.querySelectorAll('.floating').length === 1) {
        //         // log 'listening for keydown event'
        //         console.log('Listening for keydown event on prompt:', this);
        //         // eventListener for a one time keydown event
        //         let handler = (event) => {
        //             // if the key is Enter
        //             if (event.key === "Enter") {
        //                 // remove the floating class from the div
        //                 this.div.classList.remove("floating");
        //                 // resolve the promise
        //                 resolve(
        //                     // log the prompt
        //                     console.log('Prompt selected:', this)
        //                 );
        //             }
        //         };
        //         // add the event listener
        //         document.addEventListener("keydown", handler, { once: true });
        //     } else if (!this.div.classList.contains("floating") && this.div.classList.contains("hidden")) {
        //         // resolve the promise immediately
        //         resolve(this);
        //     }
        // });
    }

    // Method to make the prompt current
    async isCurrent() {
      // store the start time
        const startTime = Date.now();
        // for sentence of sentences
        for (let sentence of this.all) {
            // add the current class to the sentence's div
            sentence.div.classList.add("current");
            try {
                // call the isCurrent method on each Sentence object
                await sentence.isCurrent();
            } catch (error) {
                // remove the current class from the sentence's div
                sentence.div.classList.remove("current");
            }
        }
        // store the end time
        const endTime = Date.now();
        // calculate the time taken
        const timeTaken = endTime - startTime;
        // calculate the typedWords
        this.typedWords = this.div.querySelectorAll('.typed').length;
        // calculate the WPM
        this.wpm = Math.round((this.typedWords / (timeTaken / 60000)) * 100) / 100; // Round to two decimal places
        // get an element with id 'typing-speed'
        const typingSpeedElement = document.getElementById('typing-speed');
        // set the text content of the element to the WPM
        typingSpeedElement.textContent = this.wpm;
        // log the time taken
        console.log(`Time taken: ${timeTaken} ms`);
        // store timeTaken as a property
        this.timeTaken = timeTaken;
        // return both wpm and timeTaken as an object
        return { wpm: this.wpm, timeTaken: this.timeTaken };
    }
}

// Make a GameInput class
export class GameInput {
    constructor(parent) {
        // What if it's a form? Can I use the submit event?
        this.form = document.createElement("form");
        this.submit = document.createElement("input");
        this.submit.type = "submit";
        this.submit.value = "Submit";
        this.form.onsubmit
        // hide the submit button
        this.submit.style.display = "none";
        // add a class to the form

        this.textArea = document.createElement("textarea");
        this.textArea.placeholder = "...";
        this.textArea.classList.add("game-input");
        parent.appendChild(this.form);
        this.form.appendChild(this.textArea);
        this.form.appendChild(this.submit);

        // this.handleInput;
        // this.textArea.addEventListener("input", this.handleInput);
        //console.log(`Input value: ${event.target.value}`);
        
    }
    // Method to handle input events
    handleInput(array) {
        // const options
        // // for each prompt in the array
        // array.forEach(prompt => {
        //     // log the prompt
        //     console.log(`Prompt: ${prompt}`);
        //     prompt.all.forEach(obj => {
        //         // log the object
        //         console.log(`Object: ${obj}`);
        //         // if obj is a Sentence
        //         if (obj instanceof Sentence) {
        //             obj.words.forEach(word => {
        //                 // log the word
        //                 console.log(`Word: ${word.getWord()}`);
        //                 // push the word to the opt array
        //                 opt.push(word.getWord());
        //             });
        //         } else if (obj instanceof Word) {
        //             // log the word
        //             console.log(`Word: ${obj.getWord()}`);
        //             // push the word to the opt array
        //             opt.push(obj.getWord());
        //         }
        //     });
        // });
        // // each opt needs the prompt object and all words inside it

        // add event listener for input
        // this.input.addEventListener("input", (e) => {
        //     const value = e.target.value.toLowerCase();
        //     array.forEach(opt =>{
        //         // console.log(opt.div.className);
        //         const isVisible = opt.div.className.includes(value)
        //         opt.div.classList.toggle("hidden", !isVisible);
        //         opt.div.classList.toggle("floating", isVisible);
        //     })
        //     // log the input value
        //     console.log(`Input value: ${e.target.value}`);
        // });
    }
}
