class Background extends DrawableObjects {
    y = 0

  constructor(imgPath, x) {
    super();
    this.loadImage(imgPath);
    this.x = x;
    this.width = 720;
    this.height = 460;
  }
}
