class JellyFish extends Enemies {
  MOVES = {
    SWIM: {
      YELLOW: ["assets/images/2.Enemy/2_jellyfish/swim/Yellow 1.png", "assets/images/2.Enemy/2_jellyfish/swim/Yellow 2.png", "assets/images/2.Enemy/2_jellyfish/swim/Yellow 3.png", "assets/images/2.Enemy/2_jellyfish/swim/Yellow 4.png"],

      PURPLE: ["assets/images/2.Enemy/2_jellyfish/swim/Lila 1.png", "assets/images/2.Enemy/2_jellyfish/swim/Lila 2.png", "assets/images/2.Enemy/2_jellyfish/swim/Lila 3.png", "assets/images/2.Enemy/2_jellyfish/swim/Lila 4.png"],

      GREEN: [
        "assets/images/2.Enemy/2_jellyfish/swim/Green 1.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 2.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 3.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 4.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 5.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 6.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 7.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 8.png",
        "assets/images/2.Enemy/2_jellyfish/swim/Green 9.png",
      ],

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

  /**
   * loads the swim and dead frames for this jelly fish's color.
   */
  preloadImages() {
    this.loadImages(this.MOVES.SWIM[this.color]);
    this.loadImages(this.MOVES.DEAD[this.color]);
  }

  /**
   * runs the jelly fish's movement at 60fps: swims left while alive,
   * or floats away once defeated.
   */
  animateJellyfisch() {
    this.animationImages();
    this.setStoppableInterval(() => {
      if (this.world?.isGameEnded) return; // freeze the jellyfish once the game is over or won
      if (this.animationState === "DEAD") {
        this.floatAway(this.MOVES.DEAD[this.color]);
      } else {
        this.x -= this.speedX;
      }
    }, 1000 / 60);
  }

  /**
   * plays the swim or dead frame set matching the current animationState.
   */
  animationImages() {
    this.setStoppableInterval(() => {
      if (this.world?.isGameEnded) return; // stop advancing frames once the game is over or won
      if (this.animationState === "DEAD") {
        this.defeatAnimation(this.MOVES.DEAD[this.color]);
      } else {
        this.animate(this.MOVES.SWIM[this.color]);
      }
    }, 180);
  }

  /**
   * a jelly fish defeated by a bubble plays its dead animation once
   * and then floats out of the screen.
   */
  defeat() {
    if (this.isDefeated) return;
    this.isDefeated = true;
    this.animationState = "DEAD";
    this.defeatFrame = 0;
  }
}
