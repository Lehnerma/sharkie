class JellyFish extends MoveableObjects {
  JELLYFISH = {
    YELLOW: ["assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"],

    PURPLE: ["assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"],

    GREEN: ["assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 2.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 3.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 4.png"],

    PINK: ["assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 1.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 2.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 3.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 4.png"],
  };
  constructor() {
    super();
    this.x = 400;
    this.y = 200;
    this.height = 150;
    this.width = 150;
    this.loadImage(this.JELLYFISH.PURPLE[0])
    this.loadImages(this.JELLYFISH.PURPLE);
    this.animateJellyfisch();
  }

  animateJellyfisch() {
    this.playAnimation(this.JELLYFISH.PURPLE, 180);
  }
}
