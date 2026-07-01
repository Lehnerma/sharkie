class Bubblebar extends Statusbar {
  BUBBLES = ["assets/images/4_Marcadores/green/poisoned_bubbles/0.png", "assets/images/4_Marcadores/green/poisoned_bubbles/20.png", "assets/images/4_Marcadores/green/poisoned_bubbles/40.png", "assets/images/4_Marcadores/green/poisoned_bubbles/60.png", "assets/images/4_Marcadores/green/poisoned_bubbles/80.png", "assets/images/4_Marcadores/green/poisoned_bubbles/100.png"];

  constructor() {
    super();
    this.loadImages(this.BUBBLES);
    this.y = 85;
    this.setPercentage(this.poisonCounter, this.BUBBLES);
  }

  renderBubble(bubble) {
    this.setPercentage(bubble, this.BUBBLES);
  }
}
