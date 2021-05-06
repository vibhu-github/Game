//game constants and variables
let inputDir = {
    x: 0,
    y: 0
}

let foodSound = new Audio('../assets/food.mp3')
let gameOverSound = new Audio('../assets/gameover.mp3')
let moveSound = new Audio('../assets/move.mp3')
let musicSound = new Audio('../assets/music.mp3')
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [

    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let score = 0;


//game functions

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = ctime;
        gameEngine();


    }
    function isCollide(snake) {
        //if you bump into yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true
            }

        }
        //if you bump into the wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true
        }


    }
    function gameEngine() {
        //part1:updating the snake variable-mainly an array

        if (isCollide(snakeArr)) {
            gameOverSound.play();
            musicSound.pause();
            inputDir = { x: 0, y: 0 };
            alert("GameOver,Press any Key to play again")
            snakeArr = [{
                x: 13, y: 15
            }];
            musicSound.play();
            score = 0;
        }

        //if you have eaten the food,increment the score and regenerate the food
        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            foodSound.play()
            score += 1;
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }
            scoreBox.innerHTML = "SCORE: " + score
            let a = 2;
            let b = 16;
            snakeArr.unshift({
                x: snakeArr[0].x + inputDir.x,
                y: snakeArr[0].y + inputDir.y
            })
            food = {
                x: Math.round(a + (b - a) * Math.random()),
                y: Math.round(a + (b - a) * Math.random())
            }
        }

        //moving the snake
        for (let i = snakeArr.length - 2; i >= 0; i--) {

            snakeArr[i + 1] = { ...snakeArr[i] }
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y


        //part2:render or display the snake and food

        //display the snake
        let board = document.getElementById('board')
        board.innerHTML = "";
        snakeArr.forEach((curr, index) => {
            let snakeElement = document.createElement('div')
            snakeElement.style.gridRowStart = curr.y;
            snakeElement.style.gridColumnStart = curr.x;

            if (index == 0) {
                snakeElement.classList.add('head')
            }
            else {
                snakeElement.classList.add('snake')
            }

            board.appendChild(snakeElement);


        })
    }
    //display the food 
    let foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

//main logic

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//start the game
    moveSound.play();
    musicSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});