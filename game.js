const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ctxblocks = document.getElementById('blocks').getContext('2d');
const colorPicker = document.querySelector('input');

let balls;
let blocks;
let launched;
let numOfBalls;
let launchAngle;
let startTime;
let count;
let currentScore;
let ballColor;
let gameOver;

const game = (() => {
  const startGame = () => {
    ballColor = colorPicker.value;
    gameOver = false;
    numOfBalls = 0;
    balls = [];
    blocks = [];
    launchAngle = 0;
    currentScore = 0;
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
  }

  const settings = () => {
    document.querySelector('.settings-modal').classList.toggle('display-modal');
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

    document.getElementById('newgame-btn').addEventListener('click', () => {
      startGame();
      settings();
    });

    colorPicker.addEventListener('change', () => {
      ballColor = colorPicker.value;
    });
  }

  const updateCanvas = (timestamp) => {
    requestAnimationFrame(updateCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      startGame();
      updateBlocks();
      updateCanvas();
    },
  };
})();

game.init();
