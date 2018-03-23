const COLOR_DEFAULTS = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red",
  4: "purple",
  5: "blue"
}



class Brick {
  constructor(options) {
    this.pos = options.pos;
    this.color = COLOR_DEFAULTS[this.pos[1]];
    this.game = options.game;
    this.width = options.width;
    this.height = options.height;
    this.left = options.left;
    this.top = options.top;
    this.padding = options.padding;
    this.getxCoord = this.getxCoord.bind(this);
    this.getyCoord = this.getyCoord.bind(this);
  }

  getxCoord(posx) {
    return((posx*(this.width+this.padding))+this.left)
  }

  getyCoord(posy) {
    return((posy*(this.height+this.padding))+this.top)
  }


  draw(ctx) {

    ctx.beginPath();
    ctx.rect(this.getxCoord(this.pos[0]), this.getyCoord(this.pos[1]), this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

  }


  move() {

  }

}

module.exports = Brick
