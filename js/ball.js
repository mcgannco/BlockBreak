import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options) {
    super(options);
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
    if(this.pos[1] + this.vel[1] < this.radius) {
        this.vel[1] *= -1;
    }

    if(this.pos[1] + this.vel[1] > 500 - this.radius) {
      this.vel[1] *= -1;
      this.game.lives -= 1;
      const audio = new Audio('./assets/music/die.mp3');
      audio.load();
      audio.play();
      this.game.ball[0].pos = [(this.game.paddle[0].pos[0] + (this.game.paddle[0].width / 2)), 440];
      this.game.ball[0].vel = [0,0];
    }

    if(this.game.reset === 1) {
      this.game.ball[0].vel = [0,0];
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

  }
}

export default Ball;
