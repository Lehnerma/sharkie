class JellyFish extends Enemies {
  JELLYFISH = {
    YELLOW: ["assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"],

    PURPLE: ["assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png", "assets/images/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"],

    GREEN: ["assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png", "assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Green 2.png", "assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Green 3.png", "assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Green 4.png"],

    PINK: ["assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 1.png", "assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 2.png", "assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 3.png", "assets/images/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 4.png"],
  };

  constructor(color = JellyFish.getRandomColor()) {
    super();

    this.speedX = Math.random() * 2;
    this.loadImage(this.JELLYFISH[color][0]);
    this.loadImages(this.JELLYFISH[color]);
    this.animateJellyfisch(color);
  }

  animateJellyfisch(color) {
    this.playAnimation(this.JELLYFISH[color], 180);
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }

  static getRandomColor() {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    const colors = {
      1: "YELLOW",
      2: "PURPLE",
      3: "GREEN",
      4: "PINK",
    };
    return colors[randomNumber];
  }
}
