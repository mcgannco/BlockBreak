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
    this.color = COLOR_DEFAULTS[this.pos[0]];
    this.game = options.game;
    this.width = options.width;
    this.height = options.height;
  }

  draw(ctx) {

  }

  move() {

  }

}

module.exports = Brick
