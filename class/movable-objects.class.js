class MoveableObjects extends DrawableObjects{

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
}