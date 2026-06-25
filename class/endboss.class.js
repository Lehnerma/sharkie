class Endboss extends MoveableObjects {
  MOVES = {
    INTRODUCE: [
      "assets/images/2.Enemy/endboss/1_introduce/1.png",
      "assets/images/2.Enemy/endboss/1_introduce/2.png",
      "assets/images/2.Enemy/endboss/1_introduce/3.png",
      "assets/images/2.Enemy/endboss/1_introduce/4.png",
      "assets/images/2.Enemy/endboss/1_introduce/5.png",
      "assets/images/2.Enemy/endboss/1_introduce/6.png",
      "assets/images/2.Enemy/endboss/1_introduce/7.png",
      "assets/images/2.Enemy/endboss/1_introduce/8.png",
      "assets/images/2.Enemy/endboss/1_introduce/9.png",
      "assets/images/2.Enemy/endboss/1_introduce/10.png",
    ],
    FLOATING: [
      "assets/images/2.Enemy/endboss/2_floating/1.png",
      "assets/images/2.Enemy/endboss/2_floating/2.png",
      "assets/images/2.Enemy/endboss/2_floating/3.png",
      "assets/images/2.Enemy/endboss/2_floating/4.png",
      "assets/images/2.Enemy/endboss/2_floating/5.png",
      "assets/images/2.Enemy/endboss/2_floating/6.png",
      "assets/images/2.Enemy/endboss/2_floating/7.png",
      "assets/images/2.Enemy/endboss/2_floating/8.png",
      "assets/images/2.Enemy/endboss/2_floating/9.png",
      "assets/images/2.Enemy/endboss/2_floating/10.png",
      "assets/images/2.Enemy/endboss/2_floating/11.png",
      "assets/images/2.Enemy/endboss/2_floating/12.png",
      "assets/images/2.Enemy/endboss/2_floating/13.png",
    ],
    DEAD: ["assets/images/2.Enemy/endboss/3_dead/1.png", "assets/images/2.Enemy/endboss/3_dead/2.png", "assets/images/2.Enemy/endboss/3_dead/3.png", "assets/images/2.Enemy/endboss/3_dead/4.png", "assets/images/2.Enemy/endboss/3_dead/5.png", "assets/images/2.Enemy/endboss/3_dead/6.png"],
    HURT: ["assets/images/2.Enemy/endboss/5_hurt/1.png", "assets/images/2.Enemy/endboss/5_hurt/2.png", "assets/images/2.Enemy/endboss/5_hurt/3.png", "assets/images/2.Enemy/endboss/5_hurt/4.png"],
    ATTACK: ["assets/images/2.Enemy/endboss/4_attack/1.png", "assets/images/2.Enemy/endboss/4_attack/2.png", "assets/images/2.Enemy/endboss/4_attack/3.png", "assets/images/2.Enemy/endboss/4_attack/4.png", "assets/images/2.Enemy/endboss/4_attack/5.png", "assets/images/2.Enemy/endboss/4_attack/6.png"],
  };

  constructor() {
    super();
    this.width = 500;
    this.height = 500;
    this.collisionOffset.top = 150;
    this.collisionOffset.bottom = 100;
    this.collisionOffset.right = 20;
    this.collisionOffset.left = 20;
    this.x = 600;
    this.y = -20;
    this.health = 100;

    this.loadImages(this.MOVES.FLOATING);
    this.animation();
  }

  animation() {
    this.playAnimation(this.MOVES.FLOATING);
  }
}
