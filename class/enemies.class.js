class Enemies extends MoveableObjects {
    colors;

  constructor() {
    super();
    this.x = 800 + Math.random() * 2000;
    this.y = 10 + Math.random() * 360;
    this.height = 80;
    this.width = 80;
  }
}
