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

    this.loadImage('assets/images/2.Enemy/endboss/2_floating/1.png')

    this.width = 500;
    this.height = 500;
    this.collisionOffset.top = 150;
    this.collisionOffset.bottom = 100;
    this.collisionOffset.right = 20;
    this.collisionOffset.left = 20;
    this.x = 3900;
    this.y = -20;
    this.health = 100;
    this.hurtFrame = 0;
    this.isHurt = false;
    this.isDefeated = false;
    this.isIntroducing = false;
    this.hasIntroduced = false;
    this.introduceFrame = 0;

    this.preloadImages();

    this.animation();
  }

  preloadImages(){
    this.loadImages(this.MOVES.FLOATING);
    this.loadImages(this.MOVES.INTRODUCE);
    this.loadImages(this.MOVES.ATTACK);
    this.loadImages(this.MOVES.DEAD);
    this.loadImages(this.MOVES.HURT);
  }

  animation() {
    setInterval(() => {
      this.checkIntroduce();
      if (this.isDefeated) {
        this.animate(this.MOVES.DEAD);
      } else if (this.isHurt) {
        this.playHurtAnimation();
      } else if (this.isIntroducing) {
        this.playIntroduceAnimation();
      } else {
        this.animate(this.MOVES.FLOATING);
      }
    }, 100);
  }

  /**
   * triggers the introduce animation once, as soon as sharkie reaches the
   * boss arena (x >= 3650). runs only a single time; afterwards the boss
   * returns to its floating animation.
   */
  checkIntroduce() {
    if (this.hasIntroduced || !this.world) return;
    if (this.world.sharkie.x >= 3650) {
      this.isIntroducing = true;
      this.hasIntroduced = true;
      this.introduceFrame = 0;
    }
  }

  /**
   * plays the introduce frames once and then hands control back to the
   * floating animation.
   */
  playIntroduceAnimation() {
    this.img = this.imgCache[this.MOVES.INTRODUCE[this.introduceFrame]];
    if (this.introduceFrame < this.MOVES.INTRODUCE.length - 1) {
      this.introduceFrame++;
    } else {
      this.isIntroducing = false;
    }
  }

  /**
   * plays the hurt frames once, then returns the endboss to floating.
   */
  playHurtAnimation() {
    this.img = this.imgCache[this.MOVES.HURT[this.hurtFrame]];
    if (this.hurtFrame < this.MOVES.HURT.length - 1) {
      this.hurtFrame++;
    } else {
      this.isHurt = false;
      this.hurtFrame = 0;
    }
  }

  /**
   * the endboss takes damage from a bubble and briefly shows its hurt animation.
   */
  hitByBubble() {
    if (this.isDefeated) return;
    this.health -= 20;
    this.isHurt = true;
    this.hurtFrame = 0;
    if (this.health <= 0) {
      this.health = 0;
      this.isHurt = false;
      this.isDefeated = true;
    }
  }
}
