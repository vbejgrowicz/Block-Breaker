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
    const percentage = this.number / (numOfBalls * 2);
    if (percentage < 0.1) {
      this.color = '#E50010';
    } else if (percentage < 0.2) {
      this.color = '#E70042';
    } else if (percentage < 0.3) {
      this.color = '#EA0075';
    } else if (percentage < 0.4) {
      this.color = '#ED00AA';
    } else if (percentage < 0.5) {
      this.color = '#F000DF';
    } else if (percentage < 0.6) {
      this.color = '#D000F3';
    } else if (percentage < 0.7) {
      this.color = '#9E00F6';
    } else if (percentage < 0.8) {
      this.color = '#6A00F9';
    } else if (percentage < 0.9) {
      this.color = '#3500FC';
    } else {
      this.color = '#0000FF';
    }
  }
}
