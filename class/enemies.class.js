class Enemies extends MoveableObjects {
  color;
  colors = {};
  defeatFrame = 0;
  readyToRemove = false;
  isDefeated = false;
  pendingDeath = false;
  canDirectHit;
  world;
  animationState = "SWIM";
  animationFrame = 0;
  deadSpeedY = 2.5;

  constructor() {
    super();
    this.x = this.getRandomX(720, 4000);
    this.y = this.getRandomY();
    this.speedX = Math.random() * 2;
    this.health = 15;
  }

  /** @returns {string} a random color key from this.colors */
  getRandomColor() {
    const length = Object.keys(this.colors).length;
    const randomNumber = Math.floor(Math.random() * length) + 1;
    const colors = this.colors;
    return colors[randomNumber];
  }

  /**
   * marks the enemy as defeated and switches it into its dying animation.
   * guarded so it only triggers once (a dying enemy can't be hit again).
   */
  defeat() {
    if (this.isDefeated) return;
    this.isDefeated = true;
    this.animationState = "DEAD";
    this.defeatFrame = 0;
  }

  /**
   * marks the enemy as hit by a fin slap without killing it yet. the enemy
   * keeps swimming until the slap animation has fully played through; sharkie
   * then triggers the actual defeat() in finishFinSlap().
   */
  markSlapKill() {
    if (this.isDefeated) return;
    this.pendingDeath = true;
  }

  /**
   * reacts to being hit by a sharkie bubble.
   * the default behavior is a normal defeat; subclasses can override it
   * for special bubble-trapped animations.
   */
  hitByBubble() {
    this.defeat();
  }

  /**
   * plays the dead frames exactly once and then holds the last frame.
   * @param {string[]} images - image paths of the dead animation
   */
  defeatAnimation(images) {
    this.img = this.imgCache[images[this.defeatFrame]];
    if (this.defeatFrame < images.length - 1) {
      this.defeatFrame++;
    }
  }

  /**
   * lets a defeated enemy drift up out of the screen and flags it for
   * removal once it has fully left the top edge. only starts once the
   * dead animation passed in has fully played through.
   * @param {string[]} images - image paths of the dead animation
   */
  floatAway(images) {
    if (this.defeatFrame < images.length - 1) return;
    this.y -= this.deadSpeedY;
    if (this.y < -this.height) {
      this.readyToRemove = true;
    }
  }
}
