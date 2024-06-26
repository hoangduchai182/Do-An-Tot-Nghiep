export class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', e => {
      if (
        (e.key === 'w' || e.key === 's') &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
      } else if (e.key === 'd') {
        this.game.debug = !this.game.debug;
      }
    });
    window.addEventListener('mousedown', e => {
      if (e.button === 0) {
        // Nút chuột trái
        this.game.player.shootTop();
      }
    });
    window.addEventListener('keyup', e => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}
