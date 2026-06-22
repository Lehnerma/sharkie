class MoveableObjects extends DrawableObjects {
  speedX = 0.15;
  speedY = 0.15;
  lastMove;
  otherDirection = false;
  levelBoundaryLeft;
  levelBoundaryRight;
  levelBoundaryUp;
  levelBoundaryDown;

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
    if (this.x < this.levelBoundaryRight) {
      this.x += this.speedX;
    }
  }

  moveLeft() {
    if (this.x > this.levelBoundaryLeft) {
      this.x -= this.speedX;
    }
  }

  moveUp() {
    if (this.y > this.levelBoundaryUp) {
      this.y -= this.speedX;
    }
  }
  moveDown() {
    if (this.y < this.levelBoundaryDown) {
      this.y += this.speedY;
    }
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
      this.moveUp();
      this.setTimestamp();
    },
    DOWN: () => {
      this.moveDown();
      this.setTimestamp();
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
