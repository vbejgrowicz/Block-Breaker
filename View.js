const currentScoreDisplay = document.querySelectorAll('.current-score');
const numOfBallsDisplay = document.getElementById('ball-count');
const highScoreDisplay = document.getElementById('high-score');

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
    const launchball = new Ball(0, canvas.width/2, canvas.height - 15);
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
  updateHighScore() {
    highScoreDisplay.textContent = highScore;

  },
  gameOver() {
    if (currentScore > highScore) {
      localStorage.setItem('BlockBreakerHighScore', currentScore);
      highScore = currentScore;
      this.updateHighScore()
      document.querySelector('.results').style.color = '#00FF00';
      document.querySelector('.results').textContent = 'New High Score!';

    } else {
      document.querySelector('.results').style.color = '#FF0000';
      document.querySelector('.results').textContent = 'Try Again!';
    }
    document.querySelector('.game-over').classList.toggle('display-modal');
    document.getElementById('blocks').classList.toggle('game-is-over');
  }
}
