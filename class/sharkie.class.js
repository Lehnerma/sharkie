class Sharkie extends MoveableObjects {
  world;
  isSleeping;

  IDLE = [
    "assets/images/1.Sharkie/1.IDLE/1.png",
    "assets/images/1.Sharkie/1.IDLE/2.png",
    "assets/images/1.Sharkie/1.IDLE/3.png",
    "assets/images/1.Sharkie/1.IDLE/4.png",
    "assets/images/1.Sharkie/1.IDLE/5.png",
    "assets/images/1.Sharkie/1.IDLE/6.png",
    "assets/images/1.Sharkie/1.IDLE/7.png",
    "assets/images/1.Sharkie/1.IDLE/8.png",
    "assets/images/1.Sharkie/1.IDLE/9.png",
    "assets/images/1.Sharkie/1.IDLE/10.png",
    "assets/images/1.Sharkie/1.IDLE/11.png",
    "assets/images/1.Sharkie/1.IDLE/12.png",
    "assets/images/1.Sharkie/1.IDLE/13.png",
    "assets/images/1.Sharkie/1.IDLE/14.png",
    "assets/images/1.Sharkie/1.IDLE/15.png",
    "assets/images/1.Sharkie/1.IDLE/16.png",
    "assets/images/1.Sharkie/1.IDLE/17.png",
    "assets/images/1.Sharkie/1.IDLE/18.png",
  ];

  LONG_IDLE_INTRO = [
    "assets/images/1.Sharkie/2.Long_IDLE/i1.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I2.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I3.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I4.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I5.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I6.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I7.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I8.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I9.png",
  ];

  LONG_IDLE_SLEEP = ["assets/images/1.Sharkie/2.Long_IDLE/I10.png", "assets/images/1.Sharkie/2.Long_IDLE/I11.png", "assets/images/1.Sharkie/2.Long_IDLE/I12.png", "assets/images/1.Sharkie/2.Long_IDLE/I13.png", "assets/images/1.Sharkie/2.Long_IDLE/I14.png"];

  SWIM_1 = ["assets/images/1.Sharkie/3.Swim/1.png", "assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/4.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"];

  SWIM_2 = ["assets/images/1.Sharkie/3.Swim/1.png", "assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"];

  SWIM_3 = ["assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"];

  constructor() {
    super();
    this.loadImage("assets/images/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IDLE);
    this.loadImages(this.LONG_IDLE_INTRO);
    this.loadImages(this.LONG_IDLE_SLEEP);
    this.loadImages(this.SWIM_1);
    this.loadImages(this.SWIM_3);
    this.x = 200;
    this.y = 200;
    this.height = 250;
    this.width = 250;
    this.speedX = 5;
    this.speedY = 3;
    this.levelBoundaryLeft = -1310;
    this.levelBoundaryRight = 2200;
    this.levelBoundaryUp = -110;
    this.levelBoundaryDown = 230;
    this.lastMove = new Date().getTime();
    this.animateSharkie();
  }

  animateSharkie() {
    setInterval(() => {
      for (let key in this.movements) {
        if (this.world.keyboard[key]) {
          this.movements[key]();
        }
      }
      this.world.camera_x = -this.x + 100; // distanz for the camera
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
        this.animate(this.SWIM_1);
      } else if (this.world.keyboard.LEFT) {
        this.animate(this.SWIM_3);
        this.otherDirection = true;
      } else if (this.world.keyboard.RIGHT) {
        this.animate(this.SWIM_3);
        this.otherDirection = false;
      } else if (this.timePassed(5)) {
        this.playIdle();
      } else {
        this.animate(this.IDLE);
      }
    }, 200);
  }

  playIdle() {
    if (this.currentImage <= this.LONG_IDLE_INTRO) {
      this.animate(this.LONG_IDLE_INTRO);
    } else {
      this.animate(this.LONG_IDLE_SLEEP);
    }
  }

  moveDirection() {
    for (let key in this.movements) {
      if (this.world.keyboard[key]) {
        this.movements[key]();
      }
    }
  }
}
