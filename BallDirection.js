const BallDirection = {
  draw() {
    ctx.beginPath();
    ctx.moveTo(-7.5, -12);
    ctx.lineTo(0, -25);
    ctx.lineTo(7.5, -12);
    ctx.lineTo(-7.5, -12);
    ctx.fillStyle = '#F10065';
    ctx.fill();
  },
  changeAngle(angle) {
    ctx.translate(canvas.width / 2, canvas.height - 15);
    ctx.rotate(angle * Math.PI/180);
    this.draw();
    ctx.translate(-(canvas.width / 2), -(canvas.height - 15));
  }
}
