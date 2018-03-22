const Paddle = require("./paddle");


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 800;
  canvasEl.height = 500;


  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  window.ctx = ctx

});
