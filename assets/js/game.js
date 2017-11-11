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

// "METHODS"

startGame: function() {
  // Choose random word
  var objKeys = Object.keys(this.words);
  this.choosenWord = objKeys[Math.floor(Math.random() * objKeys.length)];
  console.log(this.words);
  console.log(this.choosenWord);
  // split the words
  this.wordLetters = this.choosenWord.split("");
  // start and display underscores
  this.buildWordDisplay();


  // This sets number of geusses to the user and displays to html
  this.updateTotalGuess();

},

// This function runs whenever letter is guess

updateDisplay: function(letter) {
  if (this.guessesLeft === 0) {

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
    alert("you win!");
    this.restartGame();
  }
 }

},

// This function triggers when the user makes incorrect guess
updateGuesses: function(letter) {
  if ((this.guessedLetters.indexOf(letter) === -1) && (this.wordLetters.indexOf(letter) === -1)) {
    this.guessedLetters.push(letter);

    this.guessesLeft--;
  // document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  document.querySelector("#span-geusses").innerHTML = this.guessesLeft;
  document.querySelector("#letter-geussed").innerHTML = this.guessedLetters.join(",");
  console.log(this.guessedLetters);
  console.log(this.guessesLeft);
  }
},

// this func sets the initial guesses the user guessedLetters
updateTotalGuess: function () {
  this.totalGuesses = this.wordLetters.length + 5;
  this.guessesLeft = this.totalGuesses;

  // Render the guesses left to the processUpdateGuesses
  document.querySelector("#span-geusses").innerHTML = this.guessesLeft;
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

  // check if the value is still accessible
  // console.log(this.wordLetters);

  for (var i = 0; i < this.wordLetters.length; i++) {

    if (this.matchingLetters.indexOf(this.wordLetters[i]) !== -1) {
        newWord += this.wordLetters[i];
      }
    else {
    // create underscores
      newWord += "&nbsp;_&nbsp;";
    }
}

  document.querySelector("#random-word").innerHTML= newWord;
},

restartGame: function () {
  // clear all values and re-initial state
  document.querySelector("#span-geusses").innerHTML = "";
  document.querySelector("#letter-geussed").innerHTML = "";
  this.choosenWord = null;
  this.wordLetters = [],
  this.matchingLetters= [],
  this.guessedLetters= [],
  this.guessesLeft= 0,
  this.totalGuesses= 0,
  this.letterGuessed=null,
  this.startGame();
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

      // update the wins on html

      document.querySelector("#span-wins").innerHTML = this.wins;
      console.log(this.guessesLeft);

      return true;
    }

    else {
      return false;
    }
  }

};
// initialize game
hangMan.startGame();

// on every key press
document.onkeyup = function(event) {
  hangMan.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

  hangMan.updateDisplay(hangMan.letterGuessed);
}
