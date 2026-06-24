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
    this.loadImages(this.STATUS.HEALTH);
    this.healthPercentage = 100
  }

  getImageIndex() {
    if (this.healthPercentage == 100) {
      return 5;
    }
  }
}
