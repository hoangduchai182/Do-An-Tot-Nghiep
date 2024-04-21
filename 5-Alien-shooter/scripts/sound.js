export class Sound {
  constructor() {
    this.hit = document.getElementById("hit");
    this.shot = document.getElementById("shot");
    this.heal = document.getElementById("heal");
    this.thunder = document.getElementById("thunder");
    this.boom = document.getElementById("boom");
    this.laser = document.getElementById("laser");
  }

  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
