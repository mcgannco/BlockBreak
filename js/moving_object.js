class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color || this.randomColor();
    this.game = options.game;
    this.width = options.width;
    this.height = options.height;
    this.paddleSound = new Audio('./assets/music/paddle.mp3');
    this.brickSound = new Audio('./assets/music/brick.mp3');
  }

  randomColor() {
    const hexDigits = "0123456789ABCDE";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor((Math.random() * 15))];
    }
    return color;
  }

  remove() {
    this.game.remove(this);
  }

  isCollidedWith(otherObj) {
    if(this.pos[1] + this.vel[1] > 450 - this.radius  &&
    (this.pos[0] > otherObj.pos[0] && this.pos[0] < otherObj.pos[0] + otherObj.width)) {
      return true;
    }
  }

  collideWith(otherObj) {

    if (this.pos[1] - this.vel[1] > 455 - this.radius) {
      return;
    } else {
        this.paddleSound.load();
        this.paddleSound.play();
        this.vel[1] *= -1
      }
  }

  hitBrick(brickObj) {
    let x = ((brickObj.pos[0]*(brickObj.width+brickObj.padding)) + brickObj.left);
    let y = ((brickObj.pos[1]*(brickObj.height+brickObj.padding)) + brickObj.top);


    if(brickObj.width > 0 && (this.pos[0] + this.radius > x  && this.pos[0] - this.radius < x + brickObj.width) &&
    (this.pos[1] + this.radius > y && this.pos[1] - this.radius  < y + brickObj.height)) {
      return true;
    }
  }

  breakBrick(brickObj) {
      this.brickSound.load();
      this.brickSound.play();
      this.vel[1] *= -1
      brickObj.hit = 1;
      brickObj.width = 0;
      brickObj.height = 0;
  }


}

export default MovingObject;
