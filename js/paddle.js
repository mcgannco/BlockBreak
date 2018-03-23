import MovingObject from './moving_object';

class Paddle extends MovingObject {
  constructor(options) {
    super(options)
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(timeDelta){
    const velScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let offsetX = this.vel[0] * velScale;
    if(this.pos[0] + this.vel[0] >= 800 - this.width || this.pos[0] + this.vel[0] < 0) {
      this.vel[0] = 0;
    } else {
      this.pos = [this.pos[0] + offsetX, this.pos[1]];
      if (this.game.ball[0].vel === [0,0]) {
        this.game.ball[0].pos = [this.pos[0] + offsetX, this.pos[1]];
      }
    }
  }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
export default Paddle;
