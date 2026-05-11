export default class Background {
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.layers = [
      //new Layer(0, 0, 200, 200),
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
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}
