class JellyFish extends Enemies {
  JELLYFISH = {
    YELLOW: ["assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"],

    PURPLE: ["assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"],

    GREEN: ["assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 2.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 3.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Green 4.png"],

    PINK: ["assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 1.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 2.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 3.png", "assets/images/2.Enemy/2 Jelly fish/Super dangerous/Pink 4.png"],
  };

  constructor() {
    super();
    this.colors = {
      1: "YELLOW",
      2: "PURPLE",
      3: "GREEN",
      4: "PINK",
    };
    this.color = this.getRandomColor();
    this.height = 80;
    this.width = 80;
    this.loadImage(this.JELLYFISH[this.color][0]);
    this.loadImages(this.JELLYFISH[this.color]);
    this.animateJellyfisch();
  }

  animateJellyfisch() {
    this.playAnimation(this.JELLYFISH[this.color], 180);
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }
}
