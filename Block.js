class Block {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
    this.border = 3;
    this.color = 'red';
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = this.border;
    ctx.strokeRect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
    ctx.rect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
