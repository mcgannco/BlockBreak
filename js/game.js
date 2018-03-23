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
  }

  add(object) {
    if (object instanceof Ball){
        this.ball.push(object);
    } else if (object instanceof Paddle) {
        this.paddle.push(object);
    } else if (object instanceof Brick) {
        this.bricks.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addBall() {
  const ball = new Ball({
    pos: [400,440],
    vel: [5,5],
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
    for (let i = 0; i < Game.NUM_ROWS; i++) {
      for (let j = 0; j < Game.NUM_COLS; j++)
      this.add(new Brick({ game: this, left: 32.5, top: 20, padding: 15, width: 110, height: 15, color: "green", pos: [i, j]}));
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

  draw(ctx) {
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

  step(delta){
    this.moveObjects(delta);
    this.checkPaddleBall();
    this.checkBallBricks();
    this.checkScore();
  }


}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.NUM_ROWS = 6;
Game.NUM_COLS = 6;


export default Game;
