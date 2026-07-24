/**
 * draws the world onto its canvas: world-space objects (shifted by the
 * camera) plus the screen-fixed UI, then schedules the next frame.
 */
class WorldRenderer {
  world;

  /** @param {World} world - the world to render */
  constructor(world) {
    this.world = world;
  }

  /** renders one frame and schedules the next one via requestAnimationFrame. */
  draw() {
    const { ctx, canvas } = this.world;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawWorldObjects();
    this.drawUI();
    this.world.animationFrame = requestAnimationFrame(() => this.draw());
  }

  /**
   * draws everything that lives in world space (shifted by the camera):
   * backgrounds, sharkie, the endboss, enemies and collectibles.
   */
  drawWorldObjects() {
    const { ctx, camera_x, level, sharkie, coins, bottles, bubbles } = this.world;
    ctx.translate(camera_x, 0);
    this.addObjectsToMap(level.backgrounds);
    this.addToMap(sharkie);
    this.addEndbossToMap();
    this.addObjectsToMap(level.enemies);
    this.addObjectsToMap(coins);
    this.addObjectsToMap(bottles);
    this.addObjectsToMap(bubbles);
    ctx.translate(-camera_x, 0);
  }

  /** draws the screen-fixed UI: the status bars, boss bar and end screen. */
  drawUI() {
    this.addToMap(this.world.healthbar);
    this.addToMap(this.world.coinbar);
    this.addToMap(this.world.bottlebar);
    this.drawEndbossbar();
    if (this.world.isGameEnded) {
      this.addToMap(this.world.endscreen);
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
    mo.drawObject(this.world.ctx);
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
    this.world.level.endboss.forEach((boss) => {
      if (boss.hasIntroduced) this.addToMap(boss);
    });
  }

  /**
   * draws the screen-fixed boss healthbar once the endboss has appeared and is
   * still alive, mirroring the boss's current health.
   */
  drawEndbossbar() {
    this.world.level.endboss.forEach((boss) => {
      if (boss.hasIntroduced && !boss.isDefeated) {
        this.world.endbossbar.setHealth(boss.health);
        this.addToMap(this.world.endbossbar);
      }
    });
  }

  /**
   * mirrors the canvas horizontally around the object so its next draw
   * call renders facing the opposite way; must be paired with flipImageBack().
   * @param {DrawableObjects} mo - the object about to be drawn flipped
   */
  flipImage(mo) {
    this.world.ctx.save();
    this.world.ctx.translate(mo.width, 0);
    this.world.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * undoes flipImage()'s canvas mirroring after the object has been drawn.
   * @param {DrawableObjects} mo - the object that was just drawn flipped
   */
  flipImageBack(mo) {
    this.world.ctx.restore();
    mo.x = mo.x * -1;
  }
}
