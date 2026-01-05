const canvas = document.querySelector("canvas")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const area = document.querySelector("#area")!;
const floor = document.querySelector("#floor")!;
const floorRect = floor.getBoundingClientRect();

const defaultBounds = 
{
  xmin: floorRect.left,
  xmax: floorRect.right,
  ymin: floorRect.top,
  ymax: floorRect.bottom
}


class Game {
  private canvas: HTMLCanvasElement;
  private events: Record<string, number>;
}


class Player {
  private x: number;
  private y: number;
  private speed: number = 10;
  private defaultBounds: typeof defaultBounds;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas, defaultBounds, side: number, x: number = defaultBounds.xmin, y: number = defaultBounds.ymin) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.defaultBounds = defaultBounds;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    
    this.events = {
      ArrowLeft: -1,
      ArrowRight: 1
    }

    window.addEventListener("keydown", e => this.move(e));
  }
  

  move(e: KeyboardEvent) {
    if (this.events[e.key] !== undefined) {
      this.x += this.events[e.key] * this.speed;

      this.x = Math.max(this.defaultBounds.xmin, Math.min(this.defaultBounds.xmax - this.side, this.x));
    }

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.side, this.side)
  }
}

const update = (): void => {
  player.draw()
  requestAnimationFrame(update)
}

const SIDE = floorRect.height / 3;
const X = Math.floor((defaultBounds.xmin + defaultBounds.xmax) / 2) - SIDE / 2;

const player = new Player(canvas, defaultBounds, SIDE, X);
update();
