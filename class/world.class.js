class World {
  canvas;
  sharkie = new Sharkie();
  bubbles = [];
  coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
  bottles = [new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle()];
  keyboard;
  ctx;
  level;
  camera_x = 0;
  healthbar = new Statusbar(
    ["assets/images/4_Marcadores/green/Life/0.png", "assets/images/4_Marcadores/green/Life/20.png", "assets/images/4_Marcadores/green/Life/40.png", "assets/images/4_Marcadores/green/Life/60.png", "assets/images/4_Marcadores/green/Life/80.png", "assets/images/4_Marcadores/green/Life/100.png"],
    0,
    100
  );
  coinbar = new Statusbar(
    ["assets/images/4_Marcadores/green/Coin/0.png", "assets/images/4_Marcadores/green/Coin/20.png", "assets/images/4_Marcadores/green/Coin/40.png", "assets/images/4_Marcadores/green/Coin/60.png", "assets/images/4_Marcadores/green/Coin/80.png", "assets/images/4_Marcadores/green/Coin/100.png"],
    35
  );
  bottlebar = new Statusbar(
    ["assets/images/4_Marcadores/orange/0_poison.png", "assets/images/4_Marcadores/orange/20_poison.png", "assets/images/4_Marcadores/orange/40_poison.png", "assets/images/4_Marcadores/orange/60_poison.png", "assets/images/4_Marcadores/orange/80_ poison.png", "assets/images/4_Marcadores/orange/100_ poison.png"],
    70
  );
  endbossbar = new Endbossbar();
  endscreen = new Endscreen();
  shop;
  world_end = 3700;

  coinReplenishing = false;
  bottleReplenishing = false;
  gameOver = false;
  gameWon = false;
  paused = false;
  worldBeginX = -700;
  worldEndX = 3600;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.setWorld();
    this.draw();
    this.helperFunction();
    this.addElementsToWorld();
  }

  /**
   * gives sharkie, every enemy and the endboss a back-reference to this
   * world, so they can read game state (keyboard, isGameEnded, sharkie's
   * position) without the world passing it in on every call.
   */
  setWorld() {
    this.sharkie.world = this;
    this.shop = new Shop(this);
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.endboss.forEach((boss) => {
      boss.world = this;
    });
  }

  /**
   * renders one frame: clears the canvas, draws the world (shifted by the
   * camera) followed by the screen-fixed UI, then schedules the next frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWorldObjects();
    this.drawUI();
    this.animationFrame = requestAnimationFrame(() => this.draw());
  }

  /**
   * draws everything that lives in world space (shifted by the camera):
   * backgrounds, sharkie, the endboss, enemies and collectibles.
   */
  drawWorldObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addToMap(this.sharkie);
    this.addEndbossToMap();
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
  }

  /** draws the screen-fixed UI: the status bars, boss bar and end screen. */
  drawUI() {
    this.addToMap(this.healthbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    this.drawEndbossbar();
    if (this.isGameEnded) {
      this.addToMap(this.endscreen);
    }
  }

  /**
   * runs every game-logic check (collisions, pickups, shop input, game
   * over) on a shared interval, frozen entirely once the game has ended.
   */
  helperFunction() {
    this.helperInterval = setInterval(() => {
      if (this.isFrozen) return;
      this.checkEnemyCollision();
      this.checkEndbossCollision();
      this.checkBubbleCollision();
      this.removeBubbles();
      this.checkCoinCollision();
      this.checkPoisonBottleCollision();
      this.shop.checkShopInput();
      this.checkEnemyBoundary();
      this.checkGameOver();
    }, 200);
  }

  /**
   * periodically replenishes collectibles that the player has picked up.
   */
  addElementsToWorld() {
    this.elementsInterval = setInterval(() => {
      this.addCoinsToWorld();
      this.addBottlesToWorld();
    }, 5000);
  }

  /**
   * tops coins back up to 11 once they drop below 5, so the world never
   * runs dry; coinReplenishing keeps refilling until the cap is reached.
   */
  addCoinsToWorld() {
    if (this.coins.length < 5) this.coinReplenishing = true;
    if (this.coinReplenishing) {
      if (this.coins.length < 11) {
        this.coins.push(new Coin());
      } else {
        this.coinReplenishing = false;
      }
    }
  }

  /**
   * tops poison bottles back up to 11 once they drop below 5, mirroring
   * addCoinsToWorld();
   */
  addBottlesToWorld() {
    if (this.bottles.length < 5) this.bottleReplenishing = true;
    if (this.bottleReplenishing) {
      if (this.bottles.length < 11) {
        this.bottles.push(new Poisonbottle());
      } else {
        this.bottleReplenishing = false;
      }
    }
  }

  /**
   * draws one object, flipping it horizontally around the y axis first if
   * it currently faces the other direction.
   * @param {DrawableObjects} mo - the object to draw
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawObject(this.ctx);
    // mo.drawBorderCollision(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * draws every object in a list via addToMap().
   * @param {DrawableObjects[]} objects - objects to draw
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * draws the endboss only once it has been introduced, so it stays hidden
   * off-screen until sharkie reaches the boss arena and the introduce
   * animation kicks in.
   */
  addEndbossToMap() {
    this.level.endboss.forEach((boss) => {
      if (boss.hasIntroduced) this.addToMap(boss);
    });
  }

  /**
   * draws the screen-fixed boss healthbar once the endboss has appeared and is
   * still alive, mirroring the boss's current health.
   */
  drawEndbossbar() {
    this.level.endboss.forEach((boss) => {
      if (boss.hasIntroduced && !boss.isDefeated) {
        this.endbossbar.setHealth(boss.health);
        this.addToMap(this.endbossbar);
      }
    });
  }

  /**
   * mirrors the canvas horizontally around the object so its next draw
   * call renders facing the opposite way; must be paired with flipImageBack().
   * @param {DrawableObjects} mo - the object about to be drawn flipped
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * undoes flipImage()'s canvas mirroring after the object has been drawn.
   * @param {DrawableObjects} mo - the object that was just drawn flipped
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  /**
   * for every enemy: removes it once it's ready, kills it via a fin slap
   * if sharkie is attacking and it allows direct hits, or otherwise hurts
   * sharkie on plain body contact (unless the enemy is already dying).
   */
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (enemy.readyToRemove) {
        this.level.enemies.splice(index, 1);
      } else if (this.canSlapKill(enemy)) {
        enemy.markSlapKill();
      } else if (this.sharkie.isColliding(enemy) && !enemy.isDefeated && !enemy.pendingDeath) {
        this.hurtSharkieByEnemy(enemy);
      }
    });
  }

  /**
   * true when a fin-slapping sharkie touches an enemy that allows direct
   * hits and isn't already dying.
   * @param {Enemies} enemy - the enemy to test
   */
  canSlapKill(enemy) {
    return this.sharkie.isColliding(enemy) && this.sharkie.isAttacking && enemy.canDirectHit && !enemy.isDefeated;
  }

  /**
   * hurts sharkie on plain body contact with an enemy and plays the matching
   * hit sound (only on a fresh hit), then refreshes the healthbar.
   * @param {Enemies} enemy - the enemy sharkie collided with
   */
  hurtSharkieByEnemy(enemy) {
    const wasHurt = this.sharkie.isHurt();
    this.getLastHitTypeSharkie(enemy);
    this.sharkie.hit();
    if (!wasHurt && this.sharkie.lastHitType === "ELECTRO") {
      playSound("ELECTRIC_HIT");
    } else if (!wasHurt && this.sharkie.lastHitType === "POISON") {
      playSound("POISON_HIT_SHARKIE");
    }
    this.healthbar.renderHealthbar(this.sharkie.health);
  }

  /**
   * hurts sharkie while he is in direct body contact with an introduced,
   * still-living endboss.
   */
  checkEndbossCollision() {
    this.level.endboss.forEach((boss) => {
      if (boss.hasIntroduced && !boss.isDefeated && this.sharkie.isColliding(boss)) {
        this.sharkie.lastHitType = "POISON";
        this.sharkie.hit(20);
        this.healthbar.renderHealthbar(this.sharkie.health);
      }
    });
  }

  /**
   * checks whether any active bubble collides with an enemy.
   * on a hit the enemy reacts via hitByBubble() and the bubble is removed.
   */
  checkBubbleCollision() {
    this.bubbles.forEach((bubble) => {
      if (bubble.readyToRemove) return;
      this.checkBubbleEnemyHit(bubble);
      this.checkBubbleBossHit(bubble);
    });
  }

  /**
   * hits every non-defeated, non-direct-hit enemy the bubble touches and
   * marks the bubble for removal.
   * @param {Bubble} bubble - the active bubble to test
   */
  checkBubbleEnemyHit(bubble) {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDefeated && bubble.isColliding(enemy) && !enemy.canDirectHit) {
        enemy.hitByBubble();
        playSound("ENEMY_HIT");
        bubble.readyToRemove = true;
      }
    });
  }

  /**
   * hits the endboss when a poison bubble touches it and marks the bubble
   * for removal.
   * @param {Bubble} bubble - the active bubble to test
   */
  checkBubbleBossHit(bubble) {
    this.level.endboss.forEach((boss) => {
      if (!boss.isDefeated && bubble.isColliding(boss) && bubble.poison) {
        boss.hitByBubble();
        playSound("ENEMY_HIT");
        bubble.readyToRemove = true;
      }
    });
  }

  /**
   * removes bubbles that have hit an enemy or travelled too far.
   */
  removeBubbles() {
    this.bubbles = this.bubbles.filter((bubble) => !bubble.readyToRemove);
  }

  /**
   * picks which hurt/dead animation sharkie should play based on the enemy
   * that hit him: jelly fish shock him, everything else poisons him.
   * @param {Enemies} enemy - the enemy sharkie just collided with
   */
  getLastHitTypeSharkie(enemy) {
    if (enemy instanceof JellyFish) {
      this.sharkie.lastHitType = "ELECTRO";
    } else {
      this.sharkie.lastHitType = "POISON";
    }
  }

  /**
   * collects a coin sharkie touches, as long as the coin bar isn't already full.
   */
  checkCoinCollision() {
    this.coins.forEach((coin, index) => {
      if (this.sharkie.isColliding(coin) && this.coinbar.coinCounter < 100) {
        this.coinbar.collectCoin();
        playSound("COIN_COLLECT");
        this.coins.splice(index, 1);
      }
    });
  }

  /**
   * collects a poison bottle sharkie touches, as long as the bottle bar
   * isn't already full.
   */
  checkPoisonBottleCollision() {
    this.bottles.forEach((bottle, index) => {
      if (this.sharkie.isColliding(bottle) && this.bottlebar.bottleCounter < 100) {
        this.bottlebar.collectBottle();
        playSound("BOTTLE_COLLECT");
        this.bottles.splice(index, 1);
      }
    });
  }

  /**
   * wraps an enemy that drifted past the world's left edge back around to
   * the right edge with a fresh random height, so enemies loop endlessly.
   */
  checkEnemyBoundary() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.x < this.worldBeginX) {
        enemy.x = this.worldEndX + 800;
        enemy.y = enemy.getRandomY();
      }
    });
  }

  /** removes every active bubble immediately. */
  deleteBubble() {
    this.bubbles = [];
  }

  /**
   * ends the game once sharkie's death animation or the endboss's death
   * animation has fully played through, and shows the matching end screen,
   * sound and try-again button.
   */
  checkGameOver() {
    if (this.isGameEnded) return;
    if (this.sharkie.deathAnimationDone) {
      this.endWithLoss();
    } else if (this.level.endboss.some((boss) => boss.deathAnimationDone)) {
      this.endWithWin();
    }
    if (this.isGameEnded) {
      showTryAgainBtn();
    }
  }

  /** ends the game as a loss: shows the game-over screen and plays its sound. */
  endWithLoss() {
    this.gameOver = true;
    this.gameWon = false;
    this.endscreen.setResult(false);
    stopSound("BACKGROUND_MUSIC");
    playSound("GAME_OVER");
  }

  /** ends the game as a win: shows the game-won screen and plays its sound. */
  endWithWin() {
    this.gameOver = false;
    this.gameWon = true;
    this.endscreen.setResult(true);
    stopSound("BACKGROUND_MUSIC");
    playSound("GAME_WON");
  }

  /** @returns {boolean} true once the game has been won or lost */
  get isGameEnded() {
    return this.gameOver || this.gameWon;
  }

  /** @returns {boolean} true once the game has ended or is paused (e.g. the home confirm dialog is open) */
  get isFrozen() {
    return this.isGameEnded || this.paused;
  }

  /**
   * shuts this world down completely: stops the world loops, cancels the next
   * render frame and stops every game object's own intervals. without this a
   * restart would leave all the old loops running in the background.
   */
  stop() {
    clearInterval(this.helperInterval);
    clearInterval(this.elementsInterval);
    cancelAnimationFrame(this.animationFrame);
    this.stopObjectIntervals();
  }

  /**
   * stops the intervals of every object in the world (sharkie, enemies,
   * endboss, bubbles, bottles, coins), so none of their animation or movement
   * loops keep ticking after the world is gone.
   */
  stopObjectIntervals() {
    const objects = [this.sharkie, ...this.level.enemies, ...this.level.endboss, ...this.bubbles, ...this.bottles, ...this.coins];
    objects.forEach((object) => object?.stopIntervals());
  }
}
