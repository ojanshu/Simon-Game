
var buttonColors= ["red","blue","green","yellow"];
var gamePattern= [];
var userClickedPattern= [];

var level= 0;
var Toggle= false;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

// nextSequence();

function nextSequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber= Math.floor(Math.random() * 4);
    var randomChosenColour= buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(userChosenColour);
    
}

$(".btn").click(function() {

    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
  
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function checkAnswer(currentLevel) {
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");

        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }  