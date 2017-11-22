const blockXPositions = [6.66, 68.32, 129.98, 191.64, 253.3, 314.96, 376.62, 438.28];
let numOfBlocks = 0;

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
      const value = Math.round(Math.random() * numOfBalls);
      let newBlock = new Block('block' + numOfBlocks, blockXPositions[uniqArr[i]], 5, value);
      blocks.push(newBlock);
      numOfBlocks += 1;
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
