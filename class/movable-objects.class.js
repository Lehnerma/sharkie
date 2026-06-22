class MoveableObjects extends DrawableObjects {
  speedX = 0.15;
  speedY = 0.15;
  lastMove;
  otherDirection = false;
  constructor() {
    super();
  }

  animate(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  playAnimation(images, frames = 100) {
    setInterval(() => {
      this.animate(images);
    }, frames);
  }

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveUp() {
    this.y -= this.speedY;
  }
  moveDown() {
    this.y += this.speedY;
  }

  movements = {
    RIGHT: () => {
      this.moveRight();
      this.setTimestamp();
    },
    LEFT: () => {
      this.moveLeft();
      this.setTimestamp();
    },
    UP: () => {
      (this.moveUp(), this.setTimestamp());
    },
    DOWN: () => {
      (this.moveDown(), this.setTimestamp());
    },
  };

  timePassed(time) {
    let timePassed = new Date().getTime() - this.lastMove;
    timePassed = timePassed / 1000;
    return timePassed > time;
  }

  setTimestamp() {
    this.lastMove = new Date().getTime();
  }
}
