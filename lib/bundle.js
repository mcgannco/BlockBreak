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
    this.paddleSound = new Audio('./assets/music/paddle.mp3');
    this.brickSound = new Audio('./assets/music/brick.mp3');
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
    if(this.pos[1] + this.vel[1] > 450 - this.radius  &&
    (this.pos[0] > otherObj.pos[0] && this.pos[0] < otherObj.pos[0] + otherObj.width)) {
      return true;
    }
  }

  collideWith(otherObj) {

    if (this.pos[1] - this.vel[1] > 455 - this.radius) {
      return;
    } else {
        this.paddleSound.load();
        this.paddleSound.play();
        this.vel[1] *= -1
      }
  }

  hitBrick(brickObj) {
    let x = ((brickObj.pos[0]*(brickObj.width+brickObj.padding)) + brickObj.left);
    let y = ((brickObj.pos[1]*(brickObj.height+brickObj.padding)) + brickObj.top);


    if(brickObj.width > 0 && (this.pos[0] + this.radius > x  && this.pos[0] - this.radius < x + brickObj.width) &&
    (this.pos[1] + this.radius > y && this.pos[1] - this.radius  < y + brickObj.height)) {
      return true;
    }
  }

  breakBrick(brickObj) {
      this.brickSound.load();
      this.brickSound.play();
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

  const audio = new Audio('./assets/music/song.mp3');
  audio.play();
  const music = document.getElementById('mute');
  music.addEventListener('click', () => {
    audio.muted = !audio.muted;
  });
  audio.addEventListener('ended', () => {
    audio.play();
  });
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
    this.lives = 1;
    this.level = 0;
    this.levelSettings = [];
    this.paused = 0;
    this.reset = 0;
    this.intro = true;
    this.won = false;
    this.lost = false;
    this.newgame = false;
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */]){
        this.ball.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */]) {
        this.paddle.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__brick___default.a) {
        this.bricks.push(object);
    } else if (object instanceof LevelSettings){
        this.levelSettings.push(object);
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
    cornerRadius: 20,
    game: this
  });

    this.add(paddle);
    return paddle;
  }

  addBricks() {
    for (let i = 0; i < Game.GAME_LEVELS[this.level + 1].dim.rows; i++) {
      for (let j = 0; j < Game.GAME_LEVELS[this.level + 1].dim.cols; j++)
      this.add(new __WEBPACK_IMPORTED_MODULE_2__brick___default.a({ game: this, color: Game.GAME_LEVELS[this.level + 1].colors[j], left: Game.GAME_LEVELS[this.level + 1].dim.left, top: Game.GAME_LEVELS[this.level + 1].dim.top, padding: Game.GAME_LEVELS[this.level + 1].dim.padding, width: Game.GAME_LEVELS[this.level + 1].dim.width, height: Game.GAME_LEVELS[this.level + 1].dim.height, pos: [i, j]}));
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
    ctx.fillStyle = this.shadeColor(color, -5);
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

  drawLevel(intro) {
    if(intro) {
      ctx.beginPath();
      ctx.font = ("25px Space Mono");
      ctx.fillStyle = "White";
      ctx.fillText(`Level ${this.level} (Press space to start)`,180,300);
      ctx.closePath();
    }
  }

  shadeColor(color, percent) {
  let col = color.substr(1);
  let num = parseInt(col, 16),
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
    ctx.fillText(`Press "s" to start`,260,450);
    ctx.closePath();
  }

  nextLevel() {
    if (this.allBricksHit() && this.lives > 0) {
      this.bricks = [];
      this.reset = 1;
      this.addBricks();
        this.level += 1;
        this.intro = true;
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

    if(this.level === 0 && this.won) {
      this.drawWinner(ctx);
    } else if (this.lost) {
      this.drawLoser(ctx);
    } else if (this.level === 0) {
      this.drawHomePage(ctx);
    }  else {
      this.nextLevel();
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });
      this.drawLevel(this.intro);

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

  drawWinner(ctx) {
    let wobble = Math.sin(Date.now()/250)*500/50;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.beginPath();
    ctx.font = "bold 30pt Space Mono";
    ctx.fillStyle = "blue";
    ctx.fillText(`You WIN!!!`,32,125);
    ctx.closePath();

    this.drawCube(400, 380 + wobble, 100, 100,100, "#0000FF");

    ctx.beginPath();
    ctx.font = ("25px Space Mono");
    ctx.fillStyle = "White";
    ctx.fillText(`Press "n" for new game`,260,450);
    ctx.closePath();

  }

  drawLoser(ctx) {
    this.bricks.forEach((object) => {
      object.draw(ctx);
    });

    ctx.beginPath();
    ctx.font = ("25px Space Mono");
    ctx.fillStyle = "Red";
    ctx.fillText(`Game Over`,320,250);
    ctx.fillText(`Press "n" to play again`,220,300);
    ctx.closePath();
  }

  winner() {
    let arr = Object.keys(Game.GAME_LEVELS).map(el => parseInt(el));
    return this.allBricksHit() && this.level === arr[arr.length - 1];
  }

  gameWon() {
    if (this.winner()) {
      this.score = 0;
      this.lives = 5;
      this.level = 0;
      this.paused = 0;
      this.reset = 0;
      this.paddle[0].pos = [325, 450];
      this.bricks = [];
      this.ball.vel = [0,0];
      this.addBricks();
      this.won = true;
    }
  }

  gameLost() {
    if(this.lives === 0) {
      this.lost = true;
    }
  }

  resetGame() {
    if (this.newgame) {
      this.score = 0;
      this.lives = 5;
      this.level = 0;
      this.paused = 0;
      this.reset = 0;
      this.paddle[0].pos = [325, 450];
      this.bricks = [];
      this.addBricks();
      this.intro = true;
      this.lost = false;
      this.won = false;
    }
  }

  step(delta){
    this.moveObjects(delta);
    this.checkPaddleBall();
    this.checkBallBricks();
    this.checkScore();
    this.gameWon();
    this.resetGame();
    this.gameLost();
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
  3: {
    colors: {
      0: "red",
      1: "white",
      2: "blue",
      3: "red",
      4: "white",
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
  4: {
    colors: {
      0: "green",
      1: "green",
      2: "green",
      3: "brown",
      4: "brown",
      5: "brown"
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


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Ball extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options) {
    super(options);
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
      this.game.lives -= 1;
      this.game.ball[0].pos = [(this.game.paddle[0].pos[0] + (this.game.paddle[0].width / 2)), 440];
      this.game.ball[0].vel = [0,0];
    }

    if(this.game.reset === 1) {
      this.game.ball[0].vel = [0,0];
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
    super(options);
  }

  draw(ctx) {
    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
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
      if (this.game.ball[0].vel[0] === 0 && this.game.ball[0].vel[1] === 0) {
        this.game.ball[0].pos = [this.pos[0] + (this.width / 2) + offsetX, this.pos[1] - (this.game.ball[0].radius)];

      }
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
};

const POINTS_DEFAULT = {
  0: 500,
  1: 150,
  2: 100,
  3: 75,
  4: 50,
  5: 25
};



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
    return((posx*(this.width+this.padding))+this.left);
  }

  getyCoord(posy) {
    return((posy*(this.height+this.padding))+this.top);
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
     this.paddle.vel[0] = -7;
   } else if (event.keyCode === 68) {
     this.paddle.vel[0] = 7;
   } else if (event.keyCode === 37) {
     this.paddle.vel[0] = -7;
     event.preventDefault();
   } else if (event.keyCode === 39) {
     this.paddle.vel[0] = 7;
     event.preventDefault();
   } else if (this.ball.vel[0] === 0 && this.ball.vel[0] === 0 && event.keyCode === 32) {
     const value = this.paddle.pos[0] < 250 ? -4 : 4;
     const x = value * (this.game.level / 1.3);
     const y = 5 * (this.game.level / 1.3);
     event.preventDefault();
     this.ball.vel = [x,y];
     this.game.reset = 0;
     this.game.intro = false;
   } else if (event.keyCode === 83 && this.game.level === 0) {
     this.game.level = 1;
     this.ball.vel = [0,0];
     this.game.lives = 5;
     this.paddle.pos = [325, 450];
     this.game.newgame = false;
   } else if (event.keyCode === 80) {
     this.paddle.vel[0] = 0;
   } else if (event.keyCode === 78) {
     this.ball.vel =[0,0];
     this.game.newgame = true;
     this.game.lost = false;
   } else if (event.keycode === 32) {
     event.preventDefault();
   }
 }

 keyUpHandler(event){
   if (event.keyCode === 65 || event.keyCode === 68){
     this.paddle.vel[0] = 0;
   } else if(event.keyCode === 37 || event.keyCode === 39){
     this.paddle.vel[0] = 0;
     event.preventDefault();
   } else if (this.ball.vel[0] === 0 && this.ball.vel[0] === 0 && event.keyCode === 32) {
     const value = this.paddle.pos[0] < 250 ? -4 : 4;
     const x = value * (this.game.level / 1.3);
     const y = 5 * (this.game.level / 1.3);
     this.ball.vel = [x,y];
     this.game.reset = 0;
     this.game.intro = false;
     event.preventDefault();
   } else if (event.keyCode === 83 && this.game.level === 0) {
     this.game.level = 1;
     this.ball.vel = [0,0];
     this.game.lives = 5;
     this.paddle.pos = [325, 450];
     this.game.newgame = false;
   } else if (event.keyCode === 80) {
     this.paddle.vel[0] = 0;
   } else if (event.keyCode === 78) {
     this.ball.vel =[0,0];
     this.game.newgame = true;
     this.game.lost = false;
   } else if (event.keycode === 32) {
     event.preventDefault();
   }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map