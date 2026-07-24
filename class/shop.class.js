class Shop {
  lastShopBuy = 0;

  /** @param {World} world - the world this shop buys/sells for */
  constructor(world) {
    this.world = world;
  }

  /**
   * reads the shop keys (H = heal, B = buy bottles), rate-limited to once
   * every 5 seconds so holding a key down doesn't drain coins repeatedly.
   */
  checkShopInput() {
    const now = new Date().getTime();
    if (now - this.lastShopBuy < 5000) return;
    if (this.world.keyboard.H) {
      this.buyHeal();
    } else if (this.world.keyboard.B) {
      this.buyBottles();
    }
  }

  /**
   * spends 100 coins to heal sharkie by 50 (capped at 100 health), if he
   * has enough coins and isn't already at full health.
   */
  buyHeal() {
    if (this.world.coinbar.coinCounter >= 99 && this.world.sharkie.health < 100) {
      this.world.coinbar.coinCounter -= 100;

      this.world.coinbar.renderCoinbar(this.world.coinbar.coinCounter);
      this.world.sharkie.health = Math.min(100, this.world.sharkie.health + 50);
      this.world.healthbar.renderHealthbar(this.world.sharkie.health);
      playSound("HEALING");
      this.lastShopBuy = new Date().getTime();
    }
  }

  /**
   * spends 100 coins to buy 50 poison bottle charges (capped at 100), if
   * sharkie has enough coins and isn't already full on bottles.
   */
  buyBottles() {
    if (this.world.coinbar.coinCounter >= 99 && this.world.bottlebar.bottleCounter < 100) {
      this.world.coinbar.coinCounter -= 100;

      this.world.coinbar.renderCoinbar(this.world.coinbar.coinCounter);
      this.world.bottlebar.bottleCounter = Math.min(100, this.world.bottlebar.bottleCounter + 50);
      this.world.bottlebar.renderBottle(this.world.bottlebar.bottleCounter);
      playSound("SHOP_BUYING");
      this.lastShopBuy = new Date().getTime();
    }
  }
}
