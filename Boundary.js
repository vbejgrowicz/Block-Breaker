const Boundary = {
  checkX(ball) {
    return (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0);
  },
  checkY(ball) {
    return (ball.y - ball.radius <= 0);
  },
  checkOut(ball) {
     return ball.y - ball.radius >= canvas.height;
  },
  checkBoundary(ball) {
    if (this.checkX(ball)) {
      ball.dx = -ball.dx
    }
    if (this.checkY(ball)) {
      ball.dy = -ball.dy
    }
  },
  checkGameOver(block) {
    if (block.y > (canvas.height - block.height)) {
      gameOver = true;
    }
  }
}
