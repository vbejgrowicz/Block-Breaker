const BallDirection = {
  draw() {
    ctx.beginPath();
    ctx.moveTo(-7.5, -12);
    ctx.lineTo(0, -25);
    ctx.lineTo(7.5, -12);
    ctx.lineTo(-7.5, -12);
    ctx.fillStyle = '#E50010';
    ctx.fill();
  },
  changeAngle(angle) {
    ctx.translate(250,685);
    ctx.rotate(angle * Math.PI/180);
    this.draw();
    ctx.translate(-250,-685);
  }
}
