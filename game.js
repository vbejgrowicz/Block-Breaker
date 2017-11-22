const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ctxblocks = document.getElementById('blocks').getContext('2d');
const colorPicker = document.querySelector('input');
const ball = document.querySelector('.fa-circle');
const newGameBtn = document.querySelectorAll('.newgame-btn');
const localStorageObject = JSON.parse(localStorage.getItem('gameStatus'));

colorPicker.value = localStorage.ballColor || colorPicker.value;
ball.style.color = colorPicker.value;

let balls;
let blocks;
let launched;
let numOfBalls;
let launchAngle;
let startTime;
let count;
let currentScore;
let gameOver;
let currentCollisions;
let ballColor = colorPicker.value;

const game = (() => {
  const initGameValues = () => {
    localStorage.removeItem("gameStatus");
    balls = [];
    blocks = [];
    currentCollisions = [];
    gameOver = false;
    launched = false;
    launchAngle = 0;
    numOfBalls = 0;
    startTime = 0;
    currentScore = 0;
  }

  const loadGame = () => {
    initGameValues();
    Objects.loadBlocks(localStorageObject['blocks']);
    numOfBalls = localStorageObject['numOfBalls'];
    currentScore = localStorageObject['currentScore'];
    View.updateInfo();
  }
  const startGame = () => {
    initGameValues();
    View.updateCurrentScore();
    initTurn();
  }

  const launch = () => {
    launched = true;
    count = 0;
  }

  const rotate = (direction) => {
    if (launched === false) {
      if (direction === 'Left' && launchAngle > -85) {
        launchAngle -= 5;
      } else if (direction === 'Right' && launchAngle < 85) {
        launchAngle += 5;
      }
    }
  }

  const initTurn = () => {
    launched = false;
    count = 0;
    startTime = 0;
    numOfBalls += 1;
    View.moveBlocks();
    Objects.createBlocks();
    View.updateBallCount();
    if (gameOver) {
      View.gameOver();
    };
  }

  const settings = () => {
    document.querySelector('.settings').classList.toggle('display-modal');
  }

  const setupEventListeners = () => {
    document.addEventListener("keydown", key => {
      if (key.keyCode === 32 && !launched && !gameOver) {
        launch();
      }
      if (key.keyCode === 37) {
        rotate('Left');
      }
      if (key.keyCode === 39) {
        rotate('Right');
      }
    });
    document.querySelector('.settings-btn').addEventListener('click', settings);
    document.getElementById('close-btn').addEventListener('click', settings);
    document.getElementById('continue-btn').addEventListener('click', settings);

    for (let i = 0; i < newGameBtn.length; i += 1) {
      newGameBtn[i].addEventListener('click', () => {
        startGame();
        document.querySelector('.settings').classList.remove('display-modal');
        document.querySelector('.game-over').classList.remove('display-modal');
      });
    }

    colorPicker.addEventListener('change', () => {
      ballColor = colorPicker.value;
      ball.style.color = colorPicker.value;
      localStorage.setItem("ballColor", ballColor);
    });

    window.addEventListener('unload', () => {
      const gameObject = {
          numOfBalls,
          blocks,
          currentScore,
        };
      if (!gameOver && currentScore > 0) {
        localStorage.setItem("gameStatus", JSON.stringify(gameObject));
      }
    });
  }

  const updateCanvas = (timestamp) => {
    requestAnimationFrame(updateCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentCollisions = currentCollisions.filter(collided => (collided.isCollided()));
    if (launched) {
      Objects.createBalls(timestamp);
      balls.length > 0 ? (balls = View.moveBalls(balls)) : (initTurn());
    } else if (!gameOver) {
      ctx.save();
      View.drawLauncher();
      ctx.restore();
    }
  }

  const updateBlocks = () => {
    requestAnimationFrame(updateBlocks);
    ctxblocks.clearRect(0, 0, canvas.width, canvas.height);
    View.drawBlocks();
  }

  return {
    init() {
      setupEventListeners();
      if (localStorage.hasOwnProperty('gameStatus')) {
        loadGame();
      } else {
        startGame();
      }
      updateBlocks();
      updateCanvas();
    },
  };
})();

game.init();
