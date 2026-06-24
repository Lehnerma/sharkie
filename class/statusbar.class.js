class Statusbar extends DrawableObjects {
  percentage = 100;

  STATUS = {
    HEALTH: [
      "assets/images/4_Marcadores/green/Life/0.png", //
      "assets/images/4_Marcadores/green/Life/20.png", //
      "assets/images/4_Marcadores/green/Life/40.png", //
      "assets/images/4_Marcadores/green/Life/60.png", //
      "assets/images/4_Marcadores/green/Life/80.png", //
      "assets/images/4_Marcadores/green/Life/100.png", //
    ],

    COIN: [
      "assets/images/4_Marcadores/green/Coin/0.png", //
      "assets/images/4_Marcadores/green/Coin/20.png", //
      "assets/images/4_Marcadores/green/Coin/40.png", //
      "assets/images/4_Marcadores/green/Coin/60.png", //
      "assets/images/4_Marcadores/green/Coin/80.png", //
      "assets/images/4_Marcadores/green/Coin/100.png", //
    ],

    POISION_BUBBLES: [
      "assets/images/4_Marcadores/green/poisoned_bubbles/0.png", //
      "assets/images/4_Marcadores/green/poisoned_bubbles/20.png", //
      "assets/images/4_Marcadores/green/poisoned_bubbles/40.png", //
      "assets/images/4_Marcadores/green/poisoned_bubbles/60.png", //
      "assets/images/4_Marcadores/green/poisoned_bubbles/80.png", //
      "assets/images/4_Marcadores/green/poisoned_bubbles/100.png", //
    ],
  };

  constructor() {
    super();
    this.x = 10;
    this.y = 10;
    this.width = 180;
    this.height = 50;
    this.loadImages(this.STATUS.HEALTH);
    this.healthPercentage = 100;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.healthPercentage = percentage;
    let path = this.STATUS.HEALTH[this.getImageIndex()];
    this.img = this.imgCache[path];
  }

  getImageIndex() {
    if (this.healthPercentage == 100) {
      return 5;
    } else if (this.healthPercentage >= 80) {
      return 4;
    } else if (this.healthPercentage >= 60) {
      return 3;
    } else if (this.healthPercentage >= 40) {
      return 2;
    } else if (this.healthPercentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
