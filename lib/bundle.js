/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

  hitBrick(brickObj) {
    let x = ((brickObj.pos[0]*(brickObj.width+brickObj.padding)) + brickObj.left);
    let y = ((brickObj.pos[1]*(brickObj.height+brickObj.padding)) + brickObj.top);

    if((this.pos[0] > x && this.pos[0]  < x + brickObj.width) &&
    (this.pos[1] - this.radius > y && this.pos[1] - this.radius  < y + brickObj.height)) {
      return true;
    }
  }

  breakBrick(brickObj) {
    this.vel[1] *= -1
    brickObj.hit = 1;
    brickObj.width = 0;
    brickObj.height = 0;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(6);



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;
  let ctx = canvasEl.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();
  window.ctx = ctx
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paddle__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brick__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__brick__);




class Game {
  constructor() {
    this.bricks = [];
    this.ball = [];
    this.paddle = [];
    this.score = 0;
    this.lives = 5;
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]){
        this.ball.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */]) {
        this.paddle.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__brick___default.a) {
        this.bricks.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addBall() {
  const ball = new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]({
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
  const paddle = new __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */]({
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
      this.add(new __WEBPACK_IMPORTED_MODULE_2__brick___default.a({ game: this, left: 32.5, top: 20, padding: 15, width: 110, height: 15, color: "green", pos: [i, j]}));
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


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Ball extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options) {
    super(options)
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    if(this.pos[0] + this.vel[0] > 800 - this.radius || this.pos[0] + this.vel[0] < this.radius) {
      this.vel[0] *= -1;
    }
    if(this.pos[1] + this.vel[1] < this.radius) {
        this.vel[1] *= -1;
    }

    if(this.pos[1] + this.vel[1] > 500 - this.radius) {
      this.vel[1] *= -1;
      this.game.lives -= 1
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

  }


}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Paddle extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options) {
    super(options)
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = this.color;
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
    }
  }

}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
/* harmony default export */ __webpack_exports__["a"] = (Paddle);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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
    this.color = COLOR_DEFAULTS[this.pos[1]];
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


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.ball = this.game.addBall();
    this.paddle = this.game.addPaddle();
    this.bricks = this.game.addBricks();
  }

  start() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }



  keyDownHandler(event){
   if (event.keyCode === 65) {
     this.paddle.vel[0] -= 7;
   } else if (event.keyCode === 68) {
     this.paddle.vel[0] += 7;
   } else if (event.keyCode === 37) {
     this.paddle.vel[0] -= 7;
   } else if (event.keyCode === 39) {
     this.paddle.vel[0] += 7;
   }
 }

 keyUpHandler(event){
   if (event.keyCode === 65 || event.keyCode === 68){
     this.paddle.vel[0] = 0;
   } else if(event.keyCode === 37 || event.keyCode === 39){
     this.paddle.vel[0] = 0;
   }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map