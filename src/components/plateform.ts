export default class Plateform {
  /* Plateform object, such as a slab 
    * allows player to jump on it
  */

  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw () {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update () {
    this.draw();
  }
}
