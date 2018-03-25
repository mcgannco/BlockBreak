const COLOR_DEFAULTS = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red",
  4: "purple",
  5: "blue"
}

const POINTS_DEFAULT = {
  0: 500,
  1: 150,
  2: 100,
  3: 75,
  4: 50,
  5: 25
}



class Brick {
  constructor(options) {
    this.pos = options.pos;
    this.color = options.color;
    this.game = options.game;
    this.width = options.width;
    this.height = options.height;
    this.left = options.left;
    this.top = options.top;
    this.padding = options.padding;
    this.getxCoord = this.getxCoord.bind(this);
    this.getyCoord = this.getyCoord.bind(this);
    this.hit = 0;
    this.points = POINTS_DEFAULT[this.pos[1]];
    this.counted = 0;
  }

  getxCoord(posx) {
    return((posx*(this.width+this.padding))+this.left)
  }

  getyCoord(posy) {
    return((posy*(this.height+this.padding))+this.top)
  }


  draw(ctx) {
    if (this.hit === 0) {
      ctx.beginPath();
      ctx.rect(this.getxCoord(this.pos[0]), this.getyCoord(this.pos[1]), this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }


  move() {

  }

}

module.exports = Brick
