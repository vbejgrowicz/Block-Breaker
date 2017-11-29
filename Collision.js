let hitPosition = null;
const Collision = {
  getDistance(ball, blockX, blockY){
    let xDistance = Math.abs(blockX - ball.x);
    let yDistance = Math.abs(blockY - ball.y);
    return  Math.hypot(xDistance, yDistance);
  },
  getMiddleDistance(ball, block){
    let xMidDistance = Math.abs((block.x + block.width/2) - ball.x);
    let yMidDistance = Math.abs((block.y + block.width/2) - ball.y);
    return Math.hypot(xMidDistance, yMidDistance);
  },
  checkDistance(ball, block) {
    const blockPointsX = [block.x, block.x + block.width];
    const blockPointsY = [block.y, block.y + block.height];
    //check all corners for collisions as well as middle
    if (this.getDistance(ball, blockPointsX[0], blockPointsY[0]) - ball.radius < 0) {
      hitPosition = 'Left';
      return true;
    } else if (this.getDistance(ball, blockPointsX[0], blockPointsY[1]) - ball.radius < 0) {
      hitPosition = 'Left';
      return true;
    } else if (this.getDistance(ball, blockPointsX[1], blockPointsY[0]) - ball.radius < 0) {
      hitPosition = 'Right';
      return true;
    } else if (this.getDistance(ball, blockPointsX[1], blockPointsY[1]) - ball.radius < 0) {
      hitPosition = 'Right';
      return true;
    } else if (this.getMiddleDistance(ball, block) - ball.radius - block.width/2 < 0) {
      hitPosition = 'Middle';
      return true;
    } else {
      hitPosition = null;
      return false;
    }
  },
  resolveCollision(ball, block) {
    const blockLeft = block.x;
    const blockRight = block.x + block.width;
    const blockTop = block.y;
    const blockBottom = block.y + block.height;

    block.number -= 1;
    currentScore += 1;
    View.updateCurrentScore();

    if (ball.y + ball.radius > blockBottom || ball.y + ball.radius < blockTop) {
      if (ball.x + ball.radius < blockLeft || ball.x + ball.radius > blockRight) {
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
      } else {
        ball.dy = -ball.dy;
      }
    } else {
      ball.dx = -ball.dx;
    }
  },
  resolveSecondCollision(ball, block) {
    block.number -= 1;
    currentScore += 1;
    View.updateCurrentScore();
  },
  checkCollision(ball, block, collided) {
    if (this.checkDistance(ball, block)) {
      if (!collided) {
        currentCollisions.push(new CollidedObjects(ball, block));
        this.resolveCollision(ball, block);
      } else {
        this.resolveSecondCollision(ball, block);
      }
    }
  }
}
