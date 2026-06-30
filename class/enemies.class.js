class Enemies extends MoveableObjects {
  color;
  colors = {};
  defeatFrame = 0;
  readyToRemove = false;
  isDefeated = false;
  canDirectHit;
  world; // zugriff auf die komplette welt das ich sachen abfragen kann zb. Sharkie
  animationState = "SWIM";
  animationFrame = 0;

  constructor() {
    super();
    this.x = 800 + Math.random() * 3600;
    this.y = 10 + Math.random() * 360;
    this.speedX = Math.random() * 2;
    this.health = 15;
  }

  getRandomColor() {
    const length = Object.keys(this.colors).length;
    const randomNumber = Math.floor(Math.random() * length) + 1;
    const colors = this.colors;
    return colors[randomNumber];
  }

  defeatAnimation(images) {
    let path = images[this.defeatFrame];
    this.setTimestamp();
    this.img = this.imgCache[path];
    if (this.defeatFrame < images.length - 1) {
      this.defeatFrame++;
    } else {
      this.readyToRemove = true;
      this.isDefeated = true;
      this.defeatFrame = 0;
    }
  }
}
