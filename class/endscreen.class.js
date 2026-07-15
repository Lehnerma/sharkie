class Endscreen extends DrawableObjects {
  GAME_OVER = ["assets/images/6.Botones/Tittles/GameOver/gameover.png"];
  GAME_WIN = ["assets/images/6.Botones/Tittles/game_win/full_win.png"];

  constructor() {
    super();
    this.loadImages(this.GAME_OVER);
    this.loadImages(this.GAME_WIN);
    this.x = 0;
    this.y = 0;
    this.height = 400;
    this.width = 400;
  }

  setResult(win) {
    if (win) {
      this.img = this.imgCache[this.GAME_WIN[0]];
    } else {
      this.img = this.imgCache[this.GAME_OVER[0]];
    }
  }
}
