class Level {
  enemies;
  backgrounds;
  endboss

  /**
   * @param {Background[]} background - background layers for this level
   * @param {Enemies[]} enemies - enemies placed in this level
   * @param {Endboss[]} endboss - endboss instances for this level
   */
  constructor(background, enemies, endboss) {
    this.backgrounds = background;
    this.enemies = enemies;
    this.endboss = endboss
  }
}
