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
                    this.div.classList.remove("current")
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
    
    constructor() {
        this.words = [];
        this.div = document.createElement("div");
        this.div.classList.add("sentence");
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
        // complete prompt
        //promptComplete();
    }
}