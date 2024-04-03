class Layer {
  constructor(game, width, height, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 600;
    this.height = 800;
    this.layer1image = document.getElementById('background-1');
    this.layer2image = document.getElementById('background-2');
    this.layer3image = document.getElementById('background-3');
    this.layer4image = document.getElementById('background-4');
    this.layer5image = document.getElementById('background-5');
    this.layer6image = document.getElementById('background-6');
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer5image
    );
    this.layer6 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer6image
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
      this.layer6,
    ];
  }

  draw(context, waveCount) {
    this.backgroundLayers[waveCount].draw(context);
  }
}
