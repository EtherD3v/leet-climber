class EventController {
  constructor(player) {
    this.player = player;
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
  }
    
  handleKeyDown (e: keyBoardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        this.player.x -= this.player.velocity;
        break;
      case "ArrowRight":
        this.player.x += this.player.velocity;
        break;
      case " ":
        if (!this.player.isJumping) this.player.jump();
        break;
    };
  };

}

export default class CanvasController {
  private eventController;
  private canvas;
  private player: Player;

  constructor (canvas, player) {
    this.canvas = canvas;
    this.player = player;
    this.eventController = new EventController(this.player);
    this.update();
  }
  
  update () {
    this.player.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update();
    requestAnimationFrame(() => this.update());
  }

}
