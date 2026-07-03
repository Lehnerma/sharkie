class Bottlebar extends Statusbar {
  BOTTLES = ["assets/images/4_Marcadores/orange/0_poison.png", "assets/images/4_Marcadores/orange/20_poison.png", "assets/images/4_Marcadores/orange/20_poison.png", "assets/images/4_Marcadores/orange/40_poison.png", "assets/images/4_Marcadores/orange/60_poison.png", "assets/images/4_Marcadores/orange/80_ poison.png", "assets/images/4_Marcadores/orange/100_ poison.png"];

  constructor() {
    super();
    this.loadImages(this.BOTTLES);
    this.y = 70;
    this.setPercentage(this.bottleCounter, this.BOTTLES);
  }

  renderBottle(bottle) {
    this.setPercentage(bottle, this.BOTTLES);
  }

  collectBottle() {
    if (this.bottleCounter < 100) {
      this.bottleCounter += 10;
    } else {
      this.bottleCounter = 100;
    }
    this.renderBottle(this.bottleCounter);
  }
}
