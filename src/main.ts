const canvas = document.querySelector("canvas")!;

// dimensions de la fenêtre pour initaliser le canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// initialisation des objets de l'environnement
const environment = document.querySelector("env")!;
const ground = document.querySelector("#ground")!;
const groundRect = ground.getBoundingClientRect();

const vector = 
{
  xmin: groundRect.left,
  xmax: groundRect.right,
  ymin: groundRect.top,
  ymax: groundRect.bottom
}

class Player {
  private x: number;
  private y: number;
  private speed: number = 10;
  private events: Record<string, number>;
  private vector: typeof vector;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas, vector, side: number, x: number = vector.xmin, y: number = vector.ymin) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.vector = vector;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    this.events = {
      ArrowLeft: -1,
      ArrowRight: 1
    }

    window.addEventListener("keydown", e => this.move(e));
  }
  
  move(e: KeyboardEvent) {
    if (this.events[e.key] !== undefined) {
      this.x += this.events[e.key] * this.speed;

      this.x = Math.max(this.vector.xmin, Math.min(this.vector.xmax - this.side, this.x));
    }

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.side, this.side)
  }
}

const SIDE = groundRect.height / 3;
const X = Math.floor((vector.xmin + vector.xmax) / 2) - SIDE / 2;

const player = new Player(canvas, vector, SIDE, X);
player.draw()
