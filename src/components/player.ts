export default class Player {

  private sideLength: number | null = null;
  private speed: number = 5;
  private xCoord: number;
  private yCoord: number;
  private backgroundColor: string = "red";
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private events: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
  }

  constructor(canvas: HTMLCanvasElement, floorRect: typeof floorRect) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.floorRect = floorRect;
    this.sideLength = 1/3 * floorRect.height;

    this.xCoord = (floorRect.width - this.sideLength) / 2;
    this.yCoord = floorRect.y;

    this.draw()
  }
  
  move (e: KeyboardEvent): void {
    if (e.key in this.events) {

      this.xCoord += this.events[e.key] * this.speed;

      this.xCoord = Math.max(
        0, 
        Math.min(
          this.floorRect.width - this.sideLength,
          this.xCoord + this.events[e.key] * this.speed
        )
      );
    }
  } 

  draw(): void {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(this.xCoord, this.yCoord, this.sideLength, this.sideLength)
  }
}
