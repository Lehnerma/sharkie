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
  healthbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  endbossbar = new Endbossbar();
  endscreen = new Endscreen();
  world_end = 3700;
  lastShopBuy = 0;
  coinReplenishing = false;
  bottleReplenishing = false;
  gameOver = false;
  gameWon = false;
  paused = false;
  //* begin point for the world
  worldBeginX = -700;
  //* endpoint for the world.
  worldEndX = 3600;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = createLevel1(); // build a fresh level so a restart starts clean
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //reset the canvas
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);

    this.addToMap(this.sharkie);
    this.addEndbossToMap();
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    this.drawEndbossbar();

    if (this.isGameEnded) {
      this.addToMap(this.endscreen); // overlay the game over / win title on the frozen scene
    }

    this.animationFrame = requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * runs every game-logic check (collisions, pickups, shop input, game
   * over) on a shared interval, frozen entirely once the game has ended.
   */
  helperFunction() {
    this.helperInterval = setInterval(() => {
      if (this.isFrozen) return; // block the up coming functions if game over, won or paused
      this.checkEnemyCollision();
      this.checkEndbossCollision();
      this.checkBubbleCollision();
      this.removeBubbles();
      this.checkCoinCollision();
      this.checkPoisonBottleCollision();
      this.checkShopInput();
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
   * addCoinsToWorld(); currently unused (no caller wires this up).
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
   * reads the shop keys (H = heal, B = buy bottles), rate-limited to once
   * every 5 seconds so holding a key down doesn't drain coins repeatedly.
   */
  checkShopInput() {
    const now = new Date().getTime();
    if (now - this.lastShopBuy < 5000) return;
    if (this.keyboard.H) {
      this.buyHeal();
    } else if (this.keyboard.B) {
      this.buyBottles();
    }
  }

  /**
   * spends 100 coins to heal sharkie by 50 (capped at 100 health), if he
   * has enough coins and isn't already at full health.
   */
  buyHeal() {
    if (this.coinbar.coinCounter >= 99 && this.sharkie.health < 100) {
      this.coinbar.coinCounter -= 100;

      this.coinbar.renderCoinbar(this.coinbar.coinCounter);
      this.sharkie.health = Math.min(100, this.sharkie.health + 50);
      this.healthbar.renderHealthbar(this.sharkie.health);
      playSound("HEALING");
      this.lastShopBuy = new Date().getTime();
    }
  }

  /**
   * spends 100 coins to buy 50 poison bottle charges (capped at 100), if
   * sharkie has enough coins and isn't already full on bottles.
   */
  buyBottles() {
    if (this.coinbar.coinCounter >= 99 && this.bottlebar.bottleCounter < 100) {
      this.coinbar.coinCounter -= 100;

      this.coinbar.renderCoinbar(this.coinbar.coinCounter);
      this.bottlebar.bottleCounter = Math.min(100, this.bottlebar.bottleCounter + 50);
      this.bottlebar.renderBottle(this.bottlebar.bottleCounter);
      playSound("SHOP_BUYING");
      this.lastShopBuy = new Date().getTime();
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
    mo.drawBorderCollision(this.ctx);
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
      } else if (this.sharkie.isColliding(enemy) && this.sharkie.isAttacking && enemy.canDirectHit && !enemy.isDefeated) {
        enemy.markSlapKill(); // dies only once the fin slap has finished (see sharkie.finishFinSlap)
      } else if (this.sharkie.isColliding(enemy) && !enemy.isDefeated && !enemy.pendingDeath) {
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
    });
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
    this.bubbles.forEach((bubble, bubbleIndex) => {
      if (bubble.readyToRemove) return;
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDefeated && bubble.isColliding(enemy) && !enemy.canDirectHit) {
          enemy.hitByBubble();
          playSound("ENEMY_HIT");
          bubble.readyToRemove = true;
        }
      });
      this.level.endboss.forEach((boss) => {
        if (!boss.isDefeated && bubble.isColliding(boss) && bubble.poison) {
          boss.hitByBubble();
          playSound("ENEMY_HIT");
          bubble.readyToRemove = true;
        }
      });
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
      this.gameOver = true;
      this.gameWon = false;
      this.endscreen.setResult(false);
      stopSound("BACKGROUND_MUSIC");
      playSound("GAME_OVER");
    } else if (this.level.endboss.some((boss) => boss.deathAnimationDone)) {
      this.gameOver = false;
      this.gameWon = true;
      this.endscreen.setResult(true);
      stopSound("BACKGROUND_MUSIC");
      playSound("GAME_WON");
    }
    if (this.isGameEnded) {
      showTryAgainBtn();
    }
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
    objects.forEach((object) => object?.stopIntervals()); // the enemies array has a hole, guard against undefined
  }
}
