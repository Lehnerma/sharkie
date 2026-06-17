class Background extends DrawableObjects {
    y = 0
  constructor(path, width, height, x) {
    super();
    this.loadImage(path);
    this.x = x;
    this.width = width;
    this.height = height;
  }
}
