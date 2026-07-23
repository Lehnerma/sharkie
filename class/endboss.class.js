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

    this.width = 400;
    this.height = 400;
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
    this.deadFrame = 0;
    this.speedX = 1;
    this.speedY = 3;
    this.yFollowFactor = 0.05;
    this.attackRange = 180;
    this.attackCooldown = 1500;
    this.lastAttack = 0;
    this.attackLunge = 50;
    this.lungeApplied = 0;
    this.minX = 0;
    this.yOffset = -100;
    this.minY = -100;
    this.maxY = 100;

    this.preloadImages();

    this.animation();
    this.movement();
  }

  /** loads every animation frame set the endboss can use. */
  preloadImages(){
    this.loadImages(this.MOVES.FLOATING);
    this.loadImages(this.MOVES.INTRODUCE);
    this.loadImages(this.MOVES.ATTACK);
    this.loadImages(this.MOVES.DEAD);
    this.loadImages(this.MOVES.HURT);
  }

  /**
   * runs the boss's animation state machine: picks and plays the frame set
   * matching its current state (dead, hurt, introducing, attacking, or the
   * default floating loop), and checks each tick whether it's time to
   * introduce the boss.
   */
  animation() {
    this.setStoppableInterval(() => {
      if (this.world?.isFrozen) return;
      this.checkIntroduce();
      if (this.isDefeated) {
        this.playDeadAnimation();
      } else if (this.isHurt) {
        this.playHurtAnimation();
      } else if (this.isIntroducing) {
        this.playIntroduceAnimation();
      } else if (this.hasIntroduced && this.isSharkieInAttackRange() && !this.sharkieIsDead()) {
        this.attackSharkie();
      } else {
        this.animate(this.MOVES.FLOATING);
      }
    }, 100);
  }

  /**
   * plays one attack, then keeps a short cooldown before the next one so the
   * boss does not attack continuously. while cooling down it just floats.
   */
  attackSharkie() {
    if (!this.isAttacking && this.attackReady()) this.startAttack();
    if (this.isAttacking) {
      this.playAttack(this.MOVES.ATTACK, () => this.finishAttack());
    } else {
      this.animate(this.MOVES.FLOATING);
    }
  }

  /**
   * begins one attack swing and lunges attackLunge px towards sharkie so their
   * collision borders overlap during the strike. the lunge is reverted in
   * finishAttack, so the jab itself does not drift the boss into sharkie.
   */
  startAttack() {
    this.isAttacking = true;
    const dir = this.world.sharkie.x < this.x ? -1 : 1;
    const targetX = Math.max(this.minX, this.x + dir * this.attackLunge);
    this.lungeApplied = targetX - this.x;
    this.x = targetX;
    this.otherDirection = dir > 0;
  }

  /** true once the cooldown since the last attack has elapsed. */
  attackReady() {
    return new Date().getTime() - this.lastAttack >= this.attackCooldown;
  }

  /**
   * runs the boss combat movement at 60fps: while introduced and alive, the
   * boss swims towards sharkie until he is within attack range.
   */
  movement() {
    this.setStoppableInterval(() => {
      if (this.world?.isFrozen) return;
      if (!this.canFight()) return;
      this.followSharkieY();
      if (!this.isSharkieInAttackRange()) this.swimTowardsSharkie();
    }, 1000 / 60);
  }

  /**
   * the boss only fights once fully introduced, while still alive, and while
   * sharkie is alive. once sharkie dies the boss stops moving so it does not
   * copy sharkie's float-away death animation.
   */
  canFight() {
    return this.world && this.hasIntroduced && !this.isIntroducing && !this.isDefeated && !this.sharkieIsDead();
  }

  /** true when sharkie has been defeated (health hit zero). */
  sharkieIsDead() {
    return !!this.world && this.world.sharkie.isDead();
  }

  /** horizontal gap between the boss and sharkie. */
  distanceToSharkie() {
    return Math.abs(this.world.sharkie.x - this.x);
  }

  /** true when sharkie is close enough for the boss to attack. */
  isSharkieInAttackRange() {
    return !!this.world && this.distanceToSharkie() <= this.attackRange;
  }

  /**
   * moves the boss towards sharkie and faces him. sharkie approaches from the
   * left, so the boss usually swims from right to left.
   */
  swimTowardsSharkie() {
    if (this.world.sharkie.x < this.x) {
      this.x = Math.max(this.minX, this.x - this.speedX);
      this.otherDirection = false;
    } else if (this.world.sharkie.x > this.x) {
      this.x += this.speedX;
      this.otherDirection = true;
    }
  }

  /**
   * keeps sharkie vertically centered on the boss so the player cannot swim
   * over the boss to slip behind him. eases towards sharkie's height (with a
   * slight delay), is capped for a slower vertical speed, and stays within the
   * min/max y bounds so the boss never drifts off the play area.
   */
  followSharkieY() {
    const centeredY = this.world.sharkie.y + this.yOffset;
    const targetY = Math.max(this.minY, Math.min(this.maxY, centeredY));
    const diff = targetY - this.y;
    if (Math.abs(diff) <= 1) {
      this.y = targetY;
      return;
    }
    let step = diff * this.yFollowFactor;
    step = Math.max(-this.speedY, Math.min(this.speedY, step));
    this.y += step;
  }

  /**
   * called at the end of each attack swing: reverts the lunge, then deals
   * damage if sharkie is still in range.
   */
  finishAttack() {
    this.isAttacking = false;
    this.x -= this.lungeApplied;
    this.lungeApplied = 0;
    this.lastAttack = new Date().getTime();
    if (!this.isSharkieInAttackRange()) return;
    this.world.sharkie.lastHitType = "POISON";
    this.world.sharkie.hit();
    this.world.healthbar.renderHealthbar(this.world.sharkie.health);
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
      playSound("BOSS_APPEAR");
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
   * plays the dead frames exactly once and freezes on the last frame.
   * the winning screen will later take over from here.
   */
  playDeadAnimation() {
    this.img = this.imgCache[this.MOVES.DEAD[this.deadFrame]];
    if (this.deadFrame < this.MOVES.DEAD.length - 1) {
      this.deadFrame++;
    } else {
      this.deathAnimationDone = true;
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
