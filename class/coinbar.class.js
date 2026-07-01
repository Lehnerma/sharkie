class Coinbar extends Statusbar {
  COIN = ["assets/images/4_Marcadores/green/Coin/0.png", "assets/images/4_Marcadores/green/Coin/20.png", "assets/images/4_Marcadores/green/Coin/40.png", "assets/images/4_Marcadores/green/Coin/60.png", "assets/images/4_Marcadores/green/Coin/80.png", "assets/images/4_Marcadores/green/Coin/100.png"];

  constructor() {
    super();
    this.loadImages(this.COIN);
    this.y = 45;
    this.setPercentage(this.coinCounter, this.COIN);
  }

  renderCoinbar(coin) {
    this.setPercentage(coin, this.COIN);
  }

  collectCoin() {
    if (this.coinCounter < 100) {
      this.coinCounter += 10;
    } else {
      this.coinCounter = 100;
    }
    this.renderCoinbar(this.coinCounter)
  }
}
