/**
 * checks every collision-driven interaction in the world: sharkie vs.
 * enemies/endboss/collectibles and bubbles vs. enemies/endboss.
 */
class WorldCollisions {
  world;

  /** @param {World} world - the world to check collisions in */
  constructor(world) {
    this.world = world;
  }

  /**
   * for every enemy: removes it once it's ready, kills it via a fin slap
   * if sharkie is attacking and it allows direct hits, or otherwise hurts
   * sharkie on plain body contact (unless the enemy is already dying).
   */
  checkEnemyCollision() {
    this.world.level.enemies.forEach((enemy, index) => {
      if (enemy.readyToRemove) {
        this.world.level.enemies.splice(index, 1);
      } else if (this.canSlapKill(enemy)) {
        enemy.markSlapKill();
      } else if (this.world.sharkie.isColliding(enemy) && !enemy.isDefeated && !enemy.pendingDeath) {
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
    const sharkie = this.world.sharkie;
    return sharkie.isColliding(enemy) && sharkie.isAttacking && enemy.canDirectHit && !enemy.isDefeated;
  }

  /**
   * hurts sharkie on plain body contact with an enemy and plays the matching
   * hit sound (only on a fresh hit), then refreshes the healthbar.
   * @param {Enemies} enemy - the enemy sharkie collided with
   */
  hurtSharkieByEnemy(enemy) {
    const sharkie = this.world.sharkie;
    const wasHurt = sharkie.isHurt();
    this.getLastHitTypeSharkie(enemy);
    sharkie.hit();
    if (!wasHurt && sharkie.lastHitType === "ELECTRO") {
      playSound("ELECTRIC_HIT");
    } else if (!wasHurt && sharkie.lastHitType === "POISON") {
      playSound("POISON_HIT_SHARKIE");
    }
    this.world.healthbar.renderHealthbar(sharkie.health);
  }

  /**
   * hurts sharkie while he is in direct body contact with an introduced,
   * still-living endboss.
   */
  checkEndbossCollision() {
    this.world.level.endboss.forEach((boss) => {
      if (boss.hasIntroduced && !boss.isDefeated && this.world.sharkie.isColliding(boss)) {
        this.world.sharkie.lastHitType = "POISON";
        this.world.sharkie.hit(20);
        this.world.healthbar.renderHealthbar(this.world.sharkie.health);
      }
    });
  }

  /**
   * checks whether any active bubble collides with an enemy.
   * on a hit the enemy reacts via hitByBubble() and the bubble is removed.
   */
  checkBubbleCollision() {
    this.world.bubbles.forEach((bubble) => {
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
    this.world.level.enemies.forEach((enemy) => {
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
    this.world.level.endboss.forEach((boss) => {
      if (!boss.isDefeated && bubble.isColliding(boss) && bubble.poison) {
        boss.hitByBubble();
        playSound("ENEMY_HIT");
        bubble.readyToRemove = true;
      }
    });
  }

  /** removes bubbles that have hit an enemy or travelled too far. */
  removeBubbles() {
    this.world.bubbles = this.world.bubbles.filter((bubble) => !bubble.readyToRemove);
  }

  /**
   * picks which hurt/dead animation sharkie should play based on the enemy
   * that hit him: jelly fish shock him, everything else poisons him.
   * @param {Enemies} enemy - the enemy sharkie just collided with
   */
  getLastHitTypeSharkie(enemy) {
    if (enemy instanceof JellyFish) {
      this.world.sharkie.lastHitType = "ELECTRO";
    } else {
      this.world.sharkie.lastHitType = "POISON";
    }
  }

  /** collects a coin sharkie touches, as long as the coin bar isn't already full. */
  checkCoinCollision() {
    this.world.coins.forEach((coin, index) => {
      if (this.world.sharkie.isColliding(coin) && this.world.coinbar.coinCounter < 100) {
        this.world.coinbar.collectCoin();
        playSound("COIN_COLLECT");
        this.world.coins.splice(index, 1);
      }
    });
  }

  /**
   * collects a poison bottle sharkie touches, as long as the bottle bar
   * isn't already full.
   */
  checkPoisonBottleCollision() {
    this.world.bottles.forEach((bottle, index) => {
      if (this.world.sharkie.isColliding(bottle) && this.world.bottlebar.bottleCounter < 100) {
        this.world.bottlebar.collectBottle();
        playSound("BOTTLE_COLLECT");
        this.world.bottles.splice(index, 1);
      }
    });
  }

  /**
   * wraps an enemy that drifted past the world's left edge back around to
   * the right edge with a fresh random height, so enemies loop endlessly.
   */
  checkEnemyBoundary() {
    this.world.level.enemies.forEach((enemy) => {
      if (enemy.x < this.world.worldBeginX) {
        enemy.x = this.world.worldEndX + 800;
        enemy.y = enemy.getRandomY();
      }
    });
  }
}
