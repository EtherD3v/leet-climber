interface Player {
  move: (event: KeyboardEvent) => void;
}

export default class EventController {
  
  // Stock the ref to listener to be able to delete it later 
  private keydownListener: ((event: KeyboardEvent) => void) | null = null;


  /**
    * Add a "keydown" event listener to control the player  
    * @param player - The player object to control (have to implement 'Player' interface)
    * @param uhd - Optional parameter - (unused here, but reserved for a future extension)
    * */

  setListeners(player: Player, uhd: unknown = null): void {
    if (!player.move || typeof player.move != "function") {
      throw new Error("The player must have a valid 'move' method.")
    }

    this.keydownListener = (event: KeyboardEvent) => player.move(event);
    document.addEventListener("keydown", this.keydownListener);

  }

  removeListeners(): void {
    if (this.keydownListener) {
      document.removeEventListener("keydown", this.keydownListener);
      this.keydownListener = null;
    }
  }
}
