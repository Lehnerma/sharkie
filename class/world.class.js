class World {
  canvas;
  keyboard;
  ctx;
  level;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = Level.createLevel(canvas.width, canvas.height, level1Data);
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.level.background_objects);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addToMap(mo) {
    mo.drawObject(this.ctx);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
}
