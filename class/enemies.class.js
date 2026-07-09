class Enemies extends MoveableObjects {
  color;
  colors = {};
  defeatFrame = 0;
  readyToRemove = false;
  isDefeated = false;
  canDirectHit;
  world; // over this we can get the information about sharkie.
  animationState = "SWIM";
  animationFrame = 0;
  deadSpeedY = 2.5; // upward drift while the enemy is defeated

  constructor() {
    super();
    this.x = this.getRandomX(720, 4000);
    this.y = this.getRandomY();
    this.speedX = Math.random() * 2;
    this.health = 15;
  }

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
