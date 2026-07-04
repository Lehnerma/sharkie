class World {
  canvas;
  sharkie = new Sharkie();
  bubbles = [];
  coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
  bottles = [new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle(), new Poisonbottle()];
  keyboard;
  ctx;
  level = level1;
  cameraX;
  healthbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  world_end = 3700;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.helperFunction();
  }

  setWorld() {
    this.sharkie.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //reset the canvas
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addToMap(this.sharkie);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  helperFunction() {
    setInterval(() => {
      this.checkEnemyCollision();
      this.checkCoinCollision();
      this.checkPoisonBottleCollision();
    }, 200);
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
      if (this.sharkie.isColliding(enemy) && this.sharkie.isAttacking && !enemy.isDefeated && enemy.canDirectHit) {
        enemy.hit(20);
        enemy.defeat();
        if (enemy.isDead() && enemy.readyToRemove) {
          this.level.enemies.splice(index, 1);
        }
      } else if (this.sharkie.isColliding(enemy)) {
        if (enemy instanceof JellyFish) {
          this.sharkie.lastHitType = "ELECTRO";
          console.log('hit by a jellyfish');
          
        } else {
          this.sharkie.lastHitType = "POISON";
          console.log('hit by a pufferfish');
          
        }
        this.sharkie.hit();
        this.healthbar.renderHealthbar(this.sharkie.health);
      }
    });
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

  deleteBubble() {
    this.bubbles.forEach((bubble, index) => {
      if (bubble.x) this.bubbles.splice(index, 1);
      console.log("delete bubble");
    });
  }
}
