class MoveableObjects extends DrawableObjects{
speedX = 0.15;
speedY = 0.15;
    constructor(){
        super();
    }

    animate(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path]
        this.currentImage++;
    }

    playAnimation(images, frames = 100){
        setInterval(() => {
            this.animate(images)
        }, frames);
    }

    moveRight(){
        this.x += this.speedX;
    }

    moveLeft(){
        this.x -= this.speedX;
    }

    moveUp(){
        this.y -= this.speedY;
    }
    moveDown(){
        this.y += this.speedY;
    }

    movements = {
        RIGHT: ()=> this.moveRight(),
        LEFT: ()=> this.moveLeft(),
        UP: ()=> this.moveUp(),
        DOWN: ()=> this.moveDown()
    }
}