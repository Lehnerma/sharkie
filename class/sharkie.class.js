class Sharkie extends MoveableObjects {
  world;
  isSleeping;
  bubbleShotTimestamp;
  poison = false;
  lastHitType;
  deadFrame = 0;

  IDLE = {
    IDLE: [
      "assets/images/1.Sharkie/1.IDLE/1.png",
      "assets/images/1.Sharkie/1.IDLE/2.png",
      "assets/images/1.Sharkie/1.IDLE/3.png",
      "assets/images/1.Sharkie/1.IDLE/4.png",
      "assets/images/1.Sharkie/1.IDLE/5.png",
      "assets/images/1.Sharkie/1.IDLE/6.png",
      "assets/images/1.Sharkie/1.IDLE/7.png",
      "assets/images/1.Sharkie/1.IDLE/8.png",
      "assets/images/1.Sharkie/1.IDLE/9.png",
      "assets/images/1.Sharkie/1.IDLE/10.png",
      "assets/images/1.Sharkie/1.IDLE/11.png",
      "assets/images/1.Sharkie/1.IDLE/12.png",
      "assets/images/1.Sharkie/1.IDLE/13.png",
      "assets/images/1.Sharkie/1.IDLE/14.png",
      "assets/images/1.Sharkie/1.IDLE/15.png",
      "assets/images/1.Sharkie/1.IDLE/16.png",
      "assets/images/1.Sharkie/1.IDLE/17.png",
      "assets/images/1.Sharkie/1.IDLE/18.png",
    ],
    LONG_IDLE_INTRO: [
      "assets/images/1.Sharkie/2.Long_IDLE/i1.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I2.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I3.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I4.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I5.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I6.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I7.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I8.png",
      "assets/images/1.Sharkie/2.Long_IDLE/I9.png",
    ],
    LONG_IDLE_SLEEP: ["assets/images/1.Sharkie/2.Long_IDLE/I10.png", "assets/images/1.Sharkie/2.Long_IDLE/I11.png", "assets/images/1.Sharkie/2.Long_IDLE/I12.png", "assets/images/1.Sharkie/2.Long_IDLE/I13.png", "assets/images/1.Sharkie/2.Long_IDLE/I14.png"],
  };

  DEAD = {
    POISON: [
      "assets/images/1.Sharkie/6.dead/1.Poisoned/1.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/2.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/3.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/4.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/5.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/6.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/7.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/8.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/9.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/10.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/11.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/12.png",
    ],
    ELECTRO: [
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/1.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/2.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/3.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/4.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/5.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/6.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/7.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/8.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/9.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/10.png",
    ],
  };

  HURT = {
    POISON: ["assets/images/1.Sharkie/5.Hurt/1.Poisoned/1.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/2.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/3.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/4.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/5.png"],
    ELECTRO: [
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/3.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/3.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/3.png",
    ],
  };

  SWIM = {
    SWIM_1: ["assets/images/1.Sharkie/3.Swim/1.png", "assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/4.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"],

    SWIM_2: ["assets/images/1.Sharkie/3.Swim/1.png", "assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"],

    SWIM_3: ["assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"],
  };

  ATTACK = {
    FIN_SLAP: [
      "assets/images/1.Sharkie/4.Attack/fin_slap/1.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/2.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/3.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/4.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/5.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/6.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/7.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/8.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/8.png",
    ],
    BUBBLE: [
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/1.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/2.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/3.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/4.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/5.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/6.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/7.png",
    ],
  };

  /** spawns sharkie at his start position and boots stats, gravity and his animation loop. */
  constructor() {
    super();
    this.loadImage("assets/images/1.Sharkie/1.IDLE/1.png");
    this.initStats();
    this.preloadImages();
    this.setBoundary();
    this.setOffset();

    this.lastMove = new Date().getTime();
    this.applyGravity();
    this.animateSharkie();
  }

  /** sets sharkie's spawn position, size, movement speed, gravity and health. */
  initStats() {
    this.x = 200;
    this.y = 200;
    this.height = 200;
    this.width = 200;
    this.speedX = 4;
    this.speedY = 4;
    this.gravityY = 0.2;
    this.health = 100;
  }

  /** loads every animation frame set sharkie can use. */
  preloadImages() {
    this.loadImages(this.IDLE.IDLE);
    this.loadImages(this.IDLE.LONG_IDLE_INTRO);
    this.loadImages(this.IDLE.LONG_IDLE_SLEEP);
    this.loadImages(this.DEAD.ELECTRO);
    this.loadImages(this.DEAD.POISON);
    this.loadImages(this.HURT.ELECTRO);
    this.loadImages(this.HURT.POISON);
    this.loadImages(this.SWIM.SWIM_1);
    this.loadImages(this.SWIM.SWIM_3);
    this.loadImages(this.ATTACK.FIN_SLAP);
    this.loadImages(this.ATTACK.BUBBLE);
  }

  /**
   * runs sharkie's state machine at 60fps for movement. animations are split
   * into two intervals: attacks/dead/hurt run at 80ms, swimming/idle run at
   * 150ms so the swim loop looks slower while attacks stay responsive.
   */
  animateSharkie() {
    this.setStoppableInterval(() => this.updateMovement(), 1000 / 60);
    this.setStoppableInterval(() => this.updateAnimation(), 90);
    this.setStoppableInterval(() => this.updateSwimmingAnimation(), 150);
  }

  /**
   * determines and plays the correct animation for combat states and attack
   * inputs. runs on the faster 80ms interval.
   */
  updateAnimation() {
    if (this.world?.isFrozen) return;
    if (this.isSleeping && !this.timePassed(10)) this.wakeUp();

    if (this.isDead()) {
      this.playDead(this.DEAD[this.lastHitType]);
    } else if (this.isAttacking) {
      this.playFinSlapAttack();
    } else if (this.isAttackingBubble) {
      this.playAttack(this.ATTACK.BUBBLE, () => this.finishBubbleAttackAnimation());
    } else if (this.isHurt()) {
      this.animate(this.HURT[this.lastHitType]);
    } else {
      this.handleAttackInput();
    }
  }

  /**
   * plays swimming and idle animations on the slower 150ms interval.
   * skips combat states so attacks are not interrupted.
   */
  updateSwimmingAnimation() {
    if (this.world?.isFrozen) return;
    if (this.isSleeping && !this.timePassed(10)) this.wakeUp();
    if (this.isDead() || this.isAttacking || this.isAttackingBubble || this.isHurt()) return;
    this.handleMovementAnimation();
  }

  /**
   * handles animation for movement inputs only. attack input is polled on the
   * faster updateAnimation interval via handleAttackInput().
   */
  handleMovementAnimation() {
    if (this.isVerticalMovement()) {
      this.animate(this.SWIM.SWIM_1);
    } else if (this.isLeftMovement()) {
      this.animate(this.SWIM.SWIM_3);
      this.otherDirection = true;
    } else if (this.isRightMovement()) {
      this.animate(this.SWIM.SWIM_3);
      this.otherDirection = false;
    } else if (this.timePassed(10)) {
      this.playLongIdle();
    } else {
      this.animate(this.IDLE.IDLE);
      this.moving = false;
    }
  }

  /**
   * checks attack inputs and triggers fin slap or bubble attack. runs at 80ms
   * but only when no movement keys are held, matching the original priority.
   */
  handleAttackInput() {
    if (this.isVerticalMovement() || this.isLeftMovement() || this.isRightMovement()) return;
    if (this.world.keyboard.E) {
      this.executeFinalSlap();
    } else if (this.world.keyboard.SPACE && this.isBubbleShoot) {
      this.executeBubbleAttack();
    }
  }

  /**
   * checks if vertical movement keys are pressed
   */
  isVerticalMovement() {
    return this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.W || this.world.keyboard.S;
  }

  /**
   * checks if left movement keys are pressed
   */
  isLeftMovement() {
    return this.world.keyboard.LEFT || this.world.keyboard.A;
  }

  /**
   * checks if right movement keys are pressed
   */
  isRightMovement() {
    return this.world.keyboard.RIGHT || this.world.keyboard.D;
  }

  /**
   * executes fin slap attack
   */
  executeFinalSlap() {
    this.wakeUp();
    this.isAttacking = true;
    this.addDistanceForSlap();
    playSound("FIN_SLAP");
    this.playFinSlapAttack();
  }

  /**
   * executes bubble attack
   */
  executeBubbleAttack() {
    this.wakeUp();
    this.isAttackingBubble = true;
    this.playAttack(this.ATTACK.BUBBLE, () => this.finishBubbleAttackAnimation());
  }

  /**
   * runs every frame: a dead sharkie moves on its own, otherwise the
   * keyboard controls him. the camera follows him in both cases.
   */
  updateMovement() {
    if (this.world?.isFrozen) return;
    if (this.isDead()) {
      this.moveDead();
    } else {
      this.moveByKeyboard();
    }
    this.updateCamera();
  }

  /**
   * moves sharkie according to the currently pressed keys,
   * as long as he is not attacking.
   */
  moveByKeyboard() {
    for (let key in this.movements) {
      if (this.world.keyboard[key] && !this.isAttacking && !this.isHurt()) {
        this.movements[key]();
      }
    }
  }

  /** keeps the camera centered on sharkie. */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /** shrinks sharkie's collision box down from the sprite's transparent padding. */
  setOffset() {
    this.collisionOffset.top = 90;
    this.collisionOffset.bottom = 40;
    this.collisionOffset.right = 40;
    this.collisionOffset.left = 40;
  }

  /** sets how far sharkie may move within the level. */
  setBoundary() {
    this.levelBoundary.left = -620;
    this.levelBoundary.right = 3700;
    this.levelBoundary.top = -90;
    this.levelBoundary.bottom = 290;
  }

  /**
   * plays the dead animation exactly once and freezes on the last frame.
   * the animation type (POISON / ELECTRO) is chosen via lastHitType.
   * @param {string[]} images - image paths of the dead animation
   */
  playDead(images) {
    this.img = this.imgCache[images[this.deadFrame]];
    if (this.deadFrame < images.length - 1) {
      this.deadFrame++;
    } else {
      this.deathAnimationDone = true;
    }
  }

  /**
   * moves sharkie while dead based on the last hit type. a poisoned sharkie
   * floats up through the top of the screen (strong negative gravityY), an
   * electrocuted sharkie sinks down to the ground (y = 300) and stays there.
   */
  moveDead() {
    this.moving = true;
    if (this.lastHitType === "POISON") {
      if (this.deadFrame >= this.DEAD.POISON.length - 1) {
        this.gravityY -= 0.2;
        this.y += this.gravityY;
      }
    } else if (this.lastHitType === "ELECTRO") {
      if (this.y < 250) {
        this.y += 4;
      } else {
        this.y = 250;
      }
    }
  }

  /**
   * plays the fin slap animation and fires the fin hit sound once the
   * second-to-last frame is shown, so the impact sound lines up with the
   * strike itself.
   */
  playFinSlapAttack() {
    if (this.attackFrame === this.ATTACK.FIN_SLAP.length - 2) {
      playSound("FIN_HIT"); 
    }
    this.playAttack(this.ATTACK.FIN_SLAP, () => this.finishFinSlap());
  }

  /**
   * ends the fin slap attack: turns sharkie to face the other way (matching
   * the spin in the slap sprite), clears the attacking flag and kills every
   * enemy marked as a pending slap kill. handleMovementAnimation() refreshes
   * the idle/swim image in the same tick as the turn, so the last attack frame
   * isn't left drawn mirrored for a few frames (flashing the wrong facing).
   */
  finishFinSlap() {
    this.otherDirection = !this.otherDirection;
    this.isAttacking = false;
    this.world.level.enemies.forEach((enemy) => {
      if (enemy.pendingDeath) enemy.defeat();
    });
    this.handleMovementAnimation();
  }

  /**
   * ends the bubble attack animation and fires the actual bubble.
   */
  finishBubbleAttackAnimation() {
    this.isAttackingBubble = false;
    this.bubbleShoot();
  }

  /**
   * plays the long-idle intro once, then loops the sleep frames until
   * sharkie moves again.
   */
  playLongIdle() {
    if (this.currentImage <= this.IDLE.LONG_IDLE_INTRO.length) {
      this.animate(this.IDLE.LONG_IDLE_INTRO);
    } else {
      this.animate(this.IDLE.LONG_IDLE_SLEEP);
      if (!this.isSleeping) {
        this.isSleeping = true;
        resumeSound("SNORE");
      }
    }
  }

  /**
   * stops the snore sound once sharkie leaves the long-idle sleep state.
   */
  wakeUp() {
    if (this.isSleeping) {
      this.isSleeping = false;
      stopSound("SNORE");
    }
  }

  /**
   * re-enables bubble shooting after a short cooldown, so sharkie can't
   * fire bubbles back to back.
   */
  bubbleShootTimer() {
    setTimeout(() => {
      this.isBubbleShoot = true;
    }, 500);
  }

  /**
   * fires a bubble from sharkie's mouth in the direction he currently faces,
   * consuming a poison bottle first if any are available, and starts the
   * shoot cooldown.
   */
  bubbleShoot() {
    this.checkPoison();
    const bubbleX = this.otherDirection ? this.x - 25 : this.x + 145;
    let newBubble = new Bubble(bubbleX, this.y + 110, this.poison, this.otherDirection);
    newBubble.world = this.world;
    this.isBubbleShoot = false;
    this.world.bubbles.push(newBubble);
    playSound("BUBBLE");
    this.bubbleShootTimer();
  }

  /**
   * nudges sharkie towards the enemy before a fin slap, so the slap's
   * collision box actually reaches enemies that are just out of range.
   */
  addDistanceForSlap() {
    if (this.otherDirection) {
      this.x -= 20;
    } else {
      this.x += 10;
    }
  }

  /**
   * consumes one poison bottle charge if available and flags the next
   * bubble shot as poisoned; otherwise fires a normal bubble.
   */
  checkPoison() {
    if (this.world.bottlebar.bottleCounter > 0) {
      this.poison = true;
      this.world.bottlebar.bottleCounter -= 10;
      this.world.bottlebar.renderBottle(this.world.bottlebar.bottleCounter);
    } else {
      this.poison = false;
    }
  }
}
