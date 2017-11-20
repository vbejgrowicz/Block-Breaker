class Block {
  constructor(id, x, y) {
    this.id = id;
    this.number = Math.floor(Math.random() * numOfBalls + numOfBalls/2);
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
    this.border = 3;
    this.color = 'red';
  }
  draw() {
    ctxblocks.beginPath();
    ctxblocks.strokeStyle = 'black';
    ctxblocks.lineWidth = this.border;
    ctxblocks.strokeRect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
    ctxblocks.rect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
    ctxblocks.fillStyle = this.color;
    ctxblocks.fill();
    ctxblocks.closePath();
  }
  drawNum() {
    ctxblocks.font = '20px arial';
    ctxblocks.fillStyle = 'white';
    ctxblocks.fillText(this.number, this.x + 20 , this.y + 35);
  }
  move() {
    this.y += 60;
    Boundary.checkGameOver(this);
    this.draw();
  }
}
