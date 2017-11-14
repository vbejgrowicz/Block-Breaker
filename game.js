const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = (() => {
  let numOfBalls = 1;
  let balls = [];
  let launched = false;
  let launchAngle = 0;

  const createBalls = () => {
    for (i = 0; i < numOfBalls; i+= 1) {
      balls.push(new Ball(0, 250, 685));
    }
  }

  const launch = () => {
    launched = true;
    balls.forEach(ball => {
      ball.calcVelocities(launchAngle);
    });
  }

  const rotate = (direction) => {
    if (launched === false) {
      if (direction === 'Left') {
        launchAngle -= 1;
      } else if (direction === 'Right') {
        launchAngle += 1;
      }
    }
  }

  const setupEventListeners = () => {
    document.addEventListener("keydown", key => {
      if (key.keyCode === 32) {
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
    // console.log(timestamp);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    balls[0].draw();
    BallDirection.changeAngle(launchAngle);
    ctx.restore();
    if (launched === true) {
    }
  }

  return {
    init() {
      setupEventListeners();
      createBalls();
      updateCanvas();
    },
  };
})();

game.init();
