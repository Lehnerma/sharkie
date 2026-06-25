class Enemies extends MoveableObjects {
  color;
  colors = {};

  constructor() {
    super();
    this.x = 800 + Math.random() * 2000;
    this.y = 10 + Math.random() * 360;
    this.speedX = Math.random() * 2;

  }

  getRandomColor() {
    const length = Object.keys(this.colors).length
    const randomNumber = Math.floor(Math.random() * length) + 1;
    const colors = this.colors;
    return colors[randomNumber];
  }
}
