class World {
  canvas;
  sharkie = new Sharkie();
  bubbles = [];
  coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
  bottles = [new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle()];
  keyboard;
  ctx;
  level = level1;
  camera_x = 0;
  healthbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  endbossbar = new Endbossbar();
  world_end = 3700;
  lastShopBuy = 0;
  coinReplenishing = false;
  gameOver = false;
  gameWon = false;

  //* endpoint for the world.
  worldEndX = 3600;
  //* begin point for the world
  worldBeginX = -700;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.helperFunction();
    this.addElementsToWorld();
  }

  setWorld() {
    this.sharkie.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.endboss.forEach((boss) => {
      boss.world = this;
    });
  }

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

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  helperFunction() {
    setInterval(() => {
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

  addElementsToWorld() {
    setInterval(() => {
      this.addCoinsToWorld();
    }, 5000);
  }

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

  checkShopInput() {
    const now = new Date().getTime();
    if (now - this.lastShopBuy < 5000) return;
    if (this.keyboard.H) {
      this.buyHeal();
    } else if (this.keyboard.B) {
      this.buyBottles();
    }
  }

  buyHeal() {
    if (this.coinbar.coinCounter >= 10 && this.sharkie.health < 100) {
      this.coinbar.coinCounter -= 100;

      this.coinbar.renderCoinbar(this.coinbar.coinCounter);
      this.sharkie.health = Math.min(100, this.sharkie.health + 50);
      this.healthbar.renderHealthbar(this.sharkie.health);
      this.lastShopBuy = new Date().getTime();
    }
  }

  buyBottles() {
    if (this.coinbar.coinCounter >= 10 && this.bottlebar.bottleCounter < 100) {
      this.coinbar.coinCounter -= 100;

      this.coinbar.renderCoinbar(this.coinbar.coinCounter);
      this.bottlebar.bottleCounter = Math.min(100, this.bottlebar.bottleCounter + 50);
      this.bottlebar.renderBottle(this.bottlebar.bottleCounter);
      this.lastShopBuy = new Date().getTime();
    }
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  checkEnemyCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (enemy.readyToRemove) {
        this.level.enemies.splice(index, 1);
      } else if (this.sharkie.isColliding(enemy) && this.sharkie.isAttacking && enemy.canDirectHit && !enemy.isDefeated) {
        enemy.defeat();
      } else if (this.sharkie.isColliding(enemy) && !enemy.isDefeated) {
        this.getLastHitTypeSharkie(enemy);
        this.sharkie.hit();
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
        this.sharkie.hit();
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
          bubble.readyToRemove = true;
        }
      });
      this.level.endboss.forEach((boss) => {
        if (!boss.isDefeated && bubble.isColliding(boss) && bubble.poison) {
          boss.hitByBubble();
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

  getLastHitTypeSharkie(enemy) {
    if (enemy instanceof JellyFish) {
      this.sharkie.lastHitType = "ELECTRO";
      console.log("hit by a jellyfish");
    } else {
      this.sharkie.lastHitType = "POISON";
      console.log("hit by a pufferfish");
    }
  }

  checkCoinCollision() {
    this.coins.forEach((coin, index) => {
      if (this.sharkie.isColliding(coin) && this.coinbar.coinCounter < 100) {
        this.coinbar.collectCoin();
        this.coins.splice(index, 1);
      }
    });
  }

  checkPoisonBottleCollision() {
    this.bottles.forEach((bottle, index) => {
      if (this.sharkie.isColliding(bottle) && this.bottlebar.bottleCounter < 100) {
        this.bottlebar.collectBottle();
        this.bottles.splice(index, 1);
      }
    });
  }

  checkEnemyBoundary() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.x < this.worldBeginX) {
        enemy.x = this.worldEndX + 800;
        enemy.y = enemy.getRandomY();
      }
    });
  }

  deleteBubble() {
    this.bubbles = [];
  }

  checkGameOver() {
    if (this.gameOver) return;
    if(this.sharkie.deathAnimationDone){
      this.gameOver = true;
      this.gameWon = false;
      console.log('loos');
      
    } else if(this.level.endboss.some(boss => boss.deathAnimationDone)){
      this.gameOver = false;
      this.gameWon = true;
      console.log('won');
      
    }
  }
}
