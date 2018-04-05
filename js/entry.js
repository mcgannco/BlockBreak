import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
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
