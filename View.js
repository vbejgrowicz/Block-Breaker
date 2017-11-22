const currentScoreDisplay = document.querySelectorAll('.current-score');
const numOfBallsDisplay = document.getElementById('ball-count');

const View = {
  drawBlocks() {
    blocks = blocks.filter(block => block.number > 0);
    blocks.forEach(block => block.draw());
    blocks.forEach(block => block.drawNum());
  },
  moveBlocks() {
    blocks.forEach(block => block.move());
  },
  moveBalls() {
    balls = balls.filter(ball => !Boundary.checkOut(ball));
    balls.forEach(ball => {
      ball.move();
    });
    return balls;
  },
  drawLauncher() {
    const launchball = new Ball(0, 250, 685);
    launchball.draw();
    BallDirection.changeAngle(launchAngle);
  },
  updateCurrentScore() {
    for (let i = 0; i < currentScoreDisplay.length; i += 1) {
      currentScoreDisplay[i].textContent = currentScore;
    }
  },
  updateBallCount() {
    numOfBallsDisplay.textContent = numOfBalls;
  },
  updateInfo() {
    this.updateBallCount();
    this.updateCurrentScore();
  },
  gameOver() {
    document.querySelector('.game-over').classList.toggle('display-modal');
  }
}
