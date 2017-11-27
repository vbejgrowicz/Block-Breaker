class Block {
  constructor(id, x, y, num) {
    this.id = id;
    this.number = num;
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
    this.border = 3;
    this.color;
  }
  draw() {
    ctxblocks.beginPath();
    ctxblocks.strokeStyle = 'black';
    ctxblocks.lineWidth = this.border;
    ctxblocks.strokeRect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
    ctxblocks.rect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
    this.selectColor();
    ctxblocks.fillStyle = this.color;
    ctxblocks.fill();
    ctxblocks.closePath();
  }
  drawNum() {
    ctxblocks.font = '20px arial';
    ctxblocks.fillStyle = 'white';
    ctxblocks.textAlign = 'center';
    ctxblocks.fillText(this.number, this.x + this.width/2, this.y + 35);
  }
  move() {
    this.y += 60;
    Boundary.checkGameOver(this);
    this.draw();
  }
  selectColor() {
    if (this.number < numOfBalls) {
      if (this.number < numOfBalls/2) {
        this.color = '#7272ff';
      } else {
        this.color = '#4747e8';
      }
    } else {
      if (this.number < (numOfBalls + numOfBalls/2)) {
        this.color = '#3535c6';
      } else {
        this.color = '#1717c1';
      }
    }
  }
}
