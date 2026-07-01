class Statusbar extends DrawableObjects {
  healthPercentage;

  constructor() {
    super();
    this.x = 5;
    this.width = 140;
    this.height = 40;
  }

  setPercentage(percentage, images) {
    let path = images[this.getImageIndex(percentage)];
    this.img = this.imgCache[path];
  }

  /**
   * checks the percentage and returns the right index for render the status bar.
   * @returns Number from 0 to 5 for the right index of the statusbar
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
    } else if (percentage >= 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
