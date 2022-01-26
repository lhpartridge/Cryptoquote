
/**
Cryptoquote
Create a class for the quotation with keys for author, description, quotation, category and quoteArray, the array for the quotation
Include methods
    spreading the quotation into quoteArray
 
Create a class for the cryptoquote with keys for quoteArray and cipherArray, the array for the ciphered alphabet
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
// 1/24 10:44 Moved global variables from below into the constructor
        this.letter = '';
        this.score = 500;
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
            score: 500,
            updateScoreboard() {
                // the parseInt may not be needed, but in an earlier version, the numbers were changed to strings for an unknown reason
                // this.value = parseInt(this.value);
                // this.count = parseInt(this.count);
                // this.total = parseInt(this.total);
                // this.score = parseInt(this.score);
            }
        }

        // Moved all the global elements into the constructor
        // DOM code blocks for changing display settings

        // Top header: only Rules, everything else d-none; display on level choice
        this.topHeader = document.getElementById('topHeader');
        this.rules = document.getElementById('rulesDiv');

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

        // 1/24 11:26 moved the initialization of these variables into the constructor
        this.cipher = this.getCipherAlphabet();
        this.quoteArray = this.getQuoteArray(this.quotationBank.quote3.quotation);
        this.cipherArray = this.getCipherArray(this.quoteArray);

        // this.cipher = getCipherAlphabet();
        // this.quoteArray = getQuoteArray(this.quotation);
        // this.cipherArray = getCipherArray(this.quoteArray);

    // end of constructor
    }

// 1/24 1:19 NEED TO KNOW how to get the qutotation from the object

// Moved all the functions into the class as methods
// 1/24 11:03  Moved init to first method inside class but not inside constructor; removed the arrow notation
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

        // page settings once init has started
        this.startGroup.style.display = "none";
        this.quotationDisplay.style.display = "block";



    //     // set initial page settings
    //     // On init, the page settings are:
    // // Top header: only Rules, everything else d-none; display on level choice; will leave displayed for now

    // // Header: display; d-none on game start
    //     this.gameHeader.style.display = "block";

    // // quotationDisplayHome: display; d-none on game start
    //     this.quotationDisplayHome.style.display = "block";

    // // quotatioDisplay: d-none; display on game start
    //     this.quotationDisplay.style.display = "none";

    // // quotationDisplaySolution: d-none; display on game over
    //     this.quotationDisplaySolution.style.display = "none";

    // // homeMessage: display; d-none on game start
    //     this.homeMessage.style.display = "none";

    // // scoreboard: d-none; display on game start
    //     this.scoreboard.style.display = "none";

    // // levelButtonGroup: display; d-none on level click
    //     this.levelButtonGroup.style.display = "none";

    // // categoryButtonGroup: d-none; display on levelButtonGroup click; d-none on category click
    //     this.categoryButtonGroup.style.display = "none";

    // // startGroup: display; initial d-none after functionality of level and category; display on category click or level click
    //     this.startGroup.style.display = "none";

    // // actionButtonGroup: d-none; display on game start
    //     this.actionButtonGroup.style.display = "none";

    // // authorButtonGroup: d-none; display when solution is complete;
    //     this.authorButtonGroup.style.display = "none";

    // // restartGroup: d-none; display on game over
    //     this.restartGroup.style.display = "none";
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

    // quotatioDisplay: d-none; display on game start
    // specificity issues:  d-none needs to be removed 
    // important tags can only be overridden by another important tags below 
    // avoid using or overusing; it's a bootstrap thing
    // override order is : tag, then class, then id, then inline, then important
    // read up later on

        this.quotationDisplay.classList.remove('d-none');
        // this.quotationDisplay.style.display = "block";

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

    // quoteArray.length

    displayQuotation(quotation) {
        quotation = document.getElementById('quotation');
    
        // add a counter for the letters so that I can break the line at a blank before 30 characters
        // count all the blanks; if count 
        // try using a d-flex and flex-wrap on container in CSS 
        this.quoteArray.forEach(letter => {
            let letterTile = document.createElement('button');
            letterTile.className = "quote-tile";
            letterTile.dataset.index = this.alphabet.indexOf(letter);
            // letterTile.className = letter;
            letterTile.style.width = "40px";
            letterTile.style.height = "40px";
            letterTile.style.fontSize = "24px";
            letterTile.style.fontFamily = "monospace";
            letterTile.style.color = "black";
            letterTile.style.color = "transparent";
            letterTile.style.backgroundColor = "beige";
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
            // letterTile.className = letter;
            letterTile.style.width = "40px";
            letterTile.style.height = "40px";
            letterTile.style.fontSize = "24px";
            letterTile.style.fontFamily = "monospace";
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
 
    // 1/24 11:57 moved chooseAction to the class; removed console logs and redundant comments
    // have the method start when startButton is clicked
    // chooseAction listens to the action buttons for the player to choose to buy a letter or solve a letter
    // then calls the respective functions
    chooseAction () {
        console.log("chooseAction begins");
        this.letter = '';//added to reset letter at the beginning of the function
        this.confirmAction.innerText = 'Choose Action';
        // console.log("at beginning of chooseAction this.score is", this.score);
        // reset scoreboard after the player chooses the action
        this.buyButton.addEventListener('click', ()=> {
            // added the variable action to prevent solveLetter from running after buyLetter
            // console.log("in chooseAction at beginning of buyLetter event listener this.score is",this.score);
            this.action = "buy";
            this.confirmAction.disabled = false;
            this.letterDisplay.innerText = '';
            this.valueDisplay.innerText = '';
            this.countDisplay.innerText = '';
            this.totalDisplay.innerText = '';
            this.countDisplay.style.fontSize = "36px";
            this.confirmAction.innerText = 'Choose a letter';
    
            // call the choose letter method; this letter will be used in multiple methods
            this.letter = this.chooseAlphabetTile();
            console.log("inside chooseAction after bought letter  and solvedLetters =", this.letter, this.solvedLetters);
            // console.log("in chooseAction after letter is chosen event listener this.score is",this.score);
            // moved the confirmAction event listener to inside the buyButton event listener to prevent the color change until the buyButton function has run
            this.confirmAction.addEventListener('click', ()=> {
                this.confirmAction.innerText = 'Choose action';
                this.confirmAction.innerText = '';
                // call the buyLetter method
                this.buyLetter(this.letter);
                console.log("return letter, ", this.letter, "to chooseAction from buyLetter"); 
                // console.log("in chooseAction after the buyLetter function is run, this.score is", this.score);
            });
            // confirmAction.disabled = true;
            //added return statement to avoid running the next event listener; may need to remove it
            // console.log("in chooseAction at end of buyLetter event listener this.score is",this.score);
            console.log("in chooseAction end of buyLetter event listener");
            // return;
        })

        //  need to add another event listener to confirm the letter to call buyLetter
        solveButton.addEventListener('click', ()=> {
            action = "solve";
            //reset letter before solveButton is clicked
            this.letter = ''; 
            // enable the confrmAction button to accept a click
            this.confirmAction.disabled = false;
            this.letterDisplay.innerText = '';
            this.valueDisplay.innerText = '';
            this.countDisplay.innerText = '';
            this.totalDisplay.innerText = '';
            this.countDisplay.style.fontSize = "36px";
            this.confirmAction.innerText = 'Choose a letter';
    
            // call the choose letter method
            this.letter = this.chooseAlphabetTile();

            this.confirmAction.addEventListener('click', ()=> {
                // call the solveLetter method
                this.solveLetter(this.letter);
                console.log("return letter to chooseAction from solveLetter");
                // added the following code to prevent the scoreboard from displaying the count until match is confirmed
                this.countDisplay.innerText = '';
                this.totalDisplay.innerText = '';
                this.countDisplay.style.fontSize = "36px";
                // commented out confirmAction.innerText because it should be handled in solveLetter
                // this.confirmAction.innerText = 'Choose quote tile';
            })
            console.log("in chooseAction end of solveLetter event listener");
            //added return statement to avoid running the next event listener
            return;
        })
    }
 
    // 1/24 12:06 moved chooseAlphabetTile into the class
        // chooseAlphabetTile uses an event listener to take the inner text value of the letter clicked and store it in letter,
// then gets the value of the letter by using the value stored at that letter's index in the array letterValues,
// then changes the color of the alphabet and solution tiles for that letter when Confirm button is clicked
// then calls the appropriate function to buy or solve the letter
    chooseAlphabetTile() {
        console.log("chooseAlphabetTile begins");
        for (let i = 0; i < 26; i++) {
            // confirmAction.disabled = false;
            let alphabetTile = document.getElementById(this.alphabet[i]);
            let solutionTile = document.getElementById(this.alphabetLC[i]);
            // this.letter = '';//added to reset letter at the beginning of the function
            
            alphabetTile.addEventListener('click', ()=> {
                this.confirmAction.innerText = 'Confirm letter';
                // confirmAction.disabled = true;
                this.letter = alphabetTile.innerText;
                let valueIndex = this.alphabet.indexOf(this.letter);
                let letterValue = this.letterValues[valueIndex];
                let newLetter = this.cipher[valueIndex];
    
                this.letterDisplay.innerText = this.letter;
                this.valueDisplay.innerText = letterValue;
    
                // scoreboard.letter = letter;
                // scoreboard.value = letterValue;
    
                alphabetTile.style.color = "white";
                alphabetTile.style.backgroundColor = "#024402";
                console.log("chooseAlphabetTile ends, letter is", this.letter);
                return this.letter;
            })
        }
    }
 
       
    
    // There may be some lingering issues with the buyLetter method
// the buyLetter method takes the letter from chooseAlphabetTile and initializes variables based on the letter and its index
// then it gets the DOM elements for the alphabet and solution tiles corresponding to that letter according to the index
// ~then gets the total count and index of that letter in the quoteArray and stores them in count and an array letterIndexes,
// ~then calculates the total points and stores it in total
// then deducts the points from the score
// ~then displays on the scoreboard the letter, count, total and score
// then changes the display for each instance of the letter in the quotation to black
// then changes the display for each instance of the quotation in the cipherQuote to red (or another color)

    buyLetter(letter) {
        console.log("buyLetter begins");
        if (action == "solve") {
            return;
        }
        console.log("at the beginning of buyLetter, letter and solvedLetters = ", this.letter, this.solvedLetters);
        // // added this conditional to prevent buyLetter from continuing if the letter has already been solved
        // // the result was that the confirmAction button text no longer displays
        // if (this.solvedLetters.includes(this.letter)) {
        //     console.log("Solved letters already contains the letter ", this.letter);
        //     return;
        // }

        let valueIndex = this.alphabet.indexOf(this.letter);
        let letterValue = this.letterValues[valueIndex];
        let newLetter = this.cipher[valueIndex];
        
        let alphabetTile = document.getElementById(this.alphabet[valueIndex]);
        let solutionTile = document.getElementById(this.alphabetLC[valueIndex]);
    
        let total = 0;
        let count = 0;
        const indexArray = [];
        console.log("newLetter is", newLetter);

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
                // console.log("Bought a ", letter, "change tile color here");
        }
        console.log(this.letter, this.solvedLetters);
            //moved inside the conditional to prevent color change until confirmed
            // moved back outside to keep from running every iteration
            this.changeQuoteTiles(this.letter);
            // added conditional to debit the score if there are no instances of the letter
            // else the debit is the total value of the tile count

            // ------------ERROR IN THIS SECTION; NEED TO ADD ANOTHER CONDITION BECAUSE THE SCORE IS INCORRECTLY DECREASED
            if (count == 0) {
                console.log("if count == 0 in buyLetter, before change this.score is", this.score);
                this.score -= letterValue;
                console.log("if count == 0 in buyLetter, after change this.score is", this.score);
                total = -(letterValue);
            }   else {
                // console.log("if count != 0 in buyLetter, before change this.score is",this.score);// This score displayed correctly as a string on the console
                this.score -= total;
                // console.log("if count != 0 in buyLetter, after change this.score is",this.score);
            }

            if (this.score < 0) {
                // console.log("score is less than zero; You lose!");
                this.scoreDisplay.style.color = "red";
                // insert call to gameOver(); yet to be written
            }
            this.totalDisplay.innerText = total;
            this.scoreDisplay.innerText = this.score;
            // console.log("at end of buyLetter, this.scoreDisplay.innerText is ", this.scoreDisplay.innerText);
        // console.log("at end of buyLetter, this.score is", this.score);

        // push the bought letter into the solvedLetters array
        this.solvedLetters.push(this.letter);
        console.log(this.letter, this.solvedLetters);


            // // reset letter to an empty string
            // this.letter = null;

        // console.log("at the end of buyLetter, count is", count, " total is", total, "score is", this.score);
        console.log("buyLetter ends");

        // // return this.score;
        // return;
        // replaced return statement with call to chooseAction;  
        this.chooseAction();
    }
 

    // There are definitely issues with the solveLetter method:  the solution tiles keep changing back when they should not
    // I have not removed all comments and console logs because this method is still being revised

    // solveLetter takes in the letter that the player has chosen, records its index in the alphabet, its value and the corresponding letter in the cipher
// ~it selects the alphabet and solution tiles corresponding to the letter
// ~it creates an empty array to store the indexes of the letter in the quotation
// ~it selects all the quoteTiles and cipherTiles
// ~it resets the total and count to 0
// ~it loops through the quoteTiles to add an event listener that records the letter in the quote that the player clicks in clickedTile
// it checks if the letter clicked is the letter that the player has chosen
// if the letters match, all the tiles with the same data-index change style to display for quoteTiles and to (red) for cipherTiles
// the total is added to the score
// if the letters don't match, the scoreboard is cleared and the player is prompted to take another turn
// the total is deducted from the score
    solveLetter(letter) {
        console.log("solveLetter begins, letter is", this.letter);
        if (action == "buy") {
            return;
        }
        // variables in score
        let total = 0;
        let count = 0;
        // console.log("At the beginning of the solveLetter function, count, total, and score =", count, total, this.score);
        
        confirmAction.innerText = "Choose quote tile";
        confirmAction.disabled = true;

        // variables indexed to alphabet; value = the index of the letter in the alphabet; newLetter = the letter at the index in the cipher alphabet
        let valueIndex = this.alphabet.indexOf(this.letter);
        let letterValue = this.letterValues[valueIndex];
        let newLetter = this.cipher[valueIndex];
        // console.log("valueIndex is", valueIndex, "letterValue is ", letterValue, "newLetter is", newLetter);

        // variables indexed to the quotation
        // the indexArray will contain the indexes of all the letter instances in the quoteArray, and by extension, the cipherArray
        const indexArray = [];
        
        // variables linked to the DOM: alphabet and solution buttons by id, quotation and cipherQuote tiles by class name
        let alphabetTile = document.getElementById(this.alphabet[valueIndex]);
        let solutionTile = document.getElementById(this.alphabetLC[valueIndex]);
        console.log("solutionTile.innerText is", solutionTile.innerText);
        solutionTile.innerText = letterValue;
        // console.log(solutionTile.innerText);


        let quoteTiles = document.querySelectorAll('.quote-tile');
        let cipherTiles = document.querySelectorAll('.cipher-tile');

    // I asked Lauren about adding a function getletterCount for the redundant code in buyLetter and solveLetter
    // Due to time and other constraints, she advised me to leave the redundant code for now,


        // Lauren suggested putting the event listener outside the loop that counts the letter values;

        // initial loop is indexed with the quoteTiles nodelist
        for (let i = 0; i < quoteTiles.length; i++) {
            // moved this conditional from the commented out code below to try to solve the solutionTile display problems
            if (this.quoteArray[i] == this.letter) {
                indexArray.push(i);
            }

            // if (i == 0) {

            //     // console.log("At the beginning of the solveLetter function for loop, count, total, and score =", count, total, score);
            // }
            // variables linked to the data-index of the quoteTile buttons in the HTML and the alphabet
            let letterIndex = quoteTiles[i].dataset.index;
            valueIndex = this.alphabet.indexOf(this.letter);

            let clickedTile = quoteTiles[i].innerText;
            // check the values of the index of the current quoteTile by data-index and the index of the letter in the alphabet
            // console.log("inside solveButton for loop, letterIndex and valueIndex are", letterIndex, valueIndex);

            quoteTiles[i].addEventListener('click', ()=> {
                // check to see values for the iteration of the tile inner text, the tile data index, and the alphabet index
                // console.log('inside solveLetter event listener, letter clicked is', clickedTile, "letterIndex and valueIndex are", letterIndex, valueIndex, "the letter at valueIndex is", alphabet[valueIndex]);
                this.confirmAction.disabled = false;
                this.confirmAction.innerText = "Confirm quote tile";
                // console.log(solutionTile.innerText);


                // importing a confirm event listener to execute next code block

                confirmAction.addEventListener('click', ()=> {
                    // console.log("inside quoteTiles event listener, clicked Confirm");
                    // call the changeTiles function
                    
                    this.confirmAction.innerText = 'Confirmed quote tile';
                    // solutionTile.innerText = newLetter;
                    // console.log("solutionTile.innerText is", solutionTile.innerText, "don't change color until match is confirmed");
                    // console.log("At the beginning of the solveLetter function outside the conditional, count, total, and score =", count, total, score);

                // moved the conditional inside the Confirm event listener to check the clickedTile to the letter
                    if (clickedTile == this.letter) {
                        // This statement executes if the letterIndex and the valueIndex match, indicating 
                        // console.log("at beginning of solveLetter Confirm event listener and conditional, total and score are", total, score);
                        this.confirmAction.innerText = "Letters match!";
                        // change solutionTile if letters match
                        solutionTile.innerText = newLetter;
                        solutionTile.style.color = "white";
                        solutionTile.style.backgroundColor = "#024402";

                        // count is the number of instances of the letter in thw quotation
                        // when letter is solve, the total earns the value of the letter
                        count = indexArray.length;
                        total = letterValue;

                        this.score = this.score + total;
                        this.countDisplay.innerText = count;
                        this.countDisplay.style.fontSize = "36px";
                        this.totalDisplay.innerText = total; 
                        // console.log(this.scoreDisplay.innerText);
                        this.scoreDisplay.innerText = this.score;
                        // console.log("when letters in solveLetter match, total and score are", total, score);
                        // call changeQuoteTiles if letters match; they are changing too soon
                        this.changeQuoteTiles(this.letter); 

                        // reset clickedTile to an empty string
                        clickedTile = "";

                        // // push the bought letter into the solvedLetters array
                        // this.solvedLetters.push(this.letter);
                        // console.log(i, this.solvedLetters);
                        
                        // added a return statement to see if that keeps the color change for the tiles that have been solved
                        return;

    // added condition to try to keep the solution tiles from changing back when the next action occurs
                        } else if (clickedTile != letter) {
                            // console.log("inside solveLetter conditional clickedTile and letter do not match; don't change tiles", clickedTile, letter, letterValue);
                            
                            // reset alphabet and solution tiles to initial state
                            alphabetTile.style.color = "var(--footerColor)";
                            alphabetTile.style.backgroundColor = "rgb(238, 227, 198)";
                            solutionTile.style.color = "var(--footerColor)";
                            solutionTile.style.backgroundColor = "rgb(238, 227, 198)";
                            solutionTile.innerText = letterValue;

                            // commented out the reset to the confirmAction button because it will return to chooseAction 
                            // this.confirmAction.innerText = "Choose action";
                            this.countDisplay.style.fontSize = "20px";
                            this.countDisplay.innerText = "No match";
                            total = -(letterValue);
                            this.totalDisplay.innerText = total;
                            // check to see if the score correctly subtracts the value of the wrong letter choice
                            this.score +=  total;
                            // console.log(this.scoreDisplay.innerText);
                            this.scoreDisplay.innerText = this.score;
                            // need to reset clickedTile
                            clickedTile = null;
                            // added a return statement to see if that keeps the color change for the tiles that have been solved
                            return this.score;
                        }
                        // score = score + total;
                })
            })

            // to ensure that the solution tiles stay changed; have an array for solved letters that will keep track of the solution tiles to be changed

            // copied code from changeQuoteTiles to get the tiles to add the event listeners

            // moved these to the beginning of the function
            // let quoteTiles = document.querySelectorAll('.quote-tile');
            // let cipherTiles = document.querySelectorAll('.cipher-tile');
        
            // for (i = 0; i < quoteTiles.length; i++) {


            //     // commented out the code from changeQuoteTiles
            //     // let letterIndex = quoteTiles[i].dataset.index;
            //     // let valueIndex = alphabet.indexOf(letter);
        
            //     // if (letterIndex == valueIndex) {
            //     //     quoteTiles[i].style.color = 'white';
            //     //     quoteTiles[i].style.backgroundColor = "#382f13";
            //     //     cipherTiles[i].style.color = 'red';
            //     //     cipherTiles[i].style.backgroundColor = "lightgray";
            //     // }
            // }           
        
            // console.log("at the end of changeQuoteTiles, score is", score);
            // console.log("At the beginning of the solveLetter function for loop, count, total, and score =", count, total, score);

        }


        // I had commented out this for loop, but the count no longer displayed

        // put the loop inside the event listener for the quotation tiles, including changeQuoteTiles
        for (let i = 0; i < this.quoteArray.length; i++) {
            // moved this conditional to inside the first loop through the quoteArray
            // if (quoteArray[i] == letter) {
            //     indexArray.push(i);
            // }
            // This line of code never ran
                this.confirmAction.innerText = "What goes here";
                // solutionTile.innerText = newLetter;
                // solutionTile.style.color = "white";
                // solutionTile.style.backgroundColor = "#024402";

                count = indexArray.length;
                total = letterValue;

                // changed because solveLetter adds only the value of the letter chosen, not the total of all instances of the letter
                // total = letterValue * count;
        
                // scoreboard.count = count;
                // scoreboard.total = total;
        
                this.letterDisplay.innerText = letter;
                this.valueDisplay.innerText = letterValue;
                // countDisplay.innerText = count;
                // totalDisplay.innerText = total;  
        }


        // changeQuoteTiles(letter);
        // score = score + total;
        // count = indexArray.length;
        // countDisplay.innerText = count;
        console.log(this.solvedLetters);
        // console.log(this.scoreDisplay.innerText);
        this.scoreDisplay.innerText = this.score;
        console.log("solveLetter ends");
        // console.log("at the end of solveLetter, total is", total, "score is", score, "total + score =", total + score);
        // removed return and replace it with a call to chooseAction()
        // return this.score;
        this.chooseAction();
    }
 
    // The changeQuoteTiles method has some issues
    // The changeQuoteTiles method changes the display of the quotation and cipherQuote tiles on the gameboard when the letter is matched
    changeQuoteTiles(letter) {    
        console.log("changeQuoteTiles begins");    
        // console.log("changeQuoteTiles was triggered by last action");
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
    
        // console.log("at the end of changeQuoteTiles, score is", score);
        console.log("changeQuoteTiles ends"); 
    }
    

    // end of class
}  

// Outside the class-----------------------------------------

    // set confirmAction button to disabled at initial game state
    confirmAction.disabled = true;


// -----------------------------Code below this line is outside the class and may need to be moved, modified, or deleled
// set initial score
// console.log(this.scoreDisplay.innerText);
this.scoreDisplay.innerText = this.score;

console.log("last line of code before start sequence is initiated");

// Using Herb's screenshot as a model, I already had the start button; added the action and changed the event listener 
let startButton = document.getElementById('startButton');
let action = new Cryptoquote();
// startButton.addEventListener('click', init); old event listener
startButton.addEventListener('click', ()=> {
    action.init();
})
 
console.log('End');

// All remaining code was commented out and removed to scratch pager
