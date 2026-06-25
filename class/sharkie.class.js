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

  DEAD = {
    POISON: [
      "assets/images/1.Sharkie/6.dead/1.Poisoned/1.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/2.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/3.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/4.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/5.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/6.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/7.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/8.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/9.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/10.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/11.png",
      "assets/images/1.Sharkie/6.dead/1.Poisoned/12.png",
    ],
    ELECTRO: [
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/1.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/2.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/3.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/4.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/5.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/6.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/7.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/8.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/9.png",
      "assets/images/1.Sharkie/6.dead/2.Electro_shock/10.png",
    ],
  };

  HURT = {
    POISON: ["assets/images/1.Sharkie/5.Hurt/1.Poisoned/1.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/2.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/3.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/4.png", "assets/images/1.Sharkie/5.Hurt/1.Poisoned/5.png"],
    ELECTRO: [
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/3.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/3.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/1.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/2.png",
      "assets/images/1.Sharkie/5.Hurt/2.Electric shock/3.png",
    ],
  };

  SWIM = {
    SWIM_1: ["assets/images/1.Sharkie/3.Swim/1.png", "assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/4.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"],

    SWIM_2: ["assets/images/1.Sharkie/3.Swim/1.png", "assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"],

    SWIM_3: ["assets/images/1.Sharkie/3.Swim/2.png", "assets/images/1.Sharkie/3.Swim/3.png", "assets/images/1.Sharkie/3.Swim/5.png", "assets/images/1.Sharkie/3.Swim/6.png"],
  };

  ATTACK = {
    FIN_SLAP: [
      "assets/images/1.Sharkie/4.Attack/fin_slap/1.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/2.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/3.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/4.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/5.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/6.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/7.png",
      "assets/images/1.Sharkie/4.Attack/fin_slap/8.png",
    ],
    BUBBLE: [
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/1.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/2.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/3.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/4.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/5.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/6.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/7.png",
      "assets/images/1.Sharkie/4.Attack/bubble_trap/op1/8.png",
    ],
  };

  constructor() {
    super();
    this.loadImage("assets/images/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IDLE);
    this.loadImages(this.LONG_IDLE_INTRO);
    this.loadImages(this.LONG_IDLE_SLEEP);
    this.loadImages(this.DEAD.ELECTRO);
    this.loadImages(this.DEAD.POISON);
    this.loadImages(this.HURT.ELECTRO);
    this.loadImages(this.SWIM.SWIM_1);
    this.loadImages(this.SWIM.SWIM_3);
    this.loadImages(this.ATTACK.FIN_SLAP);
    this.x = 200;
    this.y = 200;
    this.height = 200;
    this.width = 200;
    this.speedX = 5;
    this.speedY = 3;
    this.levelBoundary.left = -1310;
    this.levelBoundary.right = 2200;
    this.levelBoundary.top = -90;
    this.levelBoundary.bottom = 290;

    this.collisionOffset.top = 90;
    this.collisionOffset.bottom = 40;
    this.collisionOffset.right = 40;
    this.collisionOffset.left = 40;

    this.health = 100;

    this.lastMove = new Date().getTime();
    this.applyGravity();
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
      if (this.isDead()) {
        this.animate(this.DEAD.POISON);
      } else if (this.isHurt()) {
        this.animate(this.HURT.ELECTRO);
      } else if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
        this.animate(this.SWIM.SWIM_1);
      } else if (this.world.keyboard.LEFT) {
        this.animate(this.SWIM.SWIM_3);
        this.otherDirection = true;
      } else if (this.world.keyboard.RIGHT) {
        this.animate(this.SWIM.SWIM_3);
        this.otherDirection = false;
      } else if (this.world.keyboard.SPACE) {
        this.animate(this.ATTACK.FIN_SLAP);
      } else if (this.timePassed(10)) {
        this.playLongIdle();
      } else {
        this.animate(this.IDLE);
      }
    }, 200);
  }

  playLongIdle() {
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
