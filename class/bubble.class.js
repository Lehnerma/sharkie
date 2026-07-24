class Bubble extends MoveableObjects {
  BUBBLE = ["assets/images/1.Sharkie/4.Attack/bubble_trap/Bubble.png"];
  POISON_BUBBLE = ["assets/images/1.Sharkie/4.Attack/bubble_trap/Poisoned Bubble (for whale).png"];

  /**
   * @param {number} x - starting x position
   * @param {number} y - starting y position
   * @param {boolean} poison - true fires a poisoned bubble
   * @param {boolean} [otherDirection=false] - true fires the bubble facing left
   */
  constructor(x, y, poison, otherDirection = false) {
    super();
    this.width = 30;
    this.height = 30;
    this.speedX = 4;
    this.otherDirection = otherDirection;
    this.poison = poison;
    this.loadImages(this.BUBBLE);
    this.loadImages(this.POISON_BUBBLE);
    this.loadImage(this.BUBBLE[0]);
    this.x = x;
    this.y = y;
    this.startX = x;
    this.readyToRemove = false;
    this.bubbleAttack(x, y, poison);
  }

  /**
   * launches the bubble: plays the poison or normal animation and moves it
   * in a straight line away from where it was fired.
   * @param {number} x - starting x position
   * @param {number} y - starting y position
   * @param {boolean} poison - true plays the poisoned bubble animation
   */
  bubbleAttack(x, y, poison) {
    this.x = x;
    this.y = y;
    const direction = this.otherDirection ? -1 : 1;
    this.setStoppableInterval(() => {
      if (this.world?.isFrozen) return;
      if (poison) {
        this.animate(this.POISON_BUBBLE);
      } else {
        this.animate(this.BUBBLE);
      }
      this.x += this.speedX * direction;
      this.checkMaxDistance();
    }, 1000 / 60);
  }

  /**
   * marks the bubble for removal once it has travelled far enough
   * off the visible screen.
   */
  checkMaxDistance() {
    const distanceTravelled = Math.abs(this.x - this.startX);
    if (distanceTravelled > 800) {
      this.readyToRemove = true;
    }
  }
}
