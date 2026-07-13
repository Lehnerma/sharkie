class Bubble extends MoveableObjects {
  BUBBLE = ["assets/images/1.Sharkie/4.Attack/bubble_trap/Bubble.png"];
  POISON_BUBBLE = ["assets/images/1.Sharkie/4.Attack/bubble_trap/Poisoned Bubble (for whale).png"];

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

  bubbleAttack(x, y, poison) {
    this.x = x;
    this.y = y;
    const direction = this.otherDirection ? -1 : 1;
    setInterval(() => {
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
