export class Sound {
  constructor() {
    this.jump = document.getElementById("jump");
    this.start = document.getElementById("start");
    this.damge = document.getElementById("damge");
    this.hit = document.getElementById("hit");
  }
  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
