class World{
    canvas;
    keyboard;
    ctx;
    level = level1;

    constructor(canvas, keyboard){
        this.canvas = canvas; // to get information from the canvans
        this.ctx = canvas.getContext("2d"); // get the coordinate system of the canvas. 
        this.keyboard = keyboard // set the variables for the btn by clicking to the an by relese to false back.
        this.draw();
    }

    draw(){
        
    }

  addToMap(mo) {
    // if (mo.otherDirection) {
    //   this.flipImage(mo);
    // }
    mo.draw(this.ctx);
    // mo.drawBorderCollision(this.ctx);
    // if (mo.otherDirection) {
    //   this.flipImageBack(mo);
    // }
  }

  addObjectsToMap(objects){
    objects.forEach( o => {
        this.addToMap(o)
    });
  }
}