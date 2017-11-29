let hitPosition;
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
      hitPosition = 'Top';
      return true;
    } else if (this.getDistance(ball, blockPointsX[0], blockPointsY[1]) - ball.radius < 0) {
      hitPosition = 'Bottom';
      return true;
    } else if (this.getDistance(ball, blockPointsX[1], blockPointsY[0]) - ball.radius < 0) {
      hitPosition = 'Top';
      return true;
    } else if (this.getDistance(ball, blockPointsX[1], blockPointsY[1]) - ball.radius < 0) {
      hitPosition = 'Bottom';
      return true;
    } else if (this.getMiddleDistance(ball, block) - ball.radius - block.width/2 < 0) {
      hitPosition = 'Middle';
      return true;
    } else {
      return false;
    }
  },
  resolveCollision(ball, block) {
    const blockLeft = block.x;
    const blockRight = block.x + block.width;

    block.number -= 1;
    currentScore += 1;
    View.updateCurrentScore();

    if (hitPosition === 'Bottom') {
      if (ball.dy < 0) {
        ball.dy = -ball.dy;
        ball.y += ball.dy;
      } else {
        ball.dx = -ball.dx;
        ball.x += ball.dx;
      }
    } else if (hitPosition === 'Top') {
      if (ball.dy > 0) {
        ball.dy = -ball.dy;
        ball.y += ball.dy;
      } else {
        ball.dx = -ball.dx;
        ball.x += ball.dx;
      }
    } else if (ball.x - ball.radius < blockLeft || ball.x + ball.radius > blockRight){
      ball.dx = -ball.dx;
      ball.x += ball.dx;
    } else {
      ball.dy = -ball.dy;
      ball.y += ball.dy;
    }
  },
  resolveSecondCollision(ball, block) {
    if (block) {
      block.number -= 1;
      currentScore += 1;
      View.updateCurrentScore();
    }
  },
  checkCollisions() {
    let firstHit = null
    let secondHit = null;
    for (eachBall in balls) {
      for (let i = 0; i < blocks.length; i += 1) {
        if (this.checkDistance(balls[eachBall], blocks[i])) {
          firstHit = blocks[i];
          for (j = i + 1; j < blocks.length; j += 1) {
            if (this.checkDistance(balls[eachBall], blocks[j])) {
              secondHit = blocks[j];
            }
          }
          this.resolveCollision(balls[eachBall], firstHit);
          this.resolveSecondCollision(balls[eachBall], secondHit);
        }
      }
    }
  }
}
