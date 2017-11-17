const Collision = {
  getDistance(ball, block){
    let xDistance = (block.x + (block.width/2)) - ball.x + ball.radius;
    let yDistance = (block.y + (block.height/2)) - ball.y + ball.radius;
    let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distance;
  },
  resolveCollision(ball, block) {
    const blockLeft = block.x;
    const blockRight = block.x + block.width;
    const blockTop = block.y;
    const blockBottom = block.y + block.height;

    block.number -= 1;

    if (ball.x < blockLeft) {
      ball.dx = -ball.dx;
      ball.dy = -ball.dy;
    } else if (ball.x > blockRight) {
      ball.dx = -ball.dx
      ball.dy = -ball.dy;
    } else {
      ball.dy = -ball.dy;
    }
  },
  checkCollision(ball, block) {
    if ((this.getDistance(ball, block) - ball.radius - (block.width/2)) < 0) {
      this.resolveCollision(ball, block);
    }
  }
}
