const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ctxblocks = document.getElementById('blocks').getContext('2d');

let balls;
let blocks;
let launched;
let numOfBalls;
let launchAngle;
let startTime;
let count;

const game = (() => {
  const startGame = () => {
    numOfBalls = 0;
    balls = [];
    blocks = [];
    launchAngle = 0;
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
  }

  const setupEventListeners = () => {
    document.addEventListener("keydown", key => {
      if (key.keyCode === 32 && launched === false) {
        launch();
      }
      if (key.keyCode === 37) {
        rotate('Left');
      }
      if (key.keyCode === 39) {
        rotate('Right');
      }
    });
  }

  const updateCanvas = (timestamp) => {
    requestAnimationFrame(updateCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (launched) {
      Objects.createBalls(timestamp);
      balls.length > 0 ? (balls = View.moveBalls(balls)) : (initTurn());
    } else {
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
