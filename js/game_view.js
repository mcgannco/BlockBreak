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

export default GameView;
