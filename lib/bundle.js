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
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(1);
const Ball = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 800;
  canvasEl.height = 500;
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  ball = new Ball({pos: [50,50], vel: [3,3], radius: 10, color: "blue"}, ctx);
  ball.startBall();
  window.ctx = ctx
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Paddle {
  
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Ball {
  constructor(options, ctx) {
    this.options = options;
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.dx = 2;
    this.dy = 2;
    this.ctx = ctx;
    this.drawBall = this.drawBall.bind(this);
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);

  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.closePath();
  }

  draw() {

    this.ctx.clearRect(0, 0, 800, 500);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 800, 500);
    this.drawBall();
    this.move();
  }

  move() {
    debugger
    if(this.pos[0] + this.dx > 800 - this.radius || this.pos[0] + this.dx < this.radius) {
      this.dx *= -1;
    }

    if(this.pos[1] + this.dy > 500 - this.radius || this.pos[1] + this.dy < this.radius) {
      this.dy *= -1;
    }
    this.pos[0] += this.dx;
    this.pos[1] += this.dy;
  }

  startBall() {
    setInterval(this.draw, 10)
  }

}

module.exports = Ball


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map