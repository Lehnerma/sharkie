class MoveableObjects extends DrawableObjects {
  speedX = 0.15;
  speedY = 0.15;
  gravityY = 1.5;
  lastMove;
  lastHit;
  otherDirection = false;

  moving = false;
  isAttacking = false;
  attackFrame = 0;

  health;
  isBubbleShoot = true;

  deathAnimationDone = false

  constructor() {
    super();
  }

  /**
   * shows the next frame of an animation loop, looping back to the start
   * once the last frame was shown.
   * @param {string[]} images - image paths of the animation
   */
  animate(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  /**
   * repeatedly plays an animation on a fixed interval.
   * @param {string[]} images - image paths of the animation
   * @param {number} [frames=100] - delay between frames in milliseconds
   */
  playAnimation(images, frames = 100) {
    this.setStoppableInterval(() => {
      this.animate(images);
    }, frames);
  }

  /** moves right by speedX, staying within the level's right boundary. */
  moveRight() {
    if (this.x < this.levelBoundary.right) {
      this.x += this.speedX;
      this.moving = true;
    }
  }

  /** moves left by speedX, staying within the level's left boundary. */
  moveLeft() {
    if (this.x > this.levelBoundary.left) {
      this.x -= this.speedX;
      this.moving = true;
    }
  }

  /** moves up by speedY, staying within the level's top boundary. */
  moveUp() {
    if (this.y > this.levelBoundary.top) {
      this.y -= this.speedY;
      this.moving = true;
    }
  }

  /** moves down by speedY, staying within the level's bottom boundary. */
  moveDown() {
    if (this.y < this.levelBoundary.bottom) {
      this.y += this.speedY;
      this.moving = true;
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
    // WASD movements.
    W: () => {
      this.moveUp();
      this.setTimestamp();
    },
    A: () => {
      this.moveLeft();
      this.setTimestamp();
    },
    S: () => {
      this.moveDown();
      this.setTimestamp();
    },
    D: () => {
      this.moveRight();
      this.setTimestamp();
    },
  };

  /**
   * @param {number} time - seconds to compare against
   * @returns {boolean} true once more than `time` seconds passed since the last move
   */
  timePassed(time) {
    let timePassed = new Date().getTime() - this.lastMove;
    timePassed = timePassed / 1000;
    return timePassed > time;
  }

  /**
   * records the current time as the last move, used by timePassed() to
   * detect how long the object has been idle.
   */
  setTimestamp() {
    this.lastMove = new Date().getTime();
  }

  /**
   * axis-aligned bounding box check, using each object's collisionOffset
   * to shrink the box down to the visible sprite.
   * @param {MoveableObjects} mo - the other object to check against
   * @returns {boolean} true if the two objects' collision boxes overlap
   */
  isColliding(mo) {
    const leftSide = this.x + this.collisionOffset.left < mo.x + mo.width - mo.collisionOffset.right;
    const rightSide = this.x + this.width - this.collisionOffset.right > mo.x + mo.collisionOffset.left;
    const topSide = this.y + this.collisionOffset.top < mo.y + mo.height - mo.collisionOffset.bottom;
    const bottomSide = this.y + this.height - this.collisionOffset.bottom > mo.y + mo.collisionOffset.top;

    const horizontalCollision = leftSide && rightSide;
    const verticalCollision = topSide && bottomSide;

    return horizontalCollision && verticalCollision;
  }

  /**
   * reduces health by the given amount, clamped at 0, and marks the hit
   * timestamp so isHurt() can detect a brief invulnerability window.
   * @param {number} [hitpoints=5] - damage to apply
   */
  hit(hitpoints = 5) {
    this.health -= hitpoints;
    this.setTimestamp();
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * @param {number} [seconds=2] - hurt window length in seconds
   * @returns {boolean} true while the last hit is still within the hurt window
   */
  isHurt(seconds = 2) {
    let timePassed = (new Date().getTime() - this.lastHit) / 1000; // get the seconds

    return timePassed < seconds;
  }

  /**
   * checks if health is 0
   * @returns Bool
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * pulls the object down over time while it is above ground and not
   * being actively moved, so releasing the controls lets it sink.
   */
  applyGravity() {
    this.setStoppableInterval(() => {
      if (this.world?.isFrozen) return; // freeze gravity once the game is over, won or paused
      if (this.isAboveGround() && this.isMoving()) {
        this.y += this.gravityY;
      }
    }, 1000 / 25);
  }

  /** @returns {boolean} true while the object is above the ground line (y <= 260) */
  isAboveGround() {
    return this.y <= 260;
  }

  /**
   * plays an attack animation frame by frame and calls onFinish once it
   * has fully played through, then resets the frame counter for the next attack.
   * @param {string[]} images - image paths of the attack animation
   * @param {Function} onFinish - called once the last frame has been shown
   */
  playAttack(images, onFinish) {
    let path = images[this.attackFrame];
    this.img = this.imgCache[path];
    if (this.attackFrame < images.length - 1) {
      this.attackFrame++;
    } else {
      onFinish();
      this.attackFrame = 0;
    }
    this.setTimestamp(); // wird gesetzt um die longIdle richtig zu triggern
  }

  /**
   * despite the name this actually reports the opposite of the `moving`
   * flag; kept as-is since applyGravity() relies on this exact meaning.
   * @returns {boolean} true when the object is currently idle
   */
  isMoving() {
    return !this.moving;
  }
}
