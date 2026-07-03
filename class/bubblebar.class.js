class Bottlebar extends Statusbar {
  BOTTLES = ["assets/images/4_Marcadores/green/poisoned_bubbles/0.png", "assets/images/4_Marcadores/green/poisoned_bubbles/20.png", "assets/images/4_Marcadores/green/poisoned_bubbles/40.png", "assets/images/4_Marcadores/green/poisoned_bubbles/60.png", "assets/images/4_Marcadores/green/poisoned_bubbles/80.png", "assets/images/4_Marcadores/green/poisoned_bubbles/100.png"];

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
