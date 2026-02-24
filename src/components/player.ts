export default class Player {
  
  /* Implements player

    * Properties :
      * velocity : snap velocity
      * x : x coord 
      * y : y coord

  */

  private ctx: CanvasRenderingContext2D;
  public events: {Space: boolean, ArrowRight: boolean, ArrowLeft: boolean};

  public velocityX: number = 0;
  public velocityY: number = 0;
  private GRAVITY = .6;

  public sideLength: number = 40;
  public x: number = 50;
  public y: number = document.querySelector("#floor")!.getBoundingClientRect().top - this.sideLength;
  public defaultPlacement = {x: this.x, y: this.y};

  public isJumping = false;
  private jumpHeight = 25;

  constructor(ctx: CanvasRenderingContext2D, events: {Space: boolean, ArrowRight: boolean, ArrowLeft: boolean})  {
    this.ctx = ctx;
    this.events = events;
    this.velocityY = this.jumpHeight;
  }
  
  jump () {

    /* Fait sauter le joueur jusqu'à la hauteur `jumpHeigh`
      * Phase 1 : montée 
      * Phase 2 : descente
    */
    
    if (!this.isJumping) {
      this.isJumping = true;
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
    console.log(`velocityX : ${this.velocityX}`);
    
    if (!this.isJumping && this.events.Space) {
      this.velocityY = 10;
      this.jump();
    }

      
    if (this.events.ArrowLeft && this.x - 0.5 >= 0) {
      this.velocityX -= 0.5;
      this.x += this.velocityX;
    }
    else if (this.events.ArrowRight && this.x + 0.5 <= window.innerWidth - this.sideLength) {
      this.velocityX += 0.5;
      this.x += this.velocityX;
    }
    else this.velocityX *= 0.9;

    this.velocityX = Math.max (
      -5, Math.min (
        this.velocityX, 5
      )
    );
    this.draw();
  }
}
