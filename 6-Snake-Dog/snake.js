export class Snake {
  constructor(game, x, y, speedX, speedY, color, name, image) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.moving = true;
    this.score = 0;
    this.length = 3;
    this.segments = [];

    for (let i = 0; i < this.length; i++) {
      if (i > 0) {
        this.x += this.speedX;
        this.y += this.speedY;
      }
      this.segments.unshift({ x: this.x, y: this.y, frameX: 0, frameY: 0 });
    }
    this.readyToTurn = true;
    this.name = name;
    this.image = image;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
  }

  update() {
    this.readyToTurn = true;
    //check collision
    if (this.game.checkCollision(this, this.game.food)) {
      let color;
      if (this.game.food.frameY === 1) {
        this.game.sound.play(this.game.sound.bad_food);
        this.score--;
        color = "black";

        if (this.length > 2) {
          this.length--;
          if (this.segments.length > this.length) {
            this.segments.pop();
          }
        }
      } else {
        this.game.sound.play(
          this.game.sound.biteSounds[
            Math.floor(Math.random() * this.game.sound.biteSounds.length)
          ]
        );
        this.score++;
        this.length++;
        color = "gold";
      }
      for (let i = 0; i < 5; i++) {
        const particle = this.game.getParticles();
        if (particle) {
          particle.start(
            this.game.food.x * this.game.cellSize + this.game.cellSize * 0.5,
            this.game.food.y * this.game.cellSize + this.game.cellSize * 0.5,
            color
          );
        }
      }
      this.game.food.reset();
    }

    // boundaries
    if (
      //Xét 4 điều kiện chạm tường
      (this.x <= 0 && this.speedX < 0) ||
      (this.x >= this.game.columns - 1 && this.speedX > 0) ||
      (this.y <= this.game.topMargin && this.speedY < 0) ||
      (this.y >= this.game.rows - 1 && this.speedY > 0)
    ) {
      this.moving = false;
    }

    if (this.moving) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.segments.unshift({ x: this.x, y: this.y, frameX: 0, frameY: 0 });
      if (this.segments.length > this.length) {
        this.segments.pop();
      }
    }

    //win
    if (this.score >= this.game.winningScore) {
      this.game.gameUi.triggerGameOver(this);
      this.game.sound.play(this.game.sound.win);
    }
  }

  draw() {
    this.segments.forEach((segment, i) => {
      if (this.game.debug) {
        if (i === 0) this.game.ctx.fillStyle = "gold";
        else this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(
          segment.x * this.game.cellSize,
          segment.y * this.game.cellSize,
          this.width,
          this.height
        );
      }

      this.setSpriteFrame(i);
      this.game.ctx.drawImage(
        this.image,
        segment.frameX * this.spriteWidth,
        segment.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        segment.x * this.game.cellSize,
        segment.y * this.game.cellSize,
        this.width,
        this.height
      );
    });
  }

  turnUp() {
    if (this.speedY === 0 && this.y > this.game.topMargin && this.readyToTurn) {
      this.speedX = 0;
      this.speedY = -1;
      this.moving = true;
      this.readyToTurn = false;
    }
  }
  turnDown() {
    if (this.speedY === 0 && this.y < this.game.rows - 1 && this.readyToTurn) {
      this.speedX = 0;
      this.speedY = 1;
      this.moving = true;
      this.readyToTurn = false;
    }
  }
  turnLeft() {
    if (this.speedX === 0 && this.x > 0 && this.readyToTurn) {
      this.speedX = -1;
      this.speedY = 0;
      this.moving = true;
      this.readyToTurn = false;
    }
  }
  turnRight() {
    if (
      this.speedX === 0 &&
      this.x < this.game.columns - 1 &&
      this.readyToTurn
    ) {
      this.speedX = 1;
      this.speedY = 0;
      this.moving = true;
      this.readyToTurn = false;
    }
  }

  setSpriteFrame(index) {
    const segment = this.segments[index];
    const prevSegment = this.segments[index - 1] || 0;
    const nextSegmen = this.segments[index + 1] || 0;

    if (index === 0) {
      //head
      if (segment.y < nextSegmen.y) {
        //up
        // nếu cái đầu ở trước 1 ô so với food
        if (
          this.game.food.y === segment.y - 1 &&
          this.game.food.x === segment.x
        ) {
          segment.frameX = 7;
          segment.frameY = 1;
        } else {
          segment.frameX = 1;
          segment.frameY = 2;
        }
      } else if (segment.y > nextSegmen.y) {
        //down
        if (
          this.game.food.y === segment.y + 1 &&
          this.game.food.x === segment.x
        ) {
          segment.frameX = 7;
          segment.frameY = 3;
        } else {
          segment.frameX = 0;
          segment.frameY = 4;
        }
      } else if (segment.x < nextSegmen.x) {
        //left
        if (
          this.game.food.x === segment.x - 1 &&
          this.game.food.y === segment.y
        ) {
          segment.frameX = 2;
          segment.frameY = 4;
        } else {
          segment.frameX = 0;
          segment.frameY = 0;
        }
      } else if (segment.x > nextSegmen.x) {
        //right
        if (
          this.game.food.x === segment.x + 1 &&
          this.game.food.y === segment.y
        ) {
          segment.frameX = 4;
          segment.frameY = 4;
        } else {
          segment.frameX = 2;
          segment.frameY = 1;
        }
      }
    } else if (index === this.segments.length - 1) {
      //tail
      if (prevSegment.y < segment.y) {
        //up
        segment.frameX = 1;
        segment.frameY = 4;
      } else if (prevSegment.y > segment.y) {
        //down
        segment.frameX = 0;
        segment.frameY = 2;
      } else if (prevSegment.x < segment.x) {
        //left
        segment.frameX = 2;
        segment.frameY = 0;
      } else if (prevSegment.x > segment.x) {
        //right
        segment.frameX = 0;
        segment.frameY = 1;
      }
    } else {
      //body
      if (nextSegmen.x < segment.x && prevSegment.x > segment.x) {
        //right
        segment.frameX = 1;
        segment.frameY = 1;
      } else if (prevSegment.x < segment.x && nextSegmen.x > segment.x) {
        //left
        segment.frameX = 1;
        segment.frameY = 0;
      } else if (prevSegment.y < segment.y && nextSegmen.y > segment.y) {
        //up
        segment.frameX = 1;
        segment.frameY = 3;
      } else if (nextSegmen.y < segment.y && prevSegment.y > segment.y) {
        //down
        segment.frameX = 0;
        segment.frameY = 3;
      } else if (prevSegment.x < segment.x && nextSegmen.y > segment.y) {
        //up left
        segment.frameX = 4;
        segment.frameY = 0;
      } else if (prevSegment.y > segment.y && nextSegmen.x > segment.x) {
        //left down
        segment.frameX = 3;
        segment.frameY = 0;
      } else if (prevSegment.x > segment.x && nextSegmen.y < segment.y) {
        //down right
        segment.frameX = 3;
        segment.frameY = 1;
      } else if (prevSegment.y < segment.y && nextSegmen.x < segment.x) {
        //up right
        segment.frameX = 4;
        segment.frameY = 1;
      } else if (nextSegmen.x < segment.x && prevSegment.y > segment.y) {
        // right down
        segment.frameX = 3;
        segment.frameY = 2;
      } else if (nextSegmen.y < segment.y && prevSegment.x < segment.x) {
        //up right
        segment.frameX = 3;
        segment.frameY = 3;
      } else if (nextSegmen.x > segment.x && prevSegment.y < segment.y) {
        //left up
        segment.frameX = 2;
        segment.frameY = 3;
      } else if (nextSegmen.y > segment.y && prevSegment.x > segment.x) {
        //up right
        segment.frameX = 2;
        segment.frameY = 2;
      } else {
        segment.frameX = 6;
        segment.frameY = 0;
      }
    }
  }
}

export class Keyboard1 extends Snake {
  constructor(game, x, y, speedX, speedY, color, name, image, type) {
    super(game, x, y, speedX, speedY, color, name, image);
    this.type = type;

    window.addEventListener("keydown", (e) => {
      if (e.key === "w") this.turnUp();
      else if (e.key === "s") this.turnDown();
      else if (e.key === "a") this.turnLeft();
      else if (e.key === "d") this.turnRight();
    });
  }
}

export class Keyboard2 extends Snake {
  constructor(game, x, y, speedX, speedY, color, name, image, type) {
    super(game, x, y, speedX, speedY, color, name, image);
    this.type = type;

    window.addEventListener("keydown", (e) => {
      if (e.key === "5") this.turnUp();
      else if (e.key === "2") this.turnDown();
      else if (e.key === "1") this.turnLeft();
      else if (e.key === "3") this.turnRight();
    });
  }
}

export class ComputerAi extends Snake {
  constructor(game, x, y, speedX, speedY, color, name, image, type) {
    super(game, x, y, speedX, speedY, color, name, image);
    this.turnTimer = 0;
    this.turnInterval;
    this.type = type;

    this.ai_difficulty = document.getElementById("ai_difficulty").value;
    this.turnInterval = Math.floor(Math.random() * this.ai_difficulty);
  }

  update() {
    super.update();
    if (
      (this.x === this.game.food.x && this.speedY === 0) ||
      (this.y === this.game.food.y && this.speedX === 0)
    ) {
      // Nếu ăn được food
      this.turn(); // đổi hướng
    } else {
      if (this.turnTimer < this.turnInterval) {
        this.turnTimer += 1;
      } else {
        this.turnTimer = 0;
        this.turn(); // đổi hướng
        // Biến này càng cao, AI d chuyển càng xa rồi mới đổi hướng
        this.turnInterval = Math.floor(Math.random() * this.ai_difficulty);
      }
    }
  }

  turn() {
    //donot turn if moving towards food
    const food = this.game.food;
    if (food.x === this.x && food.y < this.y && this.speedY < 0) {
      return;
    } else if (food.x === this.x && food.y > this.y && this.speedY > 0) {
      return;
    } else if (food.y === this.y && food.x < this.x && this.speedX < 0) {
      return;
    } else if (food.y === this.y && food.x > this.x && this.speedX > 0) {
      return;
    }

    // di chuyen AI sao voi food
    if (food.x < this.x && this.speedX === 0) {
      // vị trí x của food và vị trí x của nhân vật AI
      this.turnLeft();
    } else if (food.x > this.x && this.speedX === 0) {
      this.turnRight();
    } else if (food.y < this.y && this.speedY === 0) {
      this.turnUp();
    } else if (food.y > this.y && this.speedY === 0) {
      this.turnDown();
    } else {
      if (this.speedY === 0) {
        Math.random() < 0.5 ? this.turnUp() : this.turnDown();
      } else if (this.speedX === 0) {
        Math.random() < 0.5 ? this.turnLeft() : this.turnRight();
      }
    }
  }
}
