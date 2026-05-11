export default class Background {
  private ctx: CanvasRenderingContext2D;
  private layers: Layer[];
  private height: number;
  private width: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.height = this.ctx.canvas.height * 0.85;
    this.width = this.ctx.canvas.width;

    this.layers = [
      new Layer(0, 0, this.height, this.width),
    ];
  }

  draw () {
    this.ctx.fillStyle = "orange";
    this.layers.forEach(layer => {
      this.ctx.fillRect(layer.x, layer.y, layer.width, layer.height)
    })
  }

  update () {
    this.draw();
  }
}

class Layer {
  public x: number;
  public y: number;
  public height: number;
  public width: number;

  constructor(x: number, y: number, height: number, width: number) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}
