export default class Plateform {
  /* Plateform object, such as a slab 
    * allows player to jump on it
  */

  private ctx: canvasRenderingContext2D;
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(ctx: canvasRenderingContext2D, x, y, width, height) {
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
