const BallDirection = {
  draw() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, -25);
    ctx.lineTo(20, 0);
    ctx.lineTo(-15, 0);
    ctx.fillStyle = 'red';
    ctx.fill();
  },
  rotate(angle) {
    ctx.translate(240,675);
    ctx.rotate(angle * Math.PI/180);
    this.draw();
    ctx.translate(-240,-675);
  }
}
