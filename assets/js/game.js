// Scroll to div to start game
$("#text").click(function () {
  $('html,body').animate({
    scrollTop: $(".div-2").offset().top},'slow');
  });

// Create Object to hold all variables and methods
var hangMan = {
  // Create array to hold all words
  words:{
    tupac:{},
    biggiesmalles:{},
    beachboys: {},
    greenday: {},
    snoopdog: {},
    nas: {},
    prince: {},
  },

// Set all initial state of game
  choosenWord: null,
  wordLetters: [],
  matchingLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

startGame: function() {
  // Choose random word
  var objKeys = Object.keys(this.words);
  this.choosenWord = objKeys[Math.floor(Math.random() * objKeys.length)];
  console.log(this.words);
  console.log(this.choosenWord);
  // split the words
  this.wordLetters = this.choosenWord.split("");
  console.log(this.choosenWord);
  // start and display underscores
  this.buildWordDisplay();

  // This sets number of geusses to the user and displays to html
  // this.updateTotalGuess();

},

// This function run whenever letter is guess

updateDisplay: function(letter) {
  if (this.geussesLeft === 0) {
    this.restartGame();
  }

  else {

    // Check for and handle incorrect guesses
    this.updateGuesses(letter);
    // Check for and handle correct guesses
    this.updateMatchedLetters(letter);
    // Rebuild the word displayed. Right guessed letters revealed, otherwise "_"
    this.buildWordDisplay();

    // User win, restart game
  if (this.updateWins() === true) {
    this.restartGame();
  }
 }

},

// This function triggers when the user makes incorrect guess
updateGuesses: function(letter) {
  if ((this.guessedLetters.indexOf(letter) === -1) && (this.wordLetters.indexOf(letter) === -1)) {
    this.guessedLetters.push(letter);

    this.guessesLeft--;
  }
  // document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  document.querySelector("#letter-geussed").innerHTML = this.guessedLetters.join(",");
  console.log(this.guessedLetters);
},

// this func sets the initial guesses the user guessedLetters
processUpdateGuesses: function () {
  this.totalGuesses = this.wordLetters.length + 4;
  this.geussesLeft = this.totalGuesses;

  // Render the guesses left to the processUpdateGuesses
},

updateMatchedLetters: function (letter) {
  for (var i = 0; i < this.wordLetters.length; i ++) {

   if ((letter === this.wordLetters[i]) && (this.matchingLetters.indexOf(letter) === -1)) {
     this.matchingLetters.push(letter);
      }
    }
  },


// Render underscores for random word

buildWordDisplay: function() {
  var newWord = "";
  console.log(this.wordLetters);

  for (var i = 0; i < this.wordLetters.length; i++) {

    if (this.matchingLetters.indexOf(this.wordLetters[i]) !== -1) {
        newWord += this.wordLetters[i];
      }
    else {
      console.log("here it goes");

      newWord += "&nbsp;_&nbsp;";
    }
}

  document.querySelector("#random-word").innerHTML= newWord;
},

restartGame: function () {
  this.choosenWord = null;
  this.wordLetters = [],
  this.matchingLetters= [],
  this.guessedLetters= [],
  this.guessesLeft= 0,
  this.totalGuesses= 0,
  this.letterGuessed=null,
  this.setupGame();
  this.buildWordDisplay();

},

updateWins: function () {
  var win;
  if (this.matchingLetters.length === 0) {
    win = false;
  }
  else {
    win = true;
  }

  for (var i = 0; i < this.wordLetters.length; i++) {
    if (this.matchingLetters.indexOf(this.wordLetters[i]) === -1) {
      win = false;
    }
  }

  if (win === true) {
    this.wins = this.wins + 1;

  }
  }
};

hangMan.startGame();

document.onkeyup = function(event) {
  hangMan.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

  hangMan.updateDisplay(hangMan.letterGuessed);
}
