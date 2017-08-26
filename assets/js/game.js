// Scroll to div to start game
$("#text").click(function () {
  $('html,body').animate({
    scrollTop: $(".div-2").offset().top},'slow');
  });

// CREATE A ARRAY OF WORDS FOR COMPUTER TO CHOOSE FROM
const words = ["david", "flower", "hat", "death", "book", "fire", "shotgun", "wikipedia"]
// Choose word randomly
const randomWord = words[Math.floor(Math.random()*words.length)];
// check in
console.log(randomWord);

// Create a for loop and create spaces for the random word
for (i=0; i < randomWord.length; i ++) {
  const newDiv = document.createElement("div");
  const newText = document.createTextNode("___" + " ");
  newDiv.className = "spaces";
  newDiv.appendChild(newText);
  const element = document.getElementById('random-word');
  element.appendChild(newDiv);
}

function myFunction(event) {
    var x = event.key;
    document.getElementById("letter-geussed").innerHTML = x;
}
