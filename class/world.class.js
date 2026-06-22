class World {
  canvas;
  sharkie = new Sharkie();
  keyboard;
  ctx;
  level;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = Level.createLevel(canvas.width, canvas.height, level1Data);
    this.setWorld();
    this.draw();
  }

  /**
   * connects sharky with this.world class that we can use all the variables in the class sharkie, spezial for the keyboard
   */
  setWorld() {
    this.sharkie.world = this;
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.level.background_objects);
    this.addToMap(this.sharkie);
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawObject(this.ctx);
    // mo.drawBorderCollision(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // mirrors the image to the other direction witch the bool value from this.otherDirection
  flipImage(mo) {
    this.ctx.save(); // speichert den ctx damit wir wieder auf den ursprunglichen zuruckgreifen konnen.
    this.ctx.translate(mo.width, 0); // beim drehen wird die width des bildes abgezogen das es sich auf den stand dreht.
    this.ctx.scale(-1, 1); // die eigentliche spiegelung.
    mo.x = mo.x * -1;
  }

  // set the image to the normal direction back.
  flipImageBack(mo) {
    this.ctx.restore(); // wir stellen den ctx wieder her den wir vorher gespeichert haben.
    mo.x = mo.x * -1;
  }
}
