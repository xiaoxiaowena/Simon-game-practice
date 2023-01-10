const buttonColours = ["red", "blue", "green", "yellow"];

// computer and user color input
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;
// Game Start (press any key), only detect one keypress
$(document).keypress(function () {
  if(!gameOn){
    $("h1").text("Level "+level);
    nextSequence();
    gameOn = true;
  }
})
// random num from 0 to 3
// generate random colors and add to gamePattern
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level.toString());
  // animation
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  // play sound
  playSound(randomChosenColour);
  // increase level when nextSequence is called
  console.log("gamePattern: " + gamePattern);
}

// User button click detection and button color name

$(".btn").on("click",function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  console.log("userClickedPattern: " + userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var latestColorIndex = userClickedPattern.length-1;
  console.log("index: " + latestColorIndex);
  checkAnswer(latestColorIndex);
})

// check answer function
// latest color user choose (index) compare to the same index from gamePattern
function checkAnswer(latestColor) {
  if (gamePattern[latestColor] === userClickedPattern[latestColor]) {
    if (gamePattern.length === userClickedPattern.length) {

      console.log("user "+ userClickedPattern);

      setTimeout(function () {
        nextSequence();
    }, 1000);
  }
}else {
  // Game over
  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200)
  startOver();
}
}
// Restart the game
function startOver() {
  gamePattern = [];
  level = 0;
  gameOn = false;
}
// sound play function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// button clicked animation function for user click
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  // set timeout to remove the gray animation
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  },100)
}
