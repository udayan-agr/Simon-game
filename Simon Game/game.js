var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var start = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(current) {
  if (gamePattern[current] === userPattern[current]) {
    console.log("success");
    if (gamePattern.length === userPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
    new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    start = false;
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over. Press any key to Restart!");
    startOver();
  }

}

function nextSequence() {
  userPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomNum = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNum];
  gamePattern.push(chosenColor);
  $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenColor);
  console.log(randomNum);
}

$(".btn").click(function(event) {
  var userColor = event.target.id; // or userColor = $(this).attr("id");
  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userPattern.length - 1);
});

$(document).keydown(function() {
  if (!start) {
    level = 1;
    nextSequence();
    start = true;
  }
});

function startOver()
{
  level = 0;
  start = false;
  gamePattern = [];
}
