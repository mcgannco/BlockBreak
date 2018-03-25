import MovingObject from './moving_object';

class Paddle extends MovingObject {
  constructor(options) {
    super(options);
  }

  draw(ctx) {
    // let rectX = this.pos[0];
    // let rectY = this.pos[1];
    // let rectWidth = this.width;
    // let rectHeight = this.height;
    // let cornerRadius = 20;
    ctx.beginPath();
    // ctx.lineJoin = "round";
    // ctx.lineWidth = cornerRadius;
    // ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    // ctx.strokeStyle= this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
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
      if (this.game.ball[0].vel[0] === 0 && this.game.ball[0].vel[1] === 0) {
        this.game.ball[0].pos = [this.pos[0] + (this.width / 2) + offsetX, this.pos[1] - (this.game.ball[0].radius)];

      }
    }
  }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
export default Paddle;
