class Level {
  enemies;
  background_objects;
  level_end = 2400;

  constructor(enemies, background_objects) {
    this.enemies = enemies;
    this.background_objects = background_objects;
  }

  static createLevel(canvasWidth, canvasHeight, levelData) {
    const backgrounds = levelData.backgrounds.map((bg) => {
      return new Background(bg.image, canvasWidth, canvasHeight, bg.x);
    });
    const enemies = [];
    return new Level(enemies, backgrounds);
  }
}
