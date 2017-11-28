let hitPosition = null;
const Collision = {
  getDistance(ball, blockX, blockY){
    let xDistance = blockX - ball.x;
    let yDistance = blockY - ball.y;
    return  Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));;
  },
  getMiddleDistance(ball, block){
    let xMidDistance = block.x + block.width/2 + block.border - ball.x;
    let yMidDistance = block.y + block.width/2 + block.border - ball.y;
    return Math.sqrt(Math.pow(xMidDistance, 2) + Math.pow(yMidDistance, 2));
  },
  checkDistance(ball, block) {
    const blockPointsX = [block.x - block.border, block.x + block.width + block.border];
    const blockPointsY = [block.y - block.border, block.y + block.height + block.border];
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
    const blockLeft = block.x - block.border;
    const blockRight = block.x + block.width + block.border;
    const blockTop = block.y - block.border;
    const blockBottom = block.y + block.height + block.border;

    block.number -= 1;
    currentScore += 1;
    View.updateCurrentScore();

    if (hitPosition === 'Middle') {
      if (ball.x < blockLeft) {
        ball.dx = -ball.dx;
      } else if (ball.x > blockRight) {
        ball.dx = -ball.dx;
      } else {
        ball.dy = -ball.dy;
      }
    } else {
      ball.dx = -ball.dx;
      ball.dy = -ball.dy;
    }
  },
  resolveSecondCollision(ball, block) {
    block.number -= 1;
    currentScore += 1;
    View.updateCurrentScore();
  },
  checkCollision(ball, block, collided) {
    if (this.checkDistance(ball, block)) {
      currentCollisions.push(new CollidedObjects(ball, block));
      if (collided) {
        this.resolveSecondCollision(ball, block);
      } else {
        this.resolveCollision(ball, block);
      }
    }
  }
}
