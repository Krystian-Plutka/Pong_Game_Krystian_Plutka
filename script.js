
let board;
let boardWidth = 800;
let boardHeight = 500;
let context;

 
let PlayerWidth = 10;
let PlayerHeight = 90;
let PlayerVelocityY = 2;


let BallWidth = 20;
let BallHeight = 20;

let Player1 = {
    x : 15,
    y : boardHeight/2.5,
    width : PlayerWidth,
    height : PlayerHeight,
    velocityY : PlayerVelocityY
}

let Player2 = {
    x : boardWidth - PlayerWidth - 15,
    y : boardHeight/2.5,
    width : PlayerWidth,
    height : PlayerHeight,
    velocityY : PlayerVelocityY
}

let Ball = {
    x: boardWidth/2,
    y: boardHeight/2,
    width : BallWidth,
    height : BallHeight,
    velocityX : 2.5,
    velocityY : 2.5
}


let Player1Score = 0;
let Player2Score = 0;
let TextScore = ":Score:";
   window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(Player1.x, Player1.y, Player1.width, Player1.height);

    requestAnimationFrame(animation);
    document.addEventListener("keyup", movePlayer);
}

function animation() {
    requestAnimationFrame(animation);
    context.clearRect(0, 0, board.width, board.height);

    context.fillStyle = "black";
    let nextPlayer1Y = Player1.y + Player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)){
        Player1.y = nextPlayer1Y;

    }
    
    context.fillRect(Player1.x, Player1.y, Player1.width, Player1.height);
    
    let nextPlayer2Y = Player2.y + Player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)){
        Player2.y = nextPlayer2Y;
    }
    
    context.fillRect(Player2.x, Player2.y, Player2.width, Player2.height);
    context.fillStyle = "black";
    Ball.x += Ball.velocityX;
    Ball.y += Ball.velocityY;
    context.fillRect(Ball.x, Ball.y, Ball.width, Ball.height);
    
    if (Ball.y <=0 || (Ball.y + Ball.height >= boardHeight)) {
        Ball.velocityY *= -1;
    }
    
    if (detectCollsion(Ball, Player1)){
        if (Ball.x <= Player1.x + Player1.width) {
            Ball.velocityX *= -1;
        }
    }
    else if (detectCollsion(Ball, Player2)) {
        if (Ball.x + BallWidth >= Player2.x) {
            Ball.velocityX *= -1;
        }
    }

    if (Ball.x < 0) {
    Player2Score++;
    resetGame(1);
}
    else if (Ball.x + BallWidth > boardWidth) {
    Player1Score++;
    resetGame(1);
}

context.font = "50px Apple Chancery, cursive";
context.fillText(Player1Score, boardWidth/5, 45);
context.fillText(Player2Score, boardWidth*4/5 -45, 45);
context.fillText(TextScore, boardWidth/2.6, 45);
}

function outOfBounds(yPosition){
     return (yPosition < 0 || yPosition + PlayerHeight > boardHeight);
}

function movePlayer(e) {
    
    if(e.code == "KeyW") {
        Player1.velocityY = -3;
    }
    else if (e.code ==  "KeyS"){
        Player1.velocityY = 3;
    }

    if(e.code == "ArrowUp") {
        Player2.velocityY = -3;
    }
    else if (e.code ==  "ArrowDown"){
        Player2.velocityY = 3;
    }

}

function detectCollsion(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function resetGame(direction) {
    Ball = {
        x: boardWidth/2,
        y: boardHeight/2,
        width : BallWidth,
        height : BallHeight,
        velocityX : 2.5,
        velocityY : 2.5
    }

}

