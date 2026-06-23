class MoveableObjects extends DrawableObjects {
  speedX = 0.15;
  speedY = 0.15;
  lastMove;
  otherDirection = false;
  levelBoundary = { top: 0, bottom: 0, right: 0, left: 0 };

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

  //colliding and damage
  /**
   *  Checks the collision points for the character and a Moveableobject - these could be a Chicken or a other class.
   * x + width > mo.x = checks the upper right collision corner -> checks the right side of the character.
   * y + height > mo.y = checks the bottom right collion corner -> checks the right side of the character.
   * x < mo.x + mo.width = checks the upper left collion corner -> checks the left side of the character
   * y < mo.y +mo.height = checks the bottom left collion corner ->checks the left side of the character
   * @param {MoveableObject} *Class mo
   * @returns Bool for damage controll
   */
  isColliding(mo) {
    const horizontalCollision = this.x + this.width > mo.x && this.x < mo.x + mo.width;
    const verticalCollision = this.y + this.height > mo.y && this.y < mo.y + mo.height;
    return horizontalCollision && verticalCollision;
  }

  isColliding(mo) {
    return this.x + this.collisionOffset.left < mo.x + mo.width - mo.collisionOffset.right && this.x + this.width - this.collisionOffset.right > mo.x + mo.collisionOffset.left && this.y + this.collisionOffset.top < mo.y + mo.height - mo.collisionOffset.bottom && this.y + this.height - this.collisionOffset.bottom > mo.y + mo.collisionOffset.top;
  }
}
