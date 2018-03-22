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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(5);



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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(8);


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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(8);


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
    if(this.pos[1] + this.vel[1] > 500 - this.radius || this.pos[1] + this.vel[1] < this.radius) {
      this.vel[1] *= -1;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paddle__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brick__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__brick__);




class Game {
  constructor() {
    this.bricks = [];
    this.ball = [];
    this.paddle = [];
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
    pos: [50,50],
    vel: [3,3],
    radius: 10,
    color: "blue",
    game: this
  });

    this.add(ball);
    return ball;
  }

  addPaddle() {
  const ball = new __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */]({
    height: 20,
    width: 150,
    pos: [325, 450],
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

  step(delta){
    this.moveObjects(delta);
  }


}

Game.DIM_X = 800;
Game.DIM_Y = 500;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.ball = this.game.addBall();
    this.paddle = this.game.addPaddle();
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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Brick {
  constructor() {

  }

}

module.exports = Brick


/***/ }),
/* 7 */,
/* 8 */
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


}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map