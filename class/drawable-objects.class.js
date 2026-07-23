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
  worldEndX = 3600;
  worldBeginX = -700;
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

  /**
   * draws this object's current image at its current position.
   * @param {CanvasRenderingContext2D} ctx - canvas context to draw on
   */
  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * loads a single image and sets it as the object's current image.
   * @param {string} path - path of the image to load
   */
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

  /**
   * draws the collision box outline for debugging; only for the object
   * types that actually use collisionOffset (sharkie, jelly fish, puffer
   * fish, endboss).
   * @param {CanvasRenderingContext2D} ctx - canvas context to draw on
   */
  drawBorderCollision(ctx) {
    if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.collisionOffset.right, this.y + this.collisionOffset.top, this.width - this.collisionOffset.left - this.collisionOffset.right, this.height - this.collisionOffset.top - this.collisionOffset.bottom);
      ctx.stroke();
    }
  }

  /**
   * @returns {number} random y coordinate within the playable vertical range
   */
  getRandomY() {
    return 10 + Math.random() * 340;
  }

  /**
   * @param {number} [start=-600] - lower bound of the range
   * @param {number} [end=3600] - upper bound of the range
   * @returns {number} random x coordinate within the given range
   */
  getRandomX(start = -600, end = 3600) {
    return start + Math.random() * (end - start);
  }

  /**
   * places this object at a random position within the level.
   */
  getRandomCoordinate() {
    this.y = this.getRandomY();
    this.x = this.getRandomX();
  }
}
