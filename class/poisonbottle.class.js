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
  /** spawns a poison bottle at a random position with a random type and facing. */
  constructor() {
    super();
    this.direction = this.rightOrLeft();
    this.getType();
    this.preloadImages();
    this.width = 40;
    this.height = 50;
    this.x = this.getRandomX(this.worldBeginX, this.worldEndX);
    this.y = this.getRandomY();
    this.run();
  }

  /**
   * starts the render loop that keeps the bottle's frame/position up to date.
   */
  run() {
    this.setStoppableInterval(() => {
      this.renderBottles();
    }, 150);
  }

  /**
   * loads every bottle image and sets the starting frame for this bottle's
   * type; the animated type always needs the full frame set, a static
   * type only needs its single left/right image.
   */
  preloadImages() {
    this.loadImages(this.POISON_BOTTLE.ANIMATION);
    if (this.type === "ANIMATION") {
      this.img = this.imgCache[this.POISON_BOTTLE.ANIMATION[0]];
    } else {
      this.loadImages([this.POISON_BOTTLE[this.type][this.direction]]);
      this.img = this.imgCache[this.POISON_BOTTLE[this.type][this.direction]];
    }
  }

  /**
   * plays the frame animation for an animated bottle, or drops a static
   * bottle to the sea floor (y = 360) and shows its fixed image.
   */
  renderBottles() {
    if (this.type == "ANIMATION") {
      this.animate(this.POISON_BOTTLE.ANIMATION);
    } else {
      this.img = this.imgCache[this.POISON_BOTTLE[this.type][this.direction]];
      this.y = 360;
    }
  }

  /**
   * picks a random facing direction for a static bottle image.
   * @returns {string} "LEFT" or "RIGHT"
   */
  rightOrLeft() {
    const zeroOrOne = Math.floor(Math.random() * 2);
    if (zeroOrOne === 0) {
      return "LEFT";
    } else {
      return "RIGHT";
    }
  }

  /**
   * picks a random bottle type from possibleTypes and stores it on the instance.
   */
  getType() {
    const index = Math.floor(Math.random() * 3);
    this.type = this.possibleTypes[index];
  }
}
