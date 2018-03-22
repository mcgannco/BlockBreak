class Ball {
  constructor(options, ctx) {
    this.options = options;
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.dx = 2;
    this.dy = 2;
    this.ctx = ctx;
    this.drawBall = this.drawBall.bind(this);
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);

  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.closePath();
  }

  draw() {

    this.ctx.clearRect(0, 0, 800, 500);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 800, 500);
    this.drawBall();
    this.move();
  }

  move() {
    debugger
    if(this.pos[0] + this.dx > 800 - this.radius || this.pos[0] + this.dx < this.radius) {
      this.dx *= -1;
    }

    if(this.pos[1] + this.dy > 500 - this.radius || this.pos[1] + this.dy < this.radius) {
      this.dy *= -1;
    }
    this.pos[0] += this.dx;
    this.pos[1] += this.dy;
  }

  startBall() {
    setInterval(this.draw, 10)
  }

}

module.exports = Ball
