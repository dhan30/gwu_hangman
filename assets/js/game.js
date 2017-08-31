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
  newDiv.setAttribute("value", "holymoly");
  newDiv.setAttribute('type','hidden');
  const element = document.getElementById('random-word');
  element.appendChild(newDiv);
  const c = newDiv.value;

  document.getElementById('gogo').innerHTML = c;
}
// When letter is geussed show in span id area

function myFunction(event) {
  var x = event.key;
  var y =event.keyCode;
  console.log(y);

  if (y == 32 ) {
    alert("wrong letter");
  } else {
    document.getElementById("letter-geussed").innerHTML = x;
    event.preventDefault();
    }

  }
