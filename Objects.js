const blockXPositions = [6.66, 68.32, 129.98, 191.64, 253.3, 314.96, 376.62, 438.28];

const Objects = {
  createUniqRandomNumArr() {
    const numOf = 8;
    const arr = [];
    for (let i = 0; i < numOf; i += 1) {
      arr.push(Math.floor(Math.random() * 8));
    }
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  },
  createBlocks() {
    const uniqArr = this.createUniqRandomNumArr();
    for (let i = 0; i < uniqArr.length; i += 1) {
      let newBlock = new Block(0, blockXPositions[uniqArr[i]], 5);
      blocks.push(newBlock);
    }
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