const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = (() => {
  let numOfBalls = 1;
  let balls = [];
  let launched = false;

  const createBalls = () => {
    for (i = 0; i < numOfBalls; i+= 1) {
      balls.push(new Ball(0, 250, 690));
    }
  }

  const launch = () => {
    launched = true;
    console.log('launched');
  }

  const rotate = (direction) => {
    console.log(direction);
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
    console.log(timestamp);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (launched === true) {
      balls.forEach((ball) => {
        ball.move();
      });
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
