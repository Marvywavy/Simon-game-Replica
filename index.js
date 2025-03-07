let gameStarted = false;
let gamePattern = [];
let userPattern = [];
let level = 0;
let buttonColors = ["green", "red", "yellow", "blue"];

$(document).keydown(function(){
    if(!gameStarted){
        level = 0;
        $("h1").text("Level " + level);
        gameStarted = true;
        gamePattern = [];
        userPattern = [];
        nextSequence();
    }
});

$(".btn").click(function(){
    if(gameStarted){
        let userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userPattern.length - 1);
    }
});

function nextSequence(){
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    animatePress(randomColor);
    playSound(randomColor);
}

function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(() => { nextSequence(); }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        startOver();
    }
}

function startOver(){
    gameStarted = false;
    level = 0;
    gamePattern = [];
}

function playSound(color){
    var audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(() => { $("#" + color).removeClass("pressed"); }, 300);
}


$(".desc").click(function(){
    $(".div-desc").slideToggle();

})

$(".ok-btn").click(function(){
    $(".div-desc").slideToggle();
})

$(document).ready(function(){
    $(".div-desc").hide();
});
