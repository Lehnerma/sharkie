class DrawableObjects {
  x;
  y;
  height;
  width;
  img;
  imgCache = {};
  currentImage = 0;
  collisionOffset = { top: 0, bottom: 0, right: 0, left: 0 };
  levelBoundary = { top: 0, bottom: 0, right: 0, left: 0 };

  coinCounter = 0;
  bottleCounter = 0;

  //* endpoint for the world.
  worldEndX = 3600;
  //* begin point for the world
  worldBeginX = -700;

  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['imgs/img1','imgs/img2','imgs/img3',..]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  drawBorderCollision(ctx) {
    if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.collisionOffset.right, this.y + this.collisionOffset.top, this.width - this.collisionOffset.left - this.collisionOffset.right, this.height - this.collisionOffset.top - this.collisionOffset.bottom);
      ctx.stroke();
    }
  }

  getRandomY() {
    return 10 + Math.random() * 340;
  }

  getRandomX(start = -600, end = 3600) {
    return start + Math.random() * end;
  }

  getRandomCoordinate() {
    this.y = this.getRandomY();
    this.x = this.getRandomX();
  }
}
