class Endscreen extends DrawableObjects {
  GAME_OVER = ["assets/images/6.Botones/Tittles/GameOver/gameover.png"];
  GAME_WIN = ["assets/images/6.Botones/Tittles/game_win/win.png"];

  /** centers the (initially imageless) end screen on the canvas. */
  constructor() {
    super();
    this.loadImages(this.GAME_OVER);
    this.loadImages(this.GAME_WIN);
    this.height = 150;
    this.width = 450;
    this.x = (this.canvasWidth - this.width) / 2;
    this.y = (this.canvasHeight - this.height) / 2;
  }

  /**
   * picks which end screen image to show.
   * @param {boolean} win - true shows the win screen, false the game over screen
   */
  setResult(win) {
    if (win) {
      this.img = this.imgCache[this.GAME_WIN[0]];
    } else {
      this.img = this.imgCache[this.GAME_OVER[0]];
    }
  }
}
