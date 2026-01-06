import Player from "./components/player.ts";
import EventController from "./utils/event.ts";

const canvas = document.querySelector("canvas")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const area = document.querySelector("#area")!;
const floor = document.querySelector("#floor")!;
const floorRect = floor.getBoundingClientRect();

interface GameComponent {
  draw: () => void;
  update?: (deltaTime: number) => void;
}

class Game {

  private eventController: EventController;
  public components: GameComponent[];
  public player: Player;

  /**
    * Build game by centralizing components
    * @param player - the player object
    * @param components - others components
    * */


  constructor(player: Player, ...components: GameComponent[]) {
    this.player = player;
    this.components = [player, ...components]
    this.eventController = new EventController();

    this.eventController.setListeners(this.player);
    this.gameLoop();
  }
  
  private gameLoop(): void {
    const lastTime: number = performance.now();
    const update = (currentTime: number): void => {
      const deltaTime: number = currentTime - lastTime;
      this.update(deltaTime);
      this.draw();
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // frame refreshing
  private update = (deltaTime: number): void => {
    this.components.forEach(component => {
      if (component.update) {
        component.update(deltaTime);
      }
    });
  }
  
  private draw(): void {
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.components.forEach(component => {
      component.draw();
    });
  }

  public cleanup(): void {
    this.eventController.removeListeners();
  }
}

const player = new Player(canvas, floorRect);
const game = new Game(
  player,
)
