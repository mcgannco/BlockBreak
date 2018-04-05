import MovingObject from './moving_object';

class Paddle extends MovingObject {
  constructor(options) {
    super(options);
  }

  draw(ctx) {
    // var rectX = 50;
    // var rectY = 50;
    // var rectWidth = 100;
    // var rectHeight = 100;
    // var cornerRadius = 20;
    //
    // ctx.lineJoin = "round";
    // ctx.lineWidth = cornerRadius;
    //
    // ctx.strokeRect(this.pos[0]+(cornerRadius/2), this.pos[1]+(cornerRadius/2), this.width-cornerRadius, this.height-cornerRadius);
    // ctx.fillRect(this.pos[0]+(cornerRadius/2), this.pos[1]+(cornerRadius/2), this.width-cornerRadius, this.-cornerRadius);


    ctx.beginPath();
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
