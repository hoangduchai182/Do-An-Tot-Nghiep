export class Layer {
  constructor(game, image, speedModifier) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.image1 = document.getElementById('layer1');
    this.image2 = document.getElementById('layer2');
    this.image3 = document.getElementById('layer3');
    this.image4 = document.getElementById('layer4');
    this.layer1 = new Layer(this.game, this.image1, 0.2);
    this.layer2 = new Layer(this.game, this.image2, 0.4);
    this.layer3 = new Layer(this.game, this.image3, 1);
    this.layer4 = new Layer(this.game, this.image4, 1.5);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }
  update() {
    this.layers.forEach(layer => layer.update());
  }
  draw(context) {
    this.layers.forEach(layer => layer.draw(context));
  }
}
