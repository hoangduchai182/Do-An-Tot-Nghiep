import { Laser, SmallLaser, BigLaser } from './Laser.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 70;
    this.height = 60;
    this.spriteX = 140;
    this.spriteY = 120;
    this.x;
    this.y;
    this.speed = 10;
    this.lives = 3;
    this.maxLives = 5;
    this.image = document.getElementById('player');
    this.jets_image = document.getElementById('player_jets');
    this.frameX = 0;
    this.jetsFrame = 1;
    this.smallLaser = new SmallLaser(this.game);
    this.bigLaser = new BigLaser(this.game);
    this.energy = 50;
    this.maxEnergy = 100;
    this.cooldown = false;

    this.dx = 0;
    this.dy = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedModifier = 15;
    this.collisionX = this.game.width * 0.5;
    this.collisionY = this.game.height * 0.5;
  }

  draw(context) {
    // context.fillRect(this.x, this.y, this.width, this.height);
    if (this.game.keys.indexOf('1') > -1) {
      this.frameX = 1;
    } else if (this.game.keys.indexOf('2') > -1) {
      this.smallLaser.render(context);
    } else if (this.game.keys.indexOf('3') > -1) {
      this.bigLaser.render(context);
    } else {
      this.frameX = 0;
    }
    context.drawImage(
      this.jets_image,
      this.jetsFrame * this.spriteX,
      0,
      this.spriteX,
      this.spriteY,
      this.x,
      this.y,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.frameX * this.spriteX,
      0,
      this.spriteX,
      this.spriteY,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    //chuột di chuyển ở đâu thì hình vòng tròn di chuyển theo đó
    this.dx = this.game.mouse.x - this.collisionX;
    this.dy = this.game.mouse.y - this.collisionY;
    const distance = Math.hypot(this.dy, this.dx); //Biến này dùng để tính quãng đường di chuyển theo đường chéo bằng pitago
    if (distance > this.speedModifier) {
      this.speedX = this.dx / distance || 0;
      this.speedY = this.dy / distance || 0;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }
    this.collisionX += this.speedX * this.speedModifier;
    this.collisionY += this.speedY * this.speedModifier;
    if (this.speedX < 0) {
      this.jetsFrame = 0;
    } else if (this.speedX > 0) {
      this.jetsFrame = 2;
    } else {
      this.jetsFrame = 1;
    }
    this.x = this.collisionX - this.width * 0.5;
    this.y = this.collisionY - this.height * 0.5;

    //energy
    if (this.energy < this.maxEnergy) this.energy += 0.05;
    if (this.energy < 1) this.cooldown = true;
    else if (this.energy > this.maxEnergy * 0.2) this.cooldown = false;

    // // di chuyen
    // if (this.game.keys.indexOf('ArrowLeft') > -1) {
    //   this.x -= this.speed;
    //   this.jetsFrame = 0;
    // } else if (this.game.keys.indexOf('ArrowRight') > -1) {
    //   this.x += this.speed;
    //   this.jetsFrame = 2;
    // } else {
    //   this.jetsFrame = 1;
    // }

    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    if (this.y < 0) this.y = 0;
    else if (this.y > this.game.height - this.height)
      this.y = this.game.height - this.height;
  }

  shoot() {
    const projectile = this.game.getProjectiles();
    if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
  }

  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.lives = 3;
  }
}
