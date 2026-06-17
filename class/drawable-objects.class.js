class DrawableObjects{
    x;
    y;
    height;
    width;
    img;
    imgCache = {};
    currentImage = 0;

  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


}