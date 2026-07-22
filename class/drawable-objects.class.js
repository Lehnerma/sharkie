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
  canvasWidth = 720;
  canvasHeight = 460;
  //* endpoint for the world.
  worldEndX = 3600;
  //* begin point for the world
  worldBeginX = -700;

  //* ids of every interval this object started, so they can all be cleared on restart
  intervalIds = [];

  /**
   * starts an interval and remembers its id, so a later stopIntervals() can
   * clear it. every game object must use this instead of the raw setInterval,
   * otherwise its loop keeps running after a restart and piles up.
   * @param {Function} fn - callback to run on every tick
   * @param {number} ms - interval delay in milliseconds
   * @returns {number} the interval id
   */
  setStoppableInterval(fn, ms) {
    const id = setInterval(fn, ms);
    this.intervalIds.push(id);
    return id;
  }

  /**
   * stops every interval this object started and forgets their ids.
   */
  stopIntervals() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];
  }

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
    if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Endboss) {
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
    return start + Math.random() * (end - start);
  }

  getRandomCoordinate() {
    this.y = this.getRandomY();
    this.x = this.getRandomX();
  }
}
