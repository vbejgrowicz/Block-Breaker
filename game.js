const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = (() => {
  let numOfBalls;
  let balls;
  let blocks;
  let launched;
  let launchAngle;
  let startTime;
  let count;

  const startGame = () => {
    numOfBalls = 0;
    balls = [];
    blocks = [];
    launchAngle = 0;
    initTurn();
  }

  const createBlocks = () => {
    //temp blocks in all x positions  // y positions + 60
    blocks.push(new Block(0, 6.66, 5))
    blocks.push(new Block(0, 68.32, 5))
    blocks.push(new Block(0, 129.98, 5))
    blocks.push(new Block(0, 191.64, 5))
    blocks.push(new Block(0, 253.3, 5))
    blocks.push(new Block(0, 314.96, 5))
    blocks.push(new Block(0, 376.62, 5))
    blocks.push(new Block(0, 438.28, 5))
  }

  const createBalls = (timestamp) => {
    while (count < numOfBalls && timestamp - startTime > 75 && launched === true) {
      let newBall = new Ball(count, 250, 685);
      newBall.calcVelocities(launchAngle);
      balls.push(newBall);
      startTime = timestamp;
      count += 1;
    }
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
    View.moveBlocks(blocks);
    createBlocks();
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
    View.drawBlocks(blocks);
    if (launched) {
      createBalls(timestamp);
      balls.length > 0 ? (balls = View.moveBalls(balls)) : (initTurn());
    } else {
      ctx.save();
      View.drawLauncher(launchAngle);
      ctx.restore();
    }
  }

  return {
    init() {
      setupEventListeners();
      startGame();
      updateCanvas();
    },
  };
})();

game.init();
