export default class Player {
  
  /* Implements player

    * Properties :
      * velocity : snap velocity
      * x : x coord 
      * y : y coord

  */

  private ctx: canvasRenderingContext2D;
  public events;

  private velocityX: number = 4;
  private velocityY: number = 10;
  private GRAVITY = .5;

  private sideLength: number = 40;
  private x: number = 50;
  private y: number = document.querySelector("#floor").getBoundingClientRect().top - this.sideLength;
  private defaultPlacement = {x: this.x, y: this.y};

  public isJumping = false;
  private jumpHeight = 10;

  constructor(ctx: canvasRenderingContext2D, events)  {
    this.ctx = ctx;
    this.events = events;
  }
  
  jump () {

    /* Fait sauter le joueur jusqu'à la hauteur `jumpHeigh`
      * Phase 1 : montée 
      * Phase 2 : descente
    */
    
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocityY = this.jumpHeight;
    }
    else {
      this.velocityY -= this.GRAVITY;
      this.y -= this.velocityY;

      if (this.y >= this.defaultPlacement.y) {
        this.velocityY = 0;
        this.y = this.defaultPlacement.y;
        this.isJumping = false;
      }
    }
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength) ;
  }

  update () {
    if (this.isJumping) this.jump();
    this.x = Math.max (
      0, Math.min (
        this.x, (window.innerWidth - this.sideLength)
      )
    );
    
    if (!this.isJumping && this.events.Space) {
      this.jump();
    }
    if (this.events.ArrowLeft) {
      this.x -= this.velocityX;
    }
    if (this.events.ArrowRight) {
      this.x += this.velocityX;
    }
    this.draw();
  }
}
