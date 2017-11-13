class Ball {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = 'blue';
    this.dy = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move() {
    this.y -= this.dy;
    this.draw();
  }
}
