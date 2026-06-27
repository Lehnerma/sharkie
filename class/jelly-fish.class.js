class JellyFish extends Enemies {
  MOVES = {
    SWIM: {
      YELLOW: ["assets/images/2.Enemy/2_jellyfish/swim/Yellow 1.png", "assets/images/2.Enemy/2_jellyfish/swim/Yellow 2.png", "assets/images/2.Enemy/2_jellyfish/swim/Yellow 3.png", "assets/images/2.Enemy/2_jellyfish/swim/Yellow 4.png"],

      PURPLE: ["assets/images/2.Enemy/2_jellyfish/swim/Lila 1.png", "assets/images/2.Enemy/2_jellyfish/swim/Lila 2.png", "assets/images/2.Enemy/2_jellyfish/swim/Lila 3.png", "assets/images/2.Enemy/2_jellyfish/swim/Lila 4.png"],

      GREEN: ["assets/images/2.Enemy/2_jellyfish/swim/Green 1.png", "assets/images/2.Enemy/2_jellyfish/swim/Green 2.png", "assets/images/2.Enemy/2_jellyfish/swim/Green 3.png", "assets/images/2.Enemy/2_jellyfish/swim/green4.png"],

      PINK: ["assets/images/2.Enemy/2_jellyfish/swim/Pink 1.png", "assets/images/2.Enemy/2_jellyfish/swim/Pink 2.png", "assets/images/2.Enemy/2_jellyfish/swim/Pink 3.png", "assets/images/2.Enemy/2_jellyfish/swim/Pink 4.png"],
    },
    DEAD: {
      YELLOW: ["assets/images/2.Enemy/2_jellyfish/dead/yellow/y1.png", "assets/images/2.Enemy/2_jellyfish/dead/yellow/y2.png", "assets/images/2.Enemy/2_jellyfish/dead/yellow/y3.png", "assets/images/2.Enemy/2_jellyfish/dead/yellow/y4.png"],

      PURPLE: ["assets/images/2.Enemy/2_jellyfish/dead/lila/L1.png", "assets/images/2.Enemy/2_jellyfish/dead/lila/L2.png", "assets/images/2.Enemy/2_jellyfish/dead/lila/L3.png", "assets/images/2.Enemy/2_jellyfish/dead/lila/L4.png"],

      GREEN: ["assets/images/2.Enemy/2_jellyfish/dead/green/g1.png", "assets/images/2.Enemy/2_jellyfish/dead/green/g2.png", "assets/images/2.Enemy/2_jellyfish/dead/green/g3.png", "assets/images/2.Enemy/2_jellyfish/dead/green/g4.png"],

      PINK: ["assets/images/2.Enemy/2_jellyfish/dead/pink/P1.png", "assets/images/2.Enemy/2_jellyfish/dead/pink/P2.png", "assets/images/2.Enemy/2_jellyfish/dead/pink/P3.png", "assets/images/2.Enemy/2_jellyfish/dead/pink/P4.png"],
    },
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
    this.canDirectHit = false;
    this.loadImage(this.MOVES.SWIM[this.color][0]);
    this.preloadImages();
    this.animateJellyfisch();
  }

  preloadImages() {
    this.loadImages(this.MOVES.SWIM[this.color]);
    this.loadImages(this.MOVES.DEAD[this.color]);
  }

  animateJellyfisch() {
    this.playAnimation(this.MOVES.SWIM[this.color], 180);
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }

  defeat() {
    this.defeatAnimation(this.MOVES.DEAD[this.color]);
  }
}
