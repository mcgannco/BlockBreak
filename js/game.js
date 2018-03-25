import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';

class Game {
  constructor() {
    this.bricks = [];
    this.ball = [];
    this.paddle = [];
    this.score = 0;
    this.lives = 5;
    this.level = 0;
    this.levelSettings = [];
    this.paused = 0;
    this.reset = 0;
  }

  add(object) {
    if (object instanceof Ball){
        this.ball.push(object);
    } else if (object instanceof Paddle) {
        this.paddle.push(object);
    } else if (object instanceof Brick) {
        this.bricks.push(object);
    } else if (object instanceof LevelSettings){
        this.levelSettings.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addBall() {
  const ball = new Ball({
    pos: [400,440],
    vel: [0,0],
    radius: 10,
    color: "#DC143C",
    game: this
  });

    this.add(ball);
    return ball;
  }

  addPaddle() {
  const paddle = new Paddle({
    height: 20,
    width: 150,
    pos: [325, 450],
    color: "#4169E1",
    vel: [0,0],
    cornerRadius: 20,
    game: this
  });

    this.add(paddle);
    return paddle;
  }

  addBricks() {
    for (let i = 0; i < Game.GAME_LEVELS[this.level + 1].dim.rows; i++) {
      for (let j = 0; j < Game.GAME_LEVELS[this.level + 1].dim.cols; j++)
      this.add(new Brick({ game: this, color: Game.GAME_LEVELS[this.level + 1].colors[j], left: Game.GAME_LEVELS[this.level + 1].dim.left, top: Game.GAME_LEVELS[this.level + 1].dim.top, padding: Game.GAME_LEVELS[this.level + 1].dim.padding, width: Game.GAME_LEVELS[this.level + 1].dim.width, height: Game.GAME_LEVELS[this.level + 1].dim.height, pos: [i, j]}));
    }
  }

  allObjects() {
    return [].concat(this.bricks, this.ball, this.paddle);
  }

  ballPaddle() {
    return [].concat(this.ball, this.paddle);
  }

  ballBricks() {
    return [].concat(this.ball, this.bricks);
  }


  drawCube(x, y, wx, wy, h, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - wx, y - wx * 0.5);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = this.shadeColor(color, -40);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + wy, y - wy * 0.5);
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = this.shadeColor(color, 10);
    ctx.strokeStyle = this.shadeColor("#000000", 50);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.closePath();
    ctx.fillStyle = this.shadeColor(color, 20);
    ctx.strokeStyle = this.shadeColor("black", 60);
    ctx.stroke();
    ctx.fill();
  }

  shadeColor(color, percent) {
  color = color.substr(1);
  var num = parseInt(color, 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

  drawHomePage(ctx) {
    let wobble = Math.sin(Date.now()/250)*500/50;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.beginPath();
    ctx.font = "bold 30pt Space Mono";
    ctx.fillStyle = "blue";
    ctx.fillText(`Get Ready To Break Some Blocks`,32,125);
    ctx.closePath();

    this.drawCube(400, 380 + wobble, 100, 100,100, "#0000FF");

    ctx.beginPath();
    ctx.font = ("25px Space Mono");
    ctx.fillStyle = "White";
    ctx.fillText(`Press "s" to Start`,260,450);
    ctx.closePath();
  }

  nextLevel() {
    if (this.allBricksHit() && this.lives > 0) {
      this.bricks = [];
      this.reset = 1;
      this.addBricks();
        this.level += 1;
    }
  }

  allBricksHit() {
    for (let i = 0; i < this.bricks.length; i++) {
      if(this.bricks[i].hit === 0) {
        return false;
      }
    }
    return true;
  }

  draw(ctx) {
    if (this.level === 0) {
      this.drawHomePage(ctx);
    } else {
      this.nextLevel();
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });

      ctx.beginPath();
      ctx.font = ("15px Space Mono");
      ctx.fillStyle = "White";
      ctx.fillText(`Score: ${this.score}`,32.5,490);
      ctx.closePath();

      ctx.beginPath();
      ctx.font = ("15px Space Mono");
      ctx.fillStyle = "White";
      ctx.fillText(`Lives: ${this.lives}`,700,490);
      ctx.closePath();

      ctx.beginPath();
      ctx.font = ("15px Space Mono");
      ctx.fillStyle = "White";
      ctx.fillText(`Level: ${this.level}`,600,490);
      ctx.closePath();
    }
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  checkPaddleBall() {
    const allObjects = this.ballPaddle();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (obj1 !== obj2 && obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  checkBallBricks() {
    const allObjects = this.ballBricks();
    const ball = allObjects[0];
    for (let i = 1; i < allObjects.length; i++) {
      const brickobj = allObjects[i];
      if (ball.hitBrick(brickobj)) {
        const collision = ball.breakBrick(brickobj);
        if (collision) return;
      }
    }
  }

  checkScore() {
    const bricks = this.bricks;
    for( let i = 0; i < bricks.length; i++) {
      if (bricks[i].hit === 1 && bricks[i].counted === 0) {
        this.score += bricks[i].points;
        bricks[i].counted = 1;
      }
    }
  }

  resetGame() {
    if (this.lives === 0) {
      this.score = 0;
      this.lives = 5;
      this.level = 0;
      this.paused = 0;
      this.reset = 0;
      this.paddle[0].pos = [325, 450];
      this.bricks = [];
      this.addBricks();
    }
  }

  gameWon() {
    let arr = Object.keys(Game.GAME_LEVELS).map(el => parseInt(el));
    if (this.allBricksHit() && this.level === arr[arr.length - 1]) {
      this.score = 0;
      this.lives = 5;
      this.level = 0;
      this.paused = 0;
      this.reset = 0;
      this.paddle[0].pos = [325, 450];
      this.bricks = [];
      this.addBricks();
    }
  }

  step(delta){
    this.moveObjects(delta);
    this.checkPaddleBall();
    this.checkBallBricks();
    this.checkScore();
    this.resetGame();
    this.gameWon();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.NUM_ROWS = 6;
Game.NUM_COLS = 6;


Game.GAME_LEVELS = {
  0: {
    colors: {
    },
    dim: {
      rows: 0,
      cols: 0,
      left: 0,
      top: 0,
      padding: 0,
      width: 0,
      height: 0
    }
  },
  1: {
    colors: {
      0: "green",
      1: "yellow",
      2: "orange",
      3: "red",
      4: "purple",
      5: "blue"
    },
    dim: {
      rows: 6,
      cols: 6,
      left: 32.5,
      top: 20,
      padding: 15,
      width: 110,
      height: 15
    }
  },
  2: {
    colors: {
      0: "blue",
      1: "blue",
      2: "blue",
      3: "blue",
      4: "blue",
      5: "blue"
    },
    dim: {
      rows: 6,
      cols: 6,
      left: 32.5,
      top: 20,
      padding: 15,
      width: 110,
      height: 15
    }
  },
};


export default Game;
