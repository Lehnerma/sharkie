class Background extends DrawableObjects {
    y = 0

  /**
   * @param {string} imgPath - path to the background layer image
   * @param {number} x - horizontal position of this layer segment
   */
  constructor(imgPath, x) {
    super();
    this.loadImage(imgPath);
    this.x = x;
    this.width = 720;
    this.height = 460;
  }
}
