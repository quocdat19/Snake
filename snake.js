var config = {
    size: 100,
    option: 1,
    speed: 1
}

var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");

var snake = {
    headX: 0, headY: 0,
    moveX: 1, moveY: 0,
    body: [],
    length: 1
}

var food = {
    x: randomLocation(),
    y: randomLocation()
}

var run = null;
var die = null;

$("#new").click(function () {
    config.size = $('#size').val();
    config.option = $('#op').val();
    config.speed = $('#speed').val();
    reset();
    clearInterval(run);
    clearInterval(die);
    run = setInterval(() => {
        gameRun();
    }, (500 / config.speed));
});

function randomLocation() {
    return Math.floor(Math.random() * 20);
}

function drawFood() {
    context.fillStyle = "#FF0000";
    context.fillRect(food.x * 25, food.y * 25, 24, 24);
}

function drawSnake() {
    snake.body.forEach(e => {
        context.fillStyle = "black";
        context.fillRect(e.x * 25, e.y * 25, 24, 24);
    });
}

$("*").keydown(function (e) {
    if ((e.keyCode == "37" || e.keyCode == "97") && snake.moveX != 1) {//left
        snake.moveX = -1;
        snake.moveY = 0;
    } else if ((e.keyCode == "38" || e.keyCode == "119") && snake.moveY != 1) {//down
        snake.moveX = 0;
        snake.moveY = -1;
    } else if ((e.keyCode == "39" || e.keyCode == "100") && snake.moveX != -1) {//right
        snake.moveX = 1;
        snake.moveY = 0;
    } else if ((e.keyCode == "40" || e.keyCode == "115") && snake.moveY != -1) {//up
        snake.moveX = 0;
        snake.moveY = 1;
    }
});

function gameRun() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.headX += snake.moveX;
    snake.headY += snake.moveY;
    if (snake.headX >= 20) snake.headX -= 20
    else if (snake.headX < 0) snake.headX += 20
    if (snake.headY >= 20) snake.headY -= 20
    else if (snake.headY < 0) snake.headY += 20
    snake.body.push({ x: snake.headX, y: snake.headY });
    snake.body.splice(0, snake.body.length - snake.length);
    drawFood();
    drawSnake();
    eatFood();
    snakeDie();
}

function eatFood() {
    if (snake.headX == food.x && snake.headY == food.y) {
        snake.length += 1;
        food.x = randomLocation();
        food.y = randomLocation();
    }
}

function snakeDie() {
    for (let i = 0; i < snake.body.length - 1; i++) {
        const e = snake.body[i];
        if (e.x == snake.headX && e.y == snake.headY) {
            clearInterval(run);
            die = setInterval(() => {
                setTimeout(() => {
                    context.fillStyle = "red";
                    context.fillRect(e.x * 25, e.y * 25, 24, 24);
                }, 100);
                setTimeout(() => {
                    context.fillStyle = "black";
                    context.fillRect(e.x * 25, e.y * 25, 24, 24);
                }, 150);
            }, 150);
        }
    }
}

function reset() {
    snake = {
        headX: 0, headY: 0,
        moveX: 1, moveY: 0,
        body: [],
        length: 1
    }
    food = {
        x: randomLocation(),
        y: randomLocation()
    }
}