class Coin extends DrawableObjects {
  COINS = ["assets/images/4_Marcadores/coins/1.png", "assets/images/4_Marcadores/coins/2.png", "assets/images/4_Marcadores/coins/3.png", "assets/images/4_Marcadores/coins/4.png"];

  constructor() {
    super();
    this.loadImage(this.COINS[1]);
    this.width = 40;
    this.height = 40;
    this.x = this.getRandomX();
    this.y = this.getRandomY();
  }


}
