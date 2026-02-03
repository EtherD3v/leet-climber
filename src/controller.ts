import Player from './components/player.ts';
import Plateform from './components/plateform.ts';

class EventController {
  /* Facilitates event management 
    * events handlers 
    * listeners
  */ 

  public keys;
  private ctx;

  constructor(ctx) {
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

  handleKeyDown (e: keyBoardEvent) {
    if (e.key === " ") this.keys.player.Space = true;
    else if (e.key === "ArrowLeft") this.keys.player.ArrowLeft = true;
    else if (e.key === "ArrowRight") this.keys.player.ArrowRight = true;
  }
  
  handleKeyUp (e: keyBoardEvent) {
    if (e.key === " ") this.keys.player.Space = false;
    else if (e.key === "ArrowLeft") this.keys.player.ArrowLeft = false;
    else if (e.key === "ArrowRight") this.keys.player.ArrowRight = false;
  }

}

export default class CanvasController {
  /* Centralize canvas processing
    * Instanciates objects, manage updates
  */ 

  private eventController;
  private canvas;
  private player: Player;

  constructor (ctx) {
    this.ctx = ctx;
    this.eventController = new EventController(this.ctx);
    this.player = new Player(ctx, this.eventController.keys.player);
    this.plateform = new Plateform(this.ctx, this.player.x + 300, this.player.y - 20, 100, 20);
    this.update();
    
    // DEBUG

    console.log(`player coords : [ x = ${this.player.x}; y = ${this.player.y} ]`);
    console.log(`canvas : [ height = ${this.ctx.canvas.height}; width = ${this.ctx.canvas.width} ]`)
  }
  
  update () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.player.update(this.player, this.eventController.keys.player);
    this.player.events = this.eventController.keys.player;
    this.plateform.update();
    requestAnimationFrame(() => this.update());
  }
}
