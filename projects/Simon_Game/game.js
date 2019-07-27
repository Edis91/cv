
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

userClickedPattern = [];

//starting game//
var started = false;
var Level = 0;

$(document).on("keypress", function(){
    if (started === false){
        started= true;
        $("#level-title").text("Level "+ Level);
        nextSequence(Level);

    }
});

//Checking answer to see if player clicked right//

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }

    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver()
    }


}



// Using jQuery to detect a button click //
$(".btn").on("click",function(){
    //Getting the id of the clicked button//
    var userChosenColour = $(this).attr("id");

    //adding the chosen color to the pattern we clicked //
    userClickedPattern.push(userChosenColour);

    //logging the patter to see how it changes after each click //
    console.log(userClickedPattern);

    //playing sound when button is clicked//
    playSound(userChosenColour);

    //Displaying animation of button click //
    animatePress(userChosenColour);

    //Looking if we clicked correctly//
    checkAnswer(userClickedPattern.length-1);
});

//Function for playing sound//
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    // My way to animate //
    /*
    $("#" + currentColour).animate({opacity:0.2}).delay(500).animate({opacity:1.0});
    $("#" + currentColour).delay(500).removeClass("pressed");
    */

    //other way to animate by adding and removing class//
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function nextSequence() {
    //resetting the clicked patter for next round//
    userClickedPattern =[];

    //increasing the level//
    Level +=1;
    $("#level-title").text("Level "+ Level);

    // Choosing random number 0, 1, 2, 3
    var randomNumber = Math.floor(Math.random()*4);

    // Choosing color with random number function
    var randomChosenColour = buttonColors[randomNumber];

    // Adding the random chosen color to the pattern
    gamePattern.push(randomChosenColour);

    // animating the next chosen color
    $("#"+randomChosenColour).animate({opacity:0.1}).delay(300).animate({opacity:1.0});

    //playing sound for the button clicked//
    playSound(randomChosenColour);

}

function startOver(){
    Level = 0;
    gamePattern =[];
    started= false;
}
