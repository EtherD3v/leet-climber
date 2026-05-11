import Player from '../components/player';
import Plateform from '../components/plateform';
import Background from '../components/background';
import type { Keys } from '../types';
import CollisionController from './CollisionController';
import EventController from './EventController';

export default class CanvasController {
  /* Centralize canvas processing
    * Instanciates objects, manage updates
  */ 
  private player: Player;
  private ctx: CanvasRenderingContext2D;
  private plateforms: Plateform[];
  private background: Background;
  private collisionController: CollisionController;
  private eventController: EventController;

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.eventController = new EventController(this.ctx);
    this.background = new Background(this.ctx);
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
    this.background.update();
    this.player.events = this.eventController.keys.player;
    this.player.update();
    this.plateforms.forEach(plateform => plateform.update());
    this.collisionController.update();
    requestAnimationFrame(() => this.update());
  }
}
