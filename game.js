const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = (() => {
  let launched = false;

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
  return {
    init() {
      setupEventListeners();
    },
  };
})();

game.init();
