const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = (() => {
  let numOfBalls;
  let balls;
  let launched;
  let launchAngle;
  let startTime;
  let count;

  const startGame = () => {
    numOfBalls = 1;
    balls = [];
    launched = false;
    launchAngle = 0;
    startTime = 0;
    count = 0;
  }

  const createBalls = (timestamp) => {
    if (launched === false && count === 0) {
      let stationaryBall = new Ball(0, 250, 685)
      balls.push(stationaryBall);
      count += 1;
    }
    while (count < numOfBalls && timestamp - startTime > 75 && launched === true) {
      let newBall = new Ball(0, 250, 685)
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
      if (direction === 'Left') {
        launchAngle -= 5;
        balls[0].calcVelocities(launchAngle);
      } else if (direction === 'Right') {
        launchAngle += 5;
        balls[0].calcVelocities(launchAngle);
      }
    }
  }

  const initTurn = () => {
    launched = false;
    count = 0;
    startTime = 0;
    numOfBalls += 1;
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
    ctx.save();
    BallDirection.changeAngle(launchAngle);
    ctx.restore();
    createBalls(timestamp);
    balls = balls.filter(ball => !Boundary.checkOut(ball));
    if (launched === true) {
      if (balls.length > 0) {
        balls.forEach((ball) => {
          ball.move();
        });
      } else {
        initTurn();
      }
    } else {
      balls[0].draw();
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
