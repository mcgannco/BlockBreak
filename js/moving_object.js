class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color || this.randomColor();
    this.game = options.game;
    this.width = options.width;
    this.height = options.height;
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

    if(this.pos[1] + this.vel[1] > 450 - this.radius &&
    (this.pos[0] > otherObj.pos[0] && this.pos[0] < otherObj.pos[0] + otherObj.width)) {
      return true;
    }
  }

  collideWith(otherObj) {
    this.vel[1] *= -1
  }


}

export default MovingObject;
