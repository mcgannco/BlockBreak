const Paddle = require("./paddle");
const Ball = require("./ball");

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
