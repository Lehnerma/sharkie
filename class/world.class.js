class World {
  canvas;
  sharkie = new Sharkie();
  bubbles = [new Bubble()];
  coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
  keyboard;
  ctx;
  level = level1;
  cameraX;
  healthbar = new Healthbar();
  coinbar = new Coinbar();
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
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthbar);
    this.addToMap(this.coinbar);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  helperFunction() {
    setInterval(() => {
      this.checkCollision();
      // this.checkShootBubble();
      this.checkCoinCollision();
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

  // mirrors the image to the other direction witch the bool value from this.otherDirection
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); 
    this.ctx.scale(-1, 1); 
    mo.x = mo.x * -1;
  }

  // set the image to the normal direction back.
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  checkCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.sharkie.isColliding(enemy) && this.sharkie.isAttacking && !enemy.isDefeated && enemy.canDirectHit) {
        enemy.hit(20);
        enemy.defeat();
        if (enemy.isDead() && enemy.readyToRemove) {
          this.level.enemies.splice(index, 1);
        }
      } else if (this.sharkie.isColliding(enemy)) {
        this.sharkie.hit();
        this.healthbar.renderHealthbar(this.sharkie.health);
      }
    });
  }

  checkCoinCollision() {
    this.coins.forEach((coin, index) => {
      if (this.sharkie.isColliding(coin) && this.coinbar.coinCounter < 100) {
        this.coinbar.collectCoin();
        console.log(this.coinbar.coinCounter);
        this.coins.splice(index, 1);
      }
    });
  }
}
