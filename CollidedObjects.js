class CollidedObjects {
  constructor(ball, block) {
    this.ball = ball;
    this.block = block;
  }
  isCollided() {
    if (Collision.checkDistance(this.ball, this.block)) {
      return true;
    }
    else {
      return false;
    }
  }
  getIds() {
    return [this.ball.id, this.block.id];
  }
}
