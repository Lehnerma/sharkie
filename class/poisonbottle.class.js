class Poisonbottle extends DrawableObjects {
  POISON_BOTTLE = {
    ANIMATION: [
      "assets/images/4_Marcadores/poison/Animada/1.png",
      "assets/images/4_Marcadores/poison/Animada/2.png",
      "assets/images/4_Marcadores/poison/Animada/3.png",
      "assets/images/4_Marcadores/poison/Animada/4.png",
      "assets/images/4_Marcadores/poison/Animada/5.png",
      "assets/images/4_Marcadores/poison/Animada/6.png",
      "assets/images/4_Marcadores/poison/Animada/7.png",
      "assets/images/4_Marcadores/poison/Animada/8.png",
    ],
    DARK: ["assets/images/4_Marcadores/poison/Dark - Left.png", "assets/images/4_Marcadores/poison/Dark - Right.png"],
    LIGHT: ["assets/images/4_Marcadores/poison/Light - Left.png", "assets/images/4_Marcadores/poison/Light - Right.png"],
  };
  constructor(type) {
    super();
    this.preloadImages();
    this.loadImage(this.POISON_BOTTLE.DARK[0]);

    this.width = 40;
    this.height = 50;
    this.getRandomCoordinate();
    this.run(type);
  }

  run(type) {
    setInterval(() => {
      this.animate(this.getImages(type));
    }, 250);
  }

  preloadImages() {
    this.loadImages(this.POISON_BOTTLE.ANIMATION);
    this.loadImages(this.POISON_BOTTLE.DARK);
    this.loadImages(this.POISON_BOTTLE.LIGHT);
  }

  getImages(bottle) {
    if (bottle == "dark") {
      this.y = 360;
      return this.POISON_BOTTLE.DARK;
    } else if (bottle == "light") {
      this.y = 360;
      return this.POISON_BOTTLE.LIGHT[this.zeroOrOne()];
    } else {
      return this.POISON_BOTTLE.ANIMATION[this.zeroOrOne()];
    }
  }

  zeroOrOne() {
    return Math.round(Math.random);
  }
}
