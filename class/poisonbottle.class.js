class Poisonbottle extends MoveableObjects {
  possibleTypes = ["DARK", "LIGHT", "ANIMATION"];
  direction;
  type;

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
    DARK: {
      LEFT: "assets/images/4_Marcadores/poison/Dark - Left.png",
      RIGHT: "assets/images/4_Marcadores/poison/Dark - Right.png",
    },
    LIGHT: {
      LEFT: "assets/images/4_Marcadores/poison/Light - Left.png",
      RIGHT: "assets/images/4_Marcadores/poison/Light - Right.png",
    },
  };
  constructor() {
    super();
    this.direction = this.rightOrLeft();
    this.getType();
    this.preloadImages();
    this.width = 40;
    this.height = 50;
    this.getRandomCoordinate();
    this.run();
  }

  run(){
    setInterval(() => {
      this.renderBottles()
    }, 150);
  }

  preloadImages() {
    this.loadImages(this.POISON_BOTTLE.ANIMATION);
    this.loadImage(this.POISON_BOTTLE.DARK[this.direction])
  }

  renderBottles() {
    if (this.type == "ANIMATION"){
      this.animate(this.POISON_BOTTLE.ANIMATION);
    } else {
      this.loadImage(this.POISON_BOTTLE[this.type][this.direction])
      this.y = 360
    }
  }

  rightOrLeft() {
    const zeroOrOne = Math.floor(Math.random() * 2);
    if (zeroOrOne === 0) {
      return "LEFT";
    } else {
      return "RIGHT";
    }
  }

  getType() {
    const index = Math.floor(Math.random() * 3);
    this.type = this.possibleTypes[index];
  }
}
