class PufferFish extends Enemies {
  MOVES = {
    SWIM: {
      GREEN: ["assets/images/2.Enemy/1_puffer_fish/1_swim/1.swim1.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/1.swim2.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/1.swim3.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/1.swim4.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/1.swim5.png"],
      RED: ["assets/images/2.Enemy/1_puffer_fish/1_swim/2.swim1.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/2.swim2.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/2.swim3.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/2.swim4.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/2.swim5.png"],
      BLUE: ["assets/images/2.Enemy/1_puffer_fish/1_swim/3.swim1.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/3.swim2.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/3.swim3.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/3.swim4.png", "assets/images/2.Enemy/1_puffer_fish/1_swim/3.swim5.png"],
    },
    TRANSITION: {
      GREEN: ["assets/images/2.Enemy/1_puffer_fish/2_transition/1.transition1.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/1.transition2.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/1.transition3.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/1.transition4.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/1.transition5.png"],
      RED: ["assets/images/2.Enemy/1_puffer_fish/2_transition/2.transition1.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/2.transition2.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/2.transition3.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/2.transition4.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/2.transition5.png"],
      BLUE: ["assets/images/2.Enemy/1_puffer_fish/2_transition/3.transition1.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/3.transition2.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/3.transition3.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/3.transition4.png", "assets/images/2.Enemy/1_puffer_fish/2_transition/3.transition5.png"],
    },
    BUBBLE_SWIM: {
      GREEN: ["assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/1.bubbleswim1.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/1.bubbleswim2.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/1.bubbleswim3.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/1.bubbleswim4.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/1.bubbleswim5.png"],
      RED: ["assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/2.bubbleswim1.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/2.bubbleswim2.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/2.bubbleswim3.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/2.bubbleswim4.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/2.bubbleswim5.png"],
      BLUE: ["assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/3.bubbleswim1.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/3.bubbleswim2.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/3.bubbleswim3.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/3.bubbleswim4.png", "assets/images/2.Enemy/1_puffer_fish/3_bubbleeswim/3.bubbleswim5.png"],
    },
    DEAD: {
      GREEN: ["assets/images/2.Enemy/1_puffer_fish/4_die/1_dead1.png", "assets/images/2.Enemy/1_puffer_fish/4_die/1_dead2.png", "assets/images/2.Enemy/1_puffer_fish/4_die/1_dead3.png"],
      RED: ["assets/images/2.Enemy/1_puffer_fish/4_die/2_dead1.png", "assets/images/2.Enemy/1_puffer_fish/4_die/2_dead2.png", "assets/images/2.Enemy/1_puffer_fish/4_die/2_dead3.png"],
      BLUE: ["assets/images/2.Enemy/1_puffer_fish/4_die/3_dead1.png", "assets/images/2.Enemy/1_puffer_fish/4_die/3_dead2.png", "assets/images/2.Enemy/1_puffer_fish/4_die/3_dead3.png"],
    },
  };

  constructor() {
    super();
    this.preloadImages();
    this.colors = {
      1: "GREEN",
      2: "RED",
      3: "BLUE",
    };
    this.color = this.getRandomColor();
    this.loadImage(this.MOVES.SWIM[this.color][0]);
    this.height = 60;
    this.width = 60;
    this.animateFish();
  }

  preloadImages() {
    this.loadImages(this.MOVES.SWIM.GREEN);
    this.loadImages(this.MOVES.SWIM.RED);
    this.loadImages(this.MOVES.SWIM.BLUE);
    this.loadImages(this.MOVES.TRANSITION.GREEN);
    this.loadImages(this.MOVES.TRANSITION.RED);
    this.loadImages(this.MOVES.TRANSITION.BLUE);
    this.loadImages(this.MOVES.BUBBLE_SWIM.GREEN);
    this.loadImages(this.MOVES.BUBBLE_SWIM.RED);
    this.loadImages(this.MOVES.BUBBLE_SWIM.BLUE);
    this.loadImages(this.MOVES.DEAD.GREEN);
    this.loadImages(this.MOVES.DEAD.RED);
    this.loadImages(this.MOVES.DEAD.BLUE);
  }

  animateFish() {
    this.playAnimation(this.MOVES.SWIM[this.color], 180);
    setInterval(() => {
      this.x -= this.speedX;
    }, 1000 / 60);
  }
}
