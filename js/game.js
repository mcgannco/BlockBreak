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
        this.levelSettings.push(object)
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

  drawHomePage(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.beginPath();
    ctx.font = "bold 30pt Space Mono";;
    ctx.fillStyle = "blue";
    ctx.fillText(`Get Ready To Break Some Blocks`,32,125);
    ctx.closePath();

    ctx.beginPath();
    ctx.font = ("25px Space Mono");
    ctx.fillStyle = "White";
    ctx.fillText(`Press "s" to Start`,280,400);
    ctx.closePath();
  }

  nextLevel() {
    if (this.allBricksHit() && this.lives > 0) {
      this.bricks = [];
      this.reset = 1;
      this.addBricks();
        this.level += 1
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
        this.score += bricks[i].points
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
}


export default Game;
