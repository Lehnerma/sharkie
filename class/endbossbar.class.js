class Endbossbar extends DrawableObjects {
  constructor() {
    super();
    this.width = 300;
    this.height = 24;
    this.x = (720 - this.width) / 2;
    this.y = 20;
    this.healthPercentage = 100;
  }

  /**
   * stores the current boss health (clamped to 0..100) to render next frame.
   * @param {number} health
   */
  setHealth(health) {
    this.healthPercentage = Math.max(0, Math.min(100, health));
  }

  /**
   * draws the boss healthbar directly with canvas primitives (no sprite):
   * a dark track, a colored fill proportional to health, a border and a
   * "BOSS" label. wrapped in save/restore so it never leaks ctx state.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawObject(ctx) {
    ctx.save();
    const radius = 6;
    this.drawTrack(ctx, radius);
    this.drawFill(ctx, radius);
    this.drawBorder(ctx, radius);
    this.drawLabel(ctx);
    ctx.restore();
  }

  /** dark background track behind the health fill. */
  drawTrack(ctx, radius) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    this.roundRect(ctx, this.x, this.y, this.width, this.height, radius);
    ctx.fill();
  }

  /** colored fill, its width proportional to the current health. */
  drawFill(ctx, radius) {
    const fillWidth = (this.width - 4) * (this.healthPercentage / 100);
    if (fillWidth <= 0) return;
    ctx.fillStyle = this.getFillColor();
    this.roundRect(ctx, this.x + 2, this.y + 2, fillWidth, this.height - 4, radius - 2);
    ctx.fill();
  }

  /** white outline around the whole bar. */
  drawBorder(ctx, radius) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    this.roundRect(ctx, this.x, this.y, this.width, this.height, radius);
    ctx.stroke();
  }

  /** centered "BOSS" caption. */
  drawLabel(ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BOSS", this.x + this.width / 2, this.y + this.height / 2);
  }

  /** picks the fill color: green -> orange -> red as health drops. */
  getFillColor() {
    if (this.healthPercentage > 60) return "#3ec300";
    if (this.healthPercentage > 30) return "#ff9f1c";
    return "#e63946";
  }

  /**
   * builds a rounded-rectangle path (without filling/stroking it).
   * @param {CanvasRenderingContext2D} ctx
   */
  roundRect(ctx, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}
