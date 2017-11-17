const Collision = {
  getDistance(ball, block){
    debugger;
    let xDistance = ball.x - (block.x + block.width/2);
    let yDistance = ball.y - (block.y + block.height/2);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  },
  resolveCollision(ball, block) {
    ball.dy = -ball.dy;
    block.number -= 1;
  },
  checkCollision(ball, block) {
    if ((this.getDistance(ball, block) - ball.radius - (block.width/2)) < 0) {
      this.resolveCollision(ball, block);
    }
  }
}
