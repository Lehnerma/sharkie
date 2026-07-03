class Bubble extends MoveableObjects {
  BUBBLE = ["assets/images/1.Sharkie/4.Attack/bubble_trap/Bubble.png"];
  POISON_BUBBLE = ["assets/images/1.Sharkie/4.Attack/bubble_trap/Poisoned Bubble (for whale).png"];

  constructor(x, y, poison) {
    super();
    this.width = 30;
    this.height = 30;
    this.speedX = 4;
    this.loadImages(this.BUBBLE);
    this.loadImages(this.POISON_BUBBLE);
    this.loadImage(this.BUBBLE[0]);
    this.x = x;
    this.y = y;
    this.bubbleAttack(x, y, poison);
  }

  bubbleAttack(x, y, poison) {
    this.x = x;
    this.y = y;
    setInterval(() => {
      if (poison) {
        this.animate(this.POISON_BUBBLE);
      } else {
        this.animate(this.BUBBLE);
      }
      this.x += this.speedX;
    }, 1000 / 60);
  }
}
