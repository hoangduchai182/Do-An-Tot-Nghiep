export class Enemy {
  constructor(game, positionX, positionY) {
    this.game = game;
    this.width = this.game.enemySize;
    this.height = this.game.enemySize;
    this.spriteX = 80;
    this.spriteY = 80;
    this.x = 0;
    this.y = 0;
    this.positionX = positionX;
    this.positionY = positionY;
    this.markForDeletion = false;
  }

  draw(context) {
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.spriteX,
      this.frameY * this.spriteY,
      this.spriteX,
      this.spriteY,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(x, y) {
    this.x = x + this.positionX;
    this.y = y + this.positionY;

    //check collision
    this.game.projectilesPool.forEach(projectile => {
      if (
        !projectile.free &&
        this.game.checkCollision(this, projectile) &&
        this.lives > 0
      ) {
        this.hit(1);
        projectile.reset();
      }
    });

    if (this.lives < 1) {
      if (this.game.spriteUpdate) this.frameX++;
      if (this.frameX > this.maxFrame) {
        this.markForDeletion = true;
        if (!this.game.gameOver) {
          this.game.score += this.maxLives;
          saveUser(this.maxLives);
        }
      }
    }
    //collision player
    if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
      this.lives = 0;
      this.game.player.lives--;
    }

    // lost
    if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
      this.game.gameOver = true;
    }
  }

  hit(damge) {
    this.lives -= damge;
  }
}

export class Beetlemorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById('beetlemorph');
    this.frameX = 0;
    this.maxFrame = 2;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 1;
    this.maxLives = this.lives;
  }
}
export class Rhinomorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById('rhinomorph');
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 4;
    this.maxLives = this.lives;
  }
  hit(damge) {
    this.lives -= damge;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}
