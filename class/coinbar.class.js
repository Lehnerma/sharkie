class Coinbar extends Statusbar {
  COIN = ["assets/images/4_Marcadores/green/Coin/0.png", "assets/images/4_Marcadores/green/Coin/20.png", "assets/images/4_Marcadores/green/Coin/40.png", "assets/images/4_Marcadores/green/Coin/60.png", "assets/images/4_Marcadores/green/Coin/80.png", "assets/images/4_Marcadores/green/Coin/100.png"];

  constructor() {
    super();
    this.loadImages(this.COIN);
    this.y = 35;
    this.setPercentage(this.coinCounter, this.COIN);
  }

  /**
   * refreshes the coin bar image to match the current coin count.
   * @param {number} coin - current coin count
   */
  renderCoinbar(coin) {
    this.setPercentage(coin, this.COIN);
  }

  /**
   * adds 10 coins, capped at 100, and refreshes the bar.
   */
  collectCoin() {
    if (this.coinCounter < 100) {
      this.coinCounter += 10;
    } else {
      this.coinCounter = 100;
    }
    this.renderCoinbar(this.coinCounter)
  }
}
