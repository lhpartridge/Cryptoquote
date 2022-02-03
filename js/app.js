/**
Cryptoquote  Lorraine Partridge   A project for the 2021 cohort of the Mississippi Coding Academies
 */
 
// Page load and other display settings
// On init, the page settings are:
    // Top header: only Rules, everything else d-none; display on level choice
    // Header: display; d-none on game start
    // quotationDisplayHome: display; d-none on game start
    // quotatioDisplay: d-none; display on game start
    // quotationDisplaySolution: d-none; display on game over
    // homeMessage: display; d-none on game start
    // scoreboard: d-none; display on game start
    // levelButtonGroup: display; d-none on level click
    // categoryButtonGroup: d-none; display on levelButtonGroup click; d-none on category click
    // startGroup: display; initial d-none after functionality of level and category; display on category click or level click
    // actionButtonGroup: d-none; display on game start
    // authorButtonGroup: d-none; display when solution is complete;
    // restartGroup: d-none; display on game over


class Cryptoquote {
    constructor (quoteArray, cipherArray) {
        this.letter = '';
        this.score = 100;
        // The upper case letters are used as id for the alphabet buttons in the HTML; the indexes are used as indeses for the cipher alphabet
        this.alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        // The lower case letters are used as id for the solution buttons in the HTML
        this.alphabetLC = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        // The letter values are indexed to the alphabet and represent the points to be added or lost in each turn for the selected letter
        this.letterValues = [
            8, 3, 6, 5, 9, 4, 3, 6, 8, 1, 2, 6, 4, 7, 7, 5, 1, 7, 7, 9, 4, 2, 3, 2, 5, 1
        ];

        // Ethan advised me to have an array of solved letters to ensure that the alphabet and solution tiles are displayed correctly
        this.solvedLetters = [];
         
        // I may end up not using the scoreboard object
        this.scoreboard = {
            letter: "",
            value: 0,
            count: 0,
            total: 0,
            score: 100,
            updateScoreboard() {
                // the parseInt may not be needed, but in an earlier version, the numbers were changed to strings for an unknown reason
                // this.value = parseInt(this.value);
                // this.count = parseInt(this.count);
                // this.total = parseInt(this.total);
                // this.score = parseInt(this.score);
            }
        }

        // DOM code blocks for changing display settings

        // Top header: only Rules, everything else d-none; display on level choice
        this.topHeader = document.getElementById('topHeader');
        this.rules = document.getElementById('rulesDiv');
        this.restartSubheader = document.getElementById('restartSubheader');

        // Header: display; d-none on game start
        this.gameHeader = document.getElementById('gameHeader');

        // quotationDisplayHome: display; d-none on game start
        this.quotationDisplayHome = document.getElementById('quotationDisplayHome');

        // quotatioDisplay: d-none; display on game start
        this.quotationDisplay = document.getElementById('quotationDisplay');

        // quotationDisplaySolution: d-none; display on game over
        this.quotationDisplaySolution = document.getElementById('quotationDisplaySolution');

        // homeMessage: display; d-none on game start
        this.homeMessage = document.getElementById('homeMessage');

        // scoreboard: d-none; display on game start
        this.scoreboard = document.getElementById('scoreboard');

        // levelButtonGroup: display; d-none on level click
        this.levelButtonGroup = document.getElementById('levelButtonGroup');

        // categoryButtonGroup: d-none; display on levelButtonGroup click; d-none on category click
        this.categoryButtonGroup = document.getElementById('categoryButtonGroup');

        // startGroup: display; initial d-none after functionality of level and category; display on category click or level click
        this.startGroup = document.getElementById('startGroup');

        // actionButtonGroup: d-none; display on game start
        this.actionButtonGroup = document.getElementById('actionButtonGroup');

        // authorButtonGroup: d-none; display when solution is complete;
        this.authorButtonGroup = document.getElementById('authorButtonGroup');

        // restartGroup: d-none; display on game over
        this.restartGroup = document.getElementById('restartGroup');

        // Alphabet buttons
        this.alphabetButtons = document.querySelectorAll('.alphabet-button');

        // final score display; win/lose messages
        this.finalScoreDisplay = document.getElementById('finalScoreDisplay');
        this.win = document.getElementById('win');
        this.lose = document.getElementById('lose');

        // restart button
        this.restartButton = document.getElementById('restartButton');


        // Quote Tiles
        this.quoteTiles;

        // Action variable
        this.action;

        // access the buttons in the DOM
        // startButton will be accessed outside the class at the end of the code before calling init

        // the level buttons will be enabled in a later phase of game development
        this.beginner = document.getElementById('beginner');
        this.basic = document.getElementById('basic');
        this.genius = document.getElementById('genius');

        // the category buttons will be enabled in a later phase of game development; other categories will be added later
        this.scienceMath = document.getElementById('scienceMath');
        this.polStates = document.getElementById('polStates');
        this.philos = document.getElementById('philos');

        // the author buttons will be enabled in a later phase of game development once the functionality of the bonus is added
        this.author1 = document.getElementById('author1');
        this.author2 = document.getElementById('author2');
        this.author3 = document.getElementById('author3');

        // ----------GET SUBHEADERS FOR DISPLAYING THE LEVEL AND CATEGORY
        // ----------BE SURE TO DISABLE CONFIRM BUTTON (AND OTHER BUTTONS) WHEN NOT IN USE

        // actionButtonGroup buttons 
        this.confirmAction = document.getElementById('confirmAction');
        this.buyButton = document.getElementById('buyButton');
        this.solveButton = document.getElementById('solveButton');

        // restartButton
        this.restartButton = document.getElementById('restartButton');
        
        this.letterDisplay = document.getElementById('letterDisplay');
        this.valueDisplay = document.getElementById('valueDisplay');
        this.countDisplay = document.getElementById('countDisplay');
        this.totalDisplay = document.getElementById('totalDisplay');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.scoreDisplay.innerText = this.score;

 
        this.quotationBank = {
            quote1: {
                id: 'newton1',
                author: 'Isaac Newton',
                date: '1642-1727',
                description: 'English scientist and mathematician',
                quotation: 'If I have seen further it is by standing on the shoulders of Giants.',
                category: 'science and mathematics',
                portrait: 'media/ring.png'
            },
 
            quote2: {
                id: 'einstein1',
                author: 'Albert Einstein',
                date: '1879-1955',
                description: 'German scientist',
                quotation: 'Only two things are infinite, the universe and human stupidity, and I\'m not sure about the former.',
                category: 'science and mathematics',
                portrait: 'media/ring.png'
            },        
 
            quote3: {
                id: 'einstein2',
                author: 'Albert Einstein',
                date: '1879-1955',
                description: 'German scientist',
                quotation: 'A person who never made a mistake never tried anything new.',
                category: 'science and mathematics',
                portrait: 'media/ring.png'
            }
           
 
            // quote2: {
            //     id: ,
            //     author: ,
            //     date: ,
            //     description: ,
            //     quotation: ,
            //     category: ,
            //     portrait: 'media/ring.png'
            // },
 
            // quote2: {
            //     id: ,
            //     author: ,
            //     date: ,
            //     description: ,
            //     quotation: ,
            //     category: ,
            //     portrait: 'media/ring.png'
            // },
 
            // quote2: {
            //     id: ,
            //     author: ,
            //     date: ,
            //     description: ,
            //     quotation: ,
            //     category: ,
            //     portrait: 'media/ring.png'
            // },
           
        }

        this.cipher = this.getCipherAlphabet();
        this.quoteArray = this.getQuoteArray(this.quotationBank.quote1.quotation);
        this.cipherArray = this.getCipherArray(this.quoteArray);

    // end of constructor
    }

    init() {
        console.log("init has started");
        this.displayOnInit();
        this.getCipherAlphabet();
        this.getQuoteArray(this.quotationBank.quote1.quotation);
        this.getCipherArray(this.quoteArray);
        this.displayLetterValues();
        this.displayQuotation();
        this.displayCipherQuote();
        this.chooseAction();
        this.chooseAlphabetTile();

        this.quoteTiles = document.querySelectorAll('.quote-tile')

        // page settings once init has started
        this.startGroup.style.display = "none";
        this.quotationDisplay.style.display = "block";

        this.alphabetButtons.forEach((el) => {
            el.disabled = true;
        })

        this.quoteTiles.forEach(el => {
            el.disabled = true;
        })

        this.confirmAction.disabled = true;
        // may disable buyLetter and solveLetter buttons here
    };

    //getCipherAlphabet() generates the cipher for the puzzle and stores it as an array in cipher
    getCipherAlphabet() {
        let cipher = [];
        let tempAlphabet = this.alphabet.slice();
    
        for (let i = 1; i <= 26; i++) {
            let letterIdx = Math.floor(Math.random() * tempAlphabet.length);
            cipher.push(tempAlphabet[letterIdx]);
            tempAlphabet.splice(letterIdx, 1);  
        }    
        return cipher;
    }

    //getQuoteArray(quotation) takes in the quotation from the constructor and spreads it into an array quoteArray
    getQuoteArray(quotation) {
        let quote = quotation.toUpperCase();
        const quoteArray = [...quote];
        return quoteArray;
    }

    //getCipherArray(quoteArray) takes in the quoteArrayand uses the array cipher to generate an array of the ciphered letters of the quotation stored in cipherArray
    getCipherArray(quoteArray) {
        let tempArray = quoteArray.slice();
        let cipherArray = [];
    
        for (let i = 0; i < tempArray.length; i++) {
            let index = this.alphabet.indexOf(tempArray[i]);
            let newLetter = this.cipher.at(index);
            tempArray[i] = (this.cipher.indexOf(tempArray[i]) !== -1 ? newLetter : tempArray[i]);
            cipherArray[i] = tempArray[i];
        }
        return cipherArray;
    }

    //displayLetterValues() displays the value for each letter on the solution tile in the initial game state until it is solved
    displayLetterValues() {
        for (let i = 0; i < 26; i++) {
            let tile = document.getElementById(this.alphabetLC[i]);
            tile.style.color = "black";
            tile.innerText = this.letterValues[i];
        }          
    }

    // displayOnInit() sets the initial display properties for the game board
    displayOnInit() {
    // Top header: only Rules, everything else d-none; display on level choice; will leave displayed for now

    // Header: display; d-none on game start
    this.gameHeader.style.display = "none";

    // quotationDisplayHome: display; d-none on game start
        this.quotationDisplayHome.style.display = "none";
        this.quotationDisplay.classList.remove('d-none');

    // quotationDisplaySolution: d-none; display on game over
        this.quotationDisplaySolution.style.display = "none";

    // homeMessage: display; d-none on game start
        this.homeMessage.style.display = "none";

    // scoreboard: d-none; display on game start
        // this.scoreboard.style.display = "none";
        this.scoreboard.classList.remove('d-none');

    // levelButtonGroup: display; d-none on level click
        this.levelButtonGroup.style.display = "none";

    // categoryButtonGroup: d-none; display on levelButtonGroup click; d-none on category click
        this.categoryButtonGroup.style.display = "none";

    // startGroup: display; initial d-none after functionality of level and category; display on category click or level click
        this.startGroup.style.display = "block";

    // actionButtonGroup: d-none; display on game start
        this.actionButtonGroup.classList.remove("d-none");
        // this.actionButtonGroup.style.display = "none";


    // authorButtonGroup: d-none; display when solution is complete;
        this.authorButtonGroup.style.display = "none";

    // restartGroup: d-none; display on game over
        this.restartGroup.style.display = "none";
    }

    // The following methods will be called as they are needed

    // displayCipherAlphabet will be displayed when startButton is clicked
    //displayCipherAlphabet(cipher) takes in the cipher and displays the letters on the solution tiles in the alphabet grid when the letter is solved
    displaycipherAlphabet(cipher) {
        for (let i = 0; i < 26; i++) {
            let tile = document.getElementById(alphabetLC[i]);
            tile.innerText = cipher[i];
        }          
    }

    // Both displayQuotation adn displayCipherQuote have to be modified to split the quotation into lines of less than 30 characters
    // The lines need to break at the last space before the 30th character for each row of the quotation
 
    //displayQuotation(quotation) takes in the quotation from the constructor and displays it on the gameboard as buttons; color is transparent until the letter is solved

    // need three variables to split each line at a blank
    // 1st variable contains a number = total per line
    // 2nd variable holds last space
    // 3rd variable 

    displayQuotation(quotation) {
        quotation = document.getElementById('quotation');

        this.quoteArray.forEach(letter => {
            let letterTile = document.createElement('button');
            letterTile.className = "quote-tile";
            letterTile.dataset.index = this.alphabet.indexOf(letter);
            letterTile.style.width = "40px";
            letterTile.style.height = "40px";
            letterTile.style.fontSize = "24px";
            letterTile.style.fontFamily = "monospace";
            letterTile.style.color = "black";
            letterTile.style.color = "transparent";
            letterTile.style.backgroundColor = "beige";
            letterTile.style.borderRadius = "5px";
            if (letter == " ") {
                
                let blank = document.createElement('p');
                blank.style.display = "inline";
                blank.innerText = "___";
                blank.style.color = "transparent";
                quotation.appendChild(blank);
                // added to make sure punctuation marks display
            } else if (this.alphabet.indexOf(letter) == -1) {
                letterTile.innerText = letter;
                letterTile.style.color = "white"; 
                letterTile.style.backgroundColor = "#382f13";
                quotation.appendChild(letterTile);  
            } else {
                letterTile.innerText = letter;
                quotation.appendChild(letterTile);        
            }
        })
    }

// displayCipherQuote will be displayed on game start until the level and/or categories are added
// then will display when the Confirm button is clicked after choosing the category (to be added later);
    displayCipherQuote() {
        let cipherQuote = document.getElementById('cipherQuote');
        let tempArray = this.cipherArray.slice();
    
        this.cipherArray.forEach(letter => {
            let letterTile = document.createElement('button');
            letterTile.className = "cipher-tile";
            letterTile.dataset.index = tempArray.indexOf(letter);
            letterTile.style.width = "40px";
            letterTile.style.height = "40px";
            letterTile.style.fontSize = "24px";
            letterTile.style.fontFamily = "monospace";
            letterTile.style.borderRadius = "5px";
            if (letter == " ") {
                let blank = document.createElement('p');
                blank.style.display = "inline";
                blank.innerText = "___";
                blank.style.color = "transparent";
                cipherQuote.appendChild(blank);
            } else {
                letterTile.innerText = letter;
                cipherQuote.appendChild(letterTile);        
            }
        })
    }

    // chooseAction listens to the action buttons for the player to choose to buy a letter or solve a letter
    // then calls the respective functions
    chooseAction () {
        this.quoteTiles = document.querySelectorAll('.quote-tile')
        this.confirmAction = document.getElementById('confirmAction');
        this.buyButton = document.getElementById('buyButton');
        this.solveButton = document.getElementById('solveButton');
        this.confirmAction.disabled = true;
        this.confirmAction.innerText = 'Choose Action';

        this.buyButton.addEventListener('click', ()=> {
            if (confirmAction.innerText == "Choose Action"){
            this.action = "buy";
                // enable alphabet buttons
                this.alphabetButtons.forEach((el) => {
                    el.disabled = false;
                })

                this.letterDisplay.innerText = '';
                this.valueDisplay.innerText = '';
                this.countDisplay.innerText = '';
                this.totalDisplay.innerText = '';
                this.countDisplay.style.fontSize = "36px";
                this.confirmAction.innerText = 'Choose a letter';
  
            this.confirmAction.addEventListener('click', ()=> {
                this.handleLetter(this.action, this.letter);
                this.countDisplay.style.fontSize = "36px";
    
                // reset all alphabet buttons 
                this.alphabetButtons.forEach((el) => {
                    el.disabled = true;
                })
                // resets confirmAction button to disabled and changes button message
                this.confirmAction.disabled = true;
                this.resetButtons();
                this.chooseAction();
            })

        }   else if (this.confirmAction.innerText == "Choose A Letter") {
            console.log("confirmAction reads Choose A Letter");
        } else if (this.confirmAction.innerText == "Confirm Action") {
            console.log("confirmAction reads Confirm Action");
        }
        });

        this.solveButton.addEventListener('click', ()=> {
            this.action = "solve";
            if (confirmAction.innerText == "Choose Action") {
                // enable the alphabet buttons
                this.alphabetButtons.forEach((el) => {
                    el.disabled = false;
                })

                this.letterDisplay.innerText = '';
                this.valueDisplay.innerText = '';
                this.countDisplay.innerText = '';
                this.totalDisplay.innerText = '';
                this.countDisplay.style.fontSize = "36px";
                this.confirmAction.innerText = 'Choose a letter';

                // add back in the event listener to confirm the letter
                this.confirmAction.addEventListener('click', ()=> {
                    this.confirmAction.innerText = "Pick quote tile";
                    this.handleLetter(this.action, this.letter);
                    this.countDisplay.style.fontSize = "36px";
        
                    // reset all alphabet buttons to disabled
                    this.alphabetButtons.forEach((el) => {
                        el.disabled = true;
                    })
                    // resets confirmAction button to disabled and changes button message
                    this.confirmAction.disabled = true;
                    this.quoteTiles.forEach(el => {
                        el.disabled = false;
                    })
                    // Use arguments.callee to remove event listener that has anon function
                })


            }   else if (this.confirmAction.innerText == "Choose A Letter") {
                console.log("confirmAction reads Choose A Letter");
            } else if (this.confirmAction.innerText == "Confirm Action") {
                console.log("confirmAction reads Confirm Action");
            }
        })        
    }
        // chooseAlphabetTile uses an event listener to take the inner text value of the letter clicked and store it in letter,
// then gets the value of the letter by using the value stored at that letter's index in the array letterValues,
// then changes the color of the alphabet and solution tiles for that letter when Confirm button is clicked
// then calls the appropriate function to buy or solve the letter
    chooseAlphabetTile() {
        // loops through the alphabetButtons nodelist to add an event listener to each one
        // when clicked, changes confirmAction button status
        // sets the inner text of each button to the letter and links its index to the value and new letter in the cipher
        this.alphabetButtons.forEach((el) => {
            el.addEventListener('click', ()=> {
                this.confirmAction.innerText = 'Confirm letter';
                this.confirmAction.disabled = false;
                this.letter = el.innerText;
                let valueIndex = this.alphabet.indexOf(this.letter);
                let letterValue = this.letterValues[valueIndex];
                let newLetter = this.cipher[valueIndex];

                this.letterDisplay.innerText = this.letter;
                this.valueDisplay.innerText = letterValue;

                el.style.color = "white";
                el.style.backgroundColor = "#024402";

                // disable buy and solve buttons
                this.buyButton.disabled = true;
                this.solveButton.disabled = true;

                return this.letter;
            })
        })

    }
 
    handleLetter(action, letter, clickedTile = null) {
        if(action == 'buy') {
            let valueIndex = this.alphabet.indexOf(this.letter);
            let letterValue = this.letterValues[valueIndex];
            let newLetter = this.cipher[valueIndex];
            
            let alphabetTile = document.getElementById(this.alphabet[valueIndex]);
            let solutionTile = document.getElementById(this.alphabetLC[valueIndex]);
        
            let total = 0;
            let count = 0;
            const indexArray = [];
    
            for (let i = 0; i < this.quoteArray.length; i++) {
                if (this.quoteArray[i] == letter) {
                    indexArray.push(i);
                }
    
                this.confirmAction.innerText = "Choose Action";
                solutionTile.innerText = newLetter;
                solutionTile.style.color = "white";
                solutionTile.style.backgroundColor = "#024402";
    
                count = indexArray.length;
                total = letterValue * count;
    
                // scoreboard.count = count;
                // scoreboard.total = total;
    
                this.letterDisplay.innerText = letter;
                this.valueDisplay.innerText = letterValue;
                this.countDisplay.innerText = count;
                this.totalDisplay.innerText = total;  
                this.countDisplay.style.fontSize = "36px";
            }
                this.changeQuoteTiles(this.letter);
    
                if (count == 0) {
                    this.score -= letterValue;
                    total = -(letterValue);
                }   else {
                    this.score -= total;
                }
    
                if (this.score < 0) {
                    console.log("score is less than zero; You lose!");
                    this.scoreDisplay.style.color = "red";
                    this.gameOver();
                    // insert call to gameOver(); yet to be written
                }
                this.countDisplay.innerText = count;
                this.totalDisplay.innerText = total;
                this.scoreDisplay.innerText = this.score;
    
                // push the bought letter into the solvedLetters array
                this.solvedLetters.push(letter);
                console.log(this.solvedLetters);
                if (this.solvedLetters.length == 26) {
                    console.log("Cryptoquote solved!  You win!");
                    this.gameOver();
                }

                // reset confirmAction.innerText to "Choose Action"; disable chooseAction button
                this.chooseAction.innerText = "Choose Action";
                this.chooseAction.disabled = true;
                this.buyButton.disabled = false;
                this.solveButton.disabled = false;

// --------------------SOLVE LETTER---------------------------------------------------------

        } else if (this.action == 'solve') {            
            // variables in score
            let total = 0;
            let count = 0;
            console.log(this.confirmAction.innerText);
            confirmAction.innerText = "Choose quote tile";

            // variables indexed to alphabet; value = the index of the letter in the alphabet; newLetter = the letter at the index in the cipher alphabet
            let valueIndex = this.alphabet.indexOf(this.letter);
            let letterValue = this.letterValues[valueIndex];
            let newLetter = this.cipher[valueIndex];

            // variables indexed to the quotation
            // the indexArray will contain the indexes of all the letter instances in the quoteArray, and by extension, the cipherArray
            const indexArray = [];
            
            // variables linked to the DOM: alphabet and solution buttons by id, quotation and cipherQuote tiles by class name
            let alphabetTile = document.getElementById(this.alphabet[valueIndex]);
            let solutionTile = document.getElementById(this.alphabetLC[valueIndex]);
            solutionTile.innerText = letterValue;
    
            let quoteTiles = document.querySelectorAll('.quote-tile');
    
            // initial loop is indexed with the quoteTiles nodelist
            for (let i = 0; i < quoteTiles.length; i++) {
                if (this.quoteArray[i] == this.letter) {
                    indexArray.push(i);
                }
                // variables linked to the data-index of the quoteTile buttons in the HTML and the alphabet
                let letterIndex = quoteTiles[i].dataset.index;
                valueIndex = this.alphabet.indexOf(this.letter);//may already have this value from the beginning of the subroutine
                console.log(this.confirmAction.innerText);

                // check the values of the index of the current quoteTile by data-index and the index of the letter in the alphabet   
                quoteTiles[i].addEventListener('click', ()=> {
                    let clickedTile = quoteTiles[i].innerText;
                    this.confirmAction.disabled = false;
                    this.confirmAction.innerText = "Confirm quote tile";

                    confirmAction.addEventListener('click', ()=> {
                        // call the changeTiles function
                        this.confirmAction.innerText = 'Confirmed quote tile';
    
                        if (clickedTile == this.letter) {
                            // This statement executes if the letterIndex and the valueIndex match

                            // // push the bought letter into the solvedLetters array
                            this.solvedLetters.push(this.letter);

                            this.confirmAction.innerText = "Choose Action";

                            // change solutionTile if letters match
                            alphabetTile.style.color = "white";
                            alphabetTile.style.backgroundColor = "#024402";
                            solutionTile.innerText = newLetter;
                            solutionTile.style.color = "white";
                            solutionTile.style.backgroundColor = "#024402";

                            this.filterTiles();
                    //
    
                            // count is the number of instances of the letter in thw quotation
                            // when letter is solved, the total earns the value of the letter
                            count = indexArray.length;
                            total = letterValue;
    
                            this.score = this.score + total;
                            this.countDisplay.innerText = count;
                            this.countDisplay.style.fontSize = "36px";
                            this.totalDisplay.innerText = total; 
                            this.scoreDisplay.innerText = this.score;
                            this.confirmAction.innerText = 'Choose Action';
                            this.changeQuoteTiles(this.letter); 
    
                            // reset clickedTile to an empty string
                            clickedTile = "";

                            } else if (clickedTile != letter) {
                                // reset alphabet and solution tiles to initial state
                                alphabetTile.style.color = "var(--footerColor)";
                                alphabetTile.style.backgroundColor = "rgb(238, 227, 198)";
                                solutionTile.style.color = "var(--footerColor)";
                                solutionTile.style.backgroundColor = "rgb(238, 227, 198)";
                                solutionTile.innerText = letterValue;
    
                                this.countDisplay.style.fontSize = "20px";
                                this.countDisplay.innerText = "No match";
                                total = -(letterValue);
                                this.totalDisplay.innerText = total;
                                this.score +=  total;
                                this.scoreDisplay.innerText = this.score;
                                // need to reset clickedTile
                                clickedTile = null;
                                this.confirmAction.innerText = 'Choose Action';
                                // added a return statement to see if that keeps the color change for the tiles that have been solved
                            }
                            // score = score + total;
                            this.quoteTiles.forEach(el => {
                                el.disabled = true;
                            })

                            console.log(this.solvedLetters);
                            if (this.solvedLetters.length == 26) {
                                console.log("Cryptoquote solved!  You win!");
                            }

                            this.resetButtons();
                            this.chooseAction();
                    })
                })
            }
// This section may be deleted
            for (let i = 0; i < this.quoteArray.length; i++) {

                    this.confirmAction.innerText = "What goes here";
                    // solutionTile.innerText = newLetter;
                    // solutionTile.style.color = "white";
                    // solutionTile.style.backgroundColor = "#024402";
    
                    count = indexArray.length;
                    total = letterValue;
                        // total = letterValue * count;
            
                    // scoreboard.count = count;
                    // scoreboard.total = total;
            
                    this.letterDisplay.innerText = letter;
                    this.valueDisplay.innerText = letterValue;
                    // countDisplay.innerText = count;
                    // totalDisplay.innerText = total;  
            }
            this.scoreDisplay.innerText = this.score;
            this.confirmAction.removeEventListener('click', this.chooseAction);
            this.confirmAction.innerText = "New Turn";
            this.chooseAction.disabled = true;
            this.confirmAction.innerText = "Choose Action";
            this.buyButton.disabled = false;
            this.solveButton.disabled = false;
        }
    }
 
    // The changeQuoteTiles method changes the display of the quotation and cipherQuote tiles on the gameboard when the letter is matched
    changeQuoteTiles(letter) {    
        let quoteTiles = document.querySelectorAll('.quote-tile');
        let cipherTiles = document.querySelectorAll('.cipher-tile');
    
        for (let i = 0; i < quoteTiles.length; i++) {
            let letterIndex = quoteTiles[i].dataset.index;
            let valueIndex = this.alphabet.indexOf(letter);
    
            if (letterIndex == valueIndex) {
                quoteTiles[i].style.color = 'white';
                quoteTiles[i].style.backgroundColor = "#382f13";
                cipherTiles[i].style.color = 'red';
                cipherTiles[i].style.backgroundColor = "lightgray";
            }
        }           
    }

    filterTiles() {
        this.alphabetButtons.forEach((item) => {
            if(this.solvedLetters.includes(item.innerText)) {
                item.style.color = "white";
                item.style.backgroundColor = "#024402"
            } else {
                item.style.color = "var(--footerColor)"
                item.style.backgroundColor = "rgb(238, 227, 198)"
            }
            console.log('ran set letter style in chooseAlphabetTile')
        })
    }
    
    resetButtons() {
        // https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
        // Article that showed how to reset all event listeners on an html node

        var newConfirm = this.confirmAction.cloneNode(true);
        this.confirmAction.parentNode.replaceChild(newConfirm, this.confirmAction);
        var newBuy = this.buyButton.cloneNode(true);
        this.buyButton.parentNode.replaceChild(newBuy, this.buyButton);
        var newSolve = this.solveButton.cloneNode(true);
        this.solveButton.parentNode.replaceChild(newSolve, this.solveButton);

        this.quoteTiles.forEach(el => {
            let newQuote = el.cloneNode(true);
            el.parentNode.replaceChild(newQuote, el);
        })
    }

    gameOver() {
        console.log("gameOver begins", this.solvedLetters);
        this.quotationDisplay.style.display = "none";
        this.actionButtonGroup.style.display = "none";
        this.scoreboard.style.display = "none";
        this.restartGroup.classList.remove('d-none');
        this.restartGroup.style.display = "block";
        this.finalScoreDisplay.innerText = this.score;
        if (this.score < 0) {
            this.win.style.display = "none";
            // this.lose.style.display = "block"
        } else if (this.score >= 0) {
            this.lose.style.display = "none";
        }
        this.restartButton.addEventListener('click', ()=> {
            console.log("restart clicked");
            this.init();
        })

    }

    // end of class
}  

this.scoreDisplay.innerText = this.score;

let startButton = document.getElementById('startButton');
let newAction = new Cryptoquote();
startButton.addEventListener('click', ()=> {
    newAction.init();
})
 
console.log('End of code');

