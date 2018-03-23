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
    if(this.pos[0] + this.vel[0] > 800 - this.radius || this.pos[0] + this.vel[0] < this.radius) {
      this.vel[0] *= -1;
    }
    if(this.pos[1] + this.vel[1] > 500 - this.radius || this.pos[1] + this.vel[1] < this.radius) {
        this.vel[1] *= -1;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }


}

export default Ball;
