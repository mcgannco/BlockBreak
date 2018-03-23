import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';

class Game {
  constructor() {
    this.bricks = [];
    this.ball = [];
    this.paddle = [];
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
    pos: [50,50],
    vel: [3,3],
    radius: 10,
    color: "red",
    game: this
  });

    this.add(ball);
    return ball;
  }

  addPaddle() {
  const ball = new Paddle({
    height: 20,
    width: 150,
    pos: [0, 450],
    color: "blue",
    vel: [0,0],
    game: this
  });

    this.add(ball);
    return ball;
  }

  allObjects() {
    return [].concat(this.bricks, this.ball, this.paddle);
  }

  ballPaddle() {
    return [].concat(this.ball, this.paddle);
  }

  ballBrick() {
    return [].concat(this.ball, this.brick);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
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

  step(delta){
    this.moveObjects(delta);
    this.checkPaddleBall()
  }


}

Game.DIM_X = 800;
Game.DIM_Y = 500;

export default Game;
