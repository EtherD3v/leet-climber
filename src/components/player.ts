export default class Player {
  /* Classe qui implémente le joueur

    * Attributs :
      * velocity : vitesse instantanée 
      * x : coordonnée en x 
      * y : coordonnée en y

  */

  private velocityX: number = 10;
  private velocityY: number = this.velocityX;
  private velocityDecreaseCoeff = 0.95;
  private x: number = 50;
  private y: number;
  private ctx: canvasRenderingContext2D;
  private sideLength: number = 40;
  private floorData;
  private defaultPlacement: {x: number, y: number};
  private isJumping = false;
  private isLanding = false;
  private jumpHeight = 80;

  constructor(ctx: canvasRenderingContext2D, floorData)  {
    this.ctx = ctx;
    this.floorData = floorData;
    this.y = this.floorData.top - this.sideLength;
    this.defaultPlacement = {x: this.x, y: this.y};
  }
  
  jump () {

    /* Fait sauter le joueur jusqu'à la hauteur `jumpHeigh`
      * Phase 1 : montée 
      * Phase 2 : descente
    */

    if(this.y > (this.defaultPlacement.y - this.jumpHeight) && !this.isLanding) {

      this.isJumping = true;
      this.jumpVelocity *= this.velocityDecreaseCoeff;
      this.y -= this.jumpVelocity;

      if (this.y < this.defaultPlacement.y - this.jumpHeight) {
        this.isLanding = true;
        this.y = this.defaultPlacement.y - this.jumpHeight;
      }
    } else if (this.y < this.defaultPlacement.y && this.isLanding) {
        this.jumpVelocity *= (1 / this.velocityDecreaseCoeff);
        this.y += this.jumpVelocity;
        
        if (this.y > this.defaultPlacement.y) {
          this.y = this.defaultPlacement.y;
          this.jumpVelocity = this.velocity;
          this.isJumping = false;
          this.isLanding = false;
        }
      }
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength) ;
  }

  update () {
    if (this.isJumping) this.jump();
    else this.x = Math.max(0, Math.min(this.x, this.floorData.width - this.sideLength));
    this.draw();
  }

}

