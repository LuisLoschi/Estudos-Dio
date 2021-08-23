let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let board = 32;
let snake = []; 
snake[0] = {
    x: 8 * board,
    y: 8 * board
}

let snakeDirection = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * board,
    y: Math.floor(Math.random() * 15 + 1) * board
}

let score = 0;

function createBoardGame() {
    context.fillStyle = "#8FBC8F";
    context.fillRect(0, 0, 16 * board, 16 * board);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "#006400";
        context.fillRect(snake[i].x, snake[i].y, board, board);
    }
}

//Cria comida 
function Food() {
    context.fillStyle = "#FF4500";
    context.fillRect(food.x, food.y, board, board);
}

//movimento ao clicar da direção
document.addEventListener('keydown', update);
function update(e) {
    if (e.keyCode == 37 && snakeDirection != 'right') snakeDirection = 'left';
    if (e.keyCode == 38 && snakeDirection != 'down') snakeDirection = 'up';
    if (e.keyCode == 39 && snakeDirection != 'left') snakeDirection = 'right';
    if (e.keyCode == 40 && snakeDirection != 'up') snakeDirection = 'down';
}

//faz o loop nas bordas
function checkloop() {
    if(snake[0].x > 15 * board && snakeDirection == "right") snake[0].x = 0;
    if(snake[0].x < 0 && snakeDirection == "left") snake[0].x = 16 * board;
    if(snake[0].y > 15 * board && snakeDirection == "down") snake[0].y = 0;
    if(snake[0].y < 0 && snakeDirection == "up") snake[0].y = 16 * board;
}

//Verifica se a cobra chocou nela mesma
function gameOver() {
    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game over! 😢');
            location.reload()
        }
    }
}


function startGame() {
    
    checkloop();
    
    gameOver()

    createBoardGame();
    createSnake();
    Food();

    //cobra andar
    let snakePositionX = snake[0].x;
    let snakePositionY = snake[0].y;

    if(snakeDirection == "right") snakePositionX += board;
    if(snakeDirection == "left") snakePositionX -= board;
    if(snakeDirection == "up") snakePositionY -= board;
    if(snakeDirection == "down") snakePositionY += board;
    
    //comer comida e mudar para outro lugar aleatorio
    if(snakePositionX != food.x || snakePositionY != food.y) {
        snake.pop();       
    }else {
        food.x = Math.floor(Math.random() * 15 + 1) * board;
        food.y = Math.floor(Math.random() * 15 + 1) * board;

        score ++;
    }

    //faz a cobrinha aumentar de tamanho
    let newHead = {
        x: snakePositionX,
        y: snakePositionY
    }

    snake.unshift(newHead);

    context.fillStyle = "white";
    context.font = "40px arial";
    context.fillText(score, 0.5 * board, 1.5 * board);
}

let jogo = setInterval(startGame, 100);
