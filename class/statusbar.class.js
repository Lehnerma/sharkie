class Statusbar extends DrawableObjects {
  healthPercentage;


  constructor() {
    super();
    this.x = 10;
    this.y = 10;
    this.width = 180;
    this.height = 50;

  }



  setPercentage(percentage, images) {
    let path = images[this.getImageIndex(percentage)];
    this.img = this.imgCache[path];
  }

  /**
   * checks the percentage and returns the right index for render the status bar.
   * @returns Number from 0 to 5 for the right index of the statusbars
   */
  getImageIndex(percentage) {
    if (percentage == 100) {
      return 5;
    } else if (percentage >= 80) {
      return 4;
    } else if (percentage >= 60) {
      return 3;
    } else if (percentage >= 40) {
      return 2;
    } else if (percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
