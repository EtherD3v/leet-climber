import type { Keys, PlayerKeys } from '../types';

export default class EventController {
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
    const keyMap: Record<srting, keyof PlayerKeys> = {
      " ": "Space",
      ArrowLeft: "ArrowLeft",
      ArrowRight: "ArrowRight",
    };
    const key = keyMap[e.key];
    if (key) this.keys.player[key] = true;
  }
  
  handleKeyUp (e: keyboardEvent) {
    const keyMap: Record<string, keyof PlayerKeys> = {
      " ": "Space",
      ArrowLeft: "ArrowLeft",
      ArrowRight: "ArrowRight"
    };
    const key = keyMap[e.key];
    console.log(key)
    if (key) this.keys.player[key] = false;
  }

}
