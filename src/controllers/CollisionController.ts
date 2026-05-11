export default class CollisionController {
  private player;
  private plateforms: Plateform[];
  private hasCollision: boolean;
  private scalePile = {
    velocityY: [],
    defaultY: [],
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
