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
   } else if (this.ball.vel[0] === 0 && this.ball.vel[0] === 0 && event.keyCode === 32) {
     this.ball.vel = [5,5];
   }
 }

 keyUpHandler(event){
   if (event.keyCode === 65 || event.keyCode === 68){
     this.paddle.vel[0] = 0;
   } else if(event.keyCode === 37 || event.keyCode === 39){
     this.paddle.vel[0] = 0;
   } else if (this.ball.vel[0] === 0 && this.ball.vel[0] === 0 && event.keyCode === 32) {
     this.ball.vel = [5,5];
   }
  }
}

export default GameView;
