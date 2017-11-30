class Block {
  constructor(id, x, y, num) {
    this.id = id;
    this.number = num;
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
  }
  draw() {
    ctxblocks.beginPath();
    ctxblocks.rect(this.x, this.y, this.width, this.height);
    ctxblocks.fillStyle = this.selectColor();
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
      return '#EE0000';
    } else if (percentage < 0.15) {
      return '#EE0019';
    } else if (percentage < 0.2) {
      return '#EF0032';
    } else if (percentage < 0.25) {
      return '#F0004C';
    } else if (percentage < 0.3) {
      return '#F10065';
    } else if (percentage < 0.35) {
      return '#F2007F';
    } else if (percentage < 0.4) {
      return '#F30099';
    } else if (percentage < 0.45) {
      return '#F400B3';
    } else if (percentage < 0.5) {
      return '#F500CE';
    } else if (percentage < 0.55) {
      return '#F600E9';
    } else if (percentage < 0.6) {
      return '#E900F6';
    } else if (percentage < 0.65) {
      return '#D000F7';
    } else if (percentage < 0.7) {
      return '#B700F8';
    } else if (percentage < 0.75) {
      return '#9D00F9';
    } else if (percentage < 0.8) {
      return '#8300FA';
    } else if (percentage < 0.85) {
      return '#6900FB';
    } else if (percentage < 0.9) {
      return '#4F00FC';
    } else if (percentage < 0.95) {
      return '#3500FD';
    } else {
      return '#0000FF';
    }
  }
}
