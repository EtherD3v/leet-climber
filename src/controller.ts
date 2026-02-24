import Player from './components/player.ts';
import Plateform from './components/plateform.ts';

class EventController {
  /* Facilitates event management 
    * events handlers 
    * listeners
  */ 

  public keys;
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.keys = {
      player: {
        Space: false,
        ArrowRight: false,
        ArrowLeft: false,
      }
    }

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("resize", this.windowResize.bind(this));
  }
    
  windowResize() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  handleKeyDown (e: KeyboardEvent) {
    if (e.key === " ") this.keys.player.Space = true;
    else if (e.key === "ArrowLeft") this.keys.player.ArrowLeft = true;
    else if (e.key === "ArrowRight") this.keys.player.ArrowRight = true;
  }
  
  handleKeyUp (e: KeyboardEvent) {
    if (e.key === " ") this.keys.player.Space = false;
    else if (e.key === "ArrowLeft") this.keys.player.ArrowLeft = false;
    else if (e.key === "ArrowRight") this.keys.player.ArrowRight = false;
  }

}

export default class CanvasController {
  /* Centralize canvas processing
    * Instanciates objects, manage updates
  */ 
  private player: Player;
  private ctx: CanvasRenderingContext2D;
  private plateforms: Plateform[];
  private collisionController: CollisionController;
  private eventController: EventController;

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.eventController = new EventController(this.ctx);
    this.player = new Player(ctx, this.eventController.keys.player);
    this.plateforms = [
      new Plateform(this.ctx, this.player.x + 100, this.player.y - 20, 100, 40),
      new Plateform(this.ctx, this.player.x + 300, this.player.y - 70, 100, 40),
      new Plateform(this.ctx, this.player.x + 500, this.player.y - 120, 100, 40),
      new Plateform(this.ctx, this.player.x + 700, this.player.y - 170, 100, 40),
      new Plateform(this.ctx, this.player.x + 900, this.player.y - 220, 100, 40),
      new Plateform(this.ctx, this.player.x + 800, this.player.y - 7, 100, 40),
    ]
    this.collisionController = new CollisionController(this.player, this.plateforms);
    this.update();
    
    // DEBUG

    console.log(`player coords : [ x = ${this.player.x}; y = ${this.player.y} ]`);
    console.log(`canvas : [ height = ${this.ctx.canvas.height}; width = ${this.ctx.canvas.width} ]`)
  }
  
  update () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.player.events = this.eventController.keys.player;
    this.player.update();
    this.plateforms.forEach(plateform => plateform.update());
    this.collisionController.update();
    requestAnimationFrame(() => this.update());
  }
}

class CollisionController {
  private player;
  private plateforms: Plateform[];
  private hasCollision: boolean = false;
  private scalePile = {
    velocityY: [] as number[],
    defaultY: [] as number[],
  };

  constructor(player: Player, plateforms: Plateform[]) {
    this.player = player;
    this.plateforms = plateforms;
  }

  detectCollision () {
    this.hasCollision = false;
    
    this.plateforms.forEach(plateform => {
      if (plateform.x <= this.player.x + this.player.sideLength && plateform.x + plateform.width >= this.player.x) {
        // le joueur est au-dessus ou en dessous d'une plateforme
        this.hasCollision = true;
        
        if (plateform.y < this.player.y + this.player.sideLength && plateform.y + plateform.height / 2 > this.player.y + this.player.sideLength) {

          this.player.y = plateform.y - this.player.sideLength;
          
          if (!this.scalePile.defaultY.map(
            (value) => Math.floor(value)
          ).includes(Math.floor(this.player.y)))
          {
            this.scalePile.velocityY.push(this.player.velocityY);
            this.scalePile.defaultY.push(this.player.defaultPlacement.y);
            this.player.defaultPlacement.y = this.player.y;
          }
        } else if (plateform.y + plateform.height / 2 < this.player.y && plateform.y + plateform.height > this.player.y) {
          
          this.player.y = plateform.y + plateform.height;
          this.player.velocityY = 0;
        
        } else if (plateform.y < this.player.y + this.player.sideLength && plateform.y + plateform.height > this.player.y){
            
          this.player.velocityX *= -1;
          
          if (plateform.x <= this.player.x + this.player.sideLength && plateform.x >= this.player.x) {
            this.player.x = plateform.x - this.player.sideLength - 5;
          } else {
            this.player.x = plateform.x + plateform.width + 5;
          }
        
        }
      }
      else {
        
        if (this.scalePile.defaultY.length > 0 && !this.hasCollision) {
          
          const newDefaultY = this.scalePile.defaultY.pop();
          this.player.defaultPlacement.y = newDefaultY ?? this.player.defaultPlacement.y;
          
          if (!this.player.isJumping) this.player.jump();
        
        }
      }
    })
  }

  update () {
    this.detectCollision();
  }
}
