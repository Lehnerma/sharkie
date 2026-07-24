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
  renderer;
  collisions;
  world_end = 3700;

  coinReplenishing = false;
  bottleReplenishing = false;
  gameOver = false;
  gameWon = false;
  paused = false;
  worldBeginX = -700;
  worldEndX = 3600;

  /**
   * @param {HTMLCanvasElement} canvas - canvas element to render into
   * @param {Keyboard} keyboard - shared keyboard state to read input from
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.setWorld();
    this.renderer.draw();
    this.helperFunction();
    this.addElementsToWorld();
  }

  /**
   * gives sharkie, every enemy and the endboss a back-reference to this
   * world, so they can read game state (keyboard, isGameEnded, sharkie's
   * position) without the world passing it in on every call. also sets up
   * the shop, renderer and collision-check collaborators.
   */
  setWorld() {
    this.sharkie.world = this;
    this.shop = new Shop(this);
    this.renderer = new WorldRenderer(this);
    this.collisions = new WorldCollisions(this);
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.endboss.forEach((boss) => {
      boss.world = this;
    });
  }

  /**
   * runs every game-logic check (collisions, pickups, shop input, game
   * over) on a shared interval, frozen entirely once the game has ended.
   */
  helperFunction() {
    this.helperInterval = setInterval(() => {
      if (this.isFrozen) return;
      this.collisions.checkEnemyCollision();
      this.collisions.checkEndbossCollision();
      this.collisions.checkBubbleCollision();
      this.collisions.removeBubbles();
      this.collisions.checkCoinCollision();
      this.collisions.checkPoisonBottleCollision();
      this.shop.checkShopInput();
      this.collisions.checkEnemyBoundary();
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
