class Healthbar extends Statusbar {
  HEALTH = ["assets/images/4_Marcadores/green/Life/0.png", "assets/images/4_Marcadores/green/Life/20.png", "assets/images/4_Marcadores/green/Life/40.png", "assets/images/4_Marcadores/green/Life/60.png", "assets/images/4_Marcadores/green/Life/80.png", "assets/images/4_Marcadores/green/Life/100.png"];

  constructor() {
    super();
    this.loadImages(this.HEALTH);
    this.y = 0;
    this.healthPercentage = 100;
    this.setPercentage(this.healthPercentage, this.HEALTH);
  }

  renderHealthbar(health){
    this.setPercentage(health, this.HEALTH)
  }
}
