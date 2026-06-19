class Sharkie extends MoveableObjects {
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
  
  LONG_IDLE = [
    "assets/images/1.Sharkie/2.Long_IDLE/i1.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I2.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I3.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I4.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I5.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I6.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I7.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I8.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I9.png",
    "assets/images/1.Sharkie/2.Long_IDLE/I10.pn",
    "assets/images/1.Sharkie/2.Long_IDLE/I11.pn",
    "assets/images/1.Sharkie/2.Long_IDLE/I12.pn",
    "assets/images/1.Sharkie/2.Long_IDLE/I13.pn",
    "assets/images/1.Sharkie/2.Long_IDLE/I14.pn",
  ];

  constructor() {
    super();
    this.loadImage("assets/images/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IDLE);
    this.x = 200;
    this.y = 200;
    this.height = 200;
    this.width = 200;
    this.animateSharkie();
  }

  animateSharkie() {
    setInterval(() => {
      this.animate(this.IDLE);
    }, 100);
  }
}
