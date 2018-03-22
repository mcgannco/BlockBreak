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
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
  }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
export default Paddle;
