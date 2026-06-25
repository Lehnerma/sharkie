class MoveableObjects extends DrawableObjects {
  speedX = 0.15;
  speedY = 0.15;
  lastMove;
  lastHit;
  otherDirection = false;

  health;

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
    if (this.x < this.levelBoundary.right) {
      this.x += this.speedX;
    }
  }

  moveLeft() {
    if (this.x > this.levelBoundary.left) {
      this.x -= this.speedX;
    }
  }

  moveUp() {
    if (this.y > this.levelBoundary.top) {
      this.y -= this.speedX;
    }
  }
  moveDown() {
    if (this.y < this.levelBoundary.bottom) {
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



  isColliding(mo) {
    const leftSide = this.x + this.collisionOffset.left < mo.x + mo.width - mo.collisionOffset.right;
    const rightSide = this.x + this.width - this.collisionOffset.right > mo.x + mo.collisionOffset.left;
    const topSide = this.y + this.collisionOffset.top < mo.y + mo.height - mo.collisionOffset.bottom;
    const bottomSide = this.y + this.height - this.collisionOffset.bottom > mo.y + mo.collisionOffset.top;
    
    const horizontalCollision = leftSide && rightSide;
    const verticalCollision = topSide && bottomSide;
    
    return horizontalCollision && verticalCollision;
  }

  hit(){
    this.health -= 5;
    if (this.health < 0) {
      this.health = 0
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt(seconds = 2){
    let timePassed = (new Date().getTime() - this.lastHit)/1000; // get the seconds
    return timePassed < seconds
  }

/**
 * checks if health is 0
 * @returns Bool
 */
  isDead(){
    return this.health == 0
  }
}
