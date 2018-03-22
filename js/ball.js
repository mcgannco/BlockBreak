import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options) {
    super(options)
  }

  draw(ctx) {
    
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {

    if(this.pos[0] + this.dx > 800 - this.radius || this.pos[0] + this.dx < this.radius) {
      this.dx *= -1;
    }

    if(this.pos[1] + this.dy > 500 - this.radius || this.pos[1] + this.dy < this.radius) {
      this.dy *= -1;
    }
    this.pos[0] += this.dx;
    this.pos[1] += this.dy;
  }

}

export default Ball;
