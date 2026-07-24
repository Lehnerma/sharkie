class Statusbar extends DrawableObjects {
  images;

  /**
   * @param {string[]} images - image paths ordered from 0% to 100%
   * @param {number} y - vertical position of the bar
   * @param {number} [initialValue] - percentage to render right away
   */
  constructor(images, y, initialValue = 0) {
    super();
    this.x = 0;
    this.width = 140;
    this.height = 45;
    this.y = y;
    this.images = images;
    this.loadImages(images);
    this.setPercentage(initialValue, images);
  }

  /**
   * shows the image matching the given percentage.
   * @param {number} percentage - value between 0 and 100
   * @param {string[]} images - image paths ordered from 0% to 100%
   */
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

  /**
   * refreshes the health bar image to match sharkie's current health.
   * @param {number} health - current health value
   */
  renderHealthbar(health) {
    this.setPercentage(health, this.images);
  }

  /**
   * refreshes the coin bar image to match the current coin count.
   * @param {number} coin - current coin count
   */
  renderCoinbar(coin) {
    this.setPercentage(coin, this.images);
  }

  /**
   * refreshes the bottle bar image to match the current bottle count.
   * @param {number} bottle - current bottle count
   */
  renderBottle(bottle) {
    this.setPercentage(bottle, this.images);
  }

  /**
   * adds 10 coins, capped at 100, and refreshes the bar.
   */
  collectCoin() {
    if (this.coinCounter < 100) {
      this.coinCounter += 10;
    } else {
      this.coinCounter = 100;
    }
    this.renderCoinbar(this.coinCounter);
  }

  /**
   * adds 10 bottles, capped at 100, and refreshes the bar.
   */
  collectBottle() {
    if (this.bottleCounter < 100) {
      this.bottleCounter += 10;
    } else {
      this.bottleCounter = 100;
    }
    this.renderBottle(this.bottleCounter);
  }
}
