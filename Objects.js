const Objects = {
  createBlocks() {
    //temp blocks in all x positions
    blocks.push(new Block(0, 6.66, 5))
    blocks.push(new Block(0, 68.32, 5))
    blocks.push(new Block(0, 129.98, 5))
    blocks.push(new Block(0, 191.64, 5))
    blocks.push(new Block(0, 253.3, 5))
    blocks.push(new Block(0, 314.96, 5))
    blocks.push(new Block(0, 376.62, 5))
    blocks.push(new Block(0, 438.28, 5))
  },
  createBalls(timestamp) {
    while (count < numOfBalls && timestamp - startTime > 75) {
      let newBall = new Ball(count, 250, 685);
      newBall.calcVelocities(launchAngle);
      balls.push(newBall);
      startTime = timestamp;
      count += 1;
    }
  }
}
