class Enemies extends MoveableObjects {
  color;
  colors = {};
  defeatFrame = 0;
  readyToRemove = false;
  isDefeated = false;
  canDirectHit;
  world; // over this we can get the information about sharkie. 
  animationState = "SWIM";
  animationFrame = 0;

  constructor() {
    super();
    this.x = this.getRandomX(720, 4000);
    this.y = this.getRandomY();
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
