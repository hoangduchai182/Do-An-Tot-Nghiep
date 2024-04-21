import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";
import { Sound } from "../2-Dog-shadow/sound.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 6;
      this.Background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessage = [];
      this.maxParticles = 200;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.winningScore = 100;
      this.fontColor = "black";
      this.time = 0;
      this.maxTime = 100000;
      this.gameOver = false;
      this.lives = 5;
      this.player.currenState = this.player.states[0];
      this.player.currenState.enter();

      this.sound = new Sound();

      this.gameStarted = false;
    }

    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.Background.update();
      this.player.update(this.input.keys, deltaTime);

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });

      this.floatingMessage.forEach((message) => {
        message.update();
      });

      this.particles.forEach((particle, index) => {
        particle.update();
      });

      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }

      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });

      this.enemies = this.enemies.filter((ennemy) => !ennemy.markForDeletion);
      this.collisions = this.collisions.filter(
        (collision) => !collision.markForDeletion
      );
      this.particles = this.particles.filter(
        (particle) => !particle.markForDeletion
      );
      this.floatingMessage = this.floatingMessage.filter(
        (message) => !message.markForDeletion
      );
    }

    draw(context) {
      this.Background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessage.forEach((message) => {
        message.draw(context);
      });
      this.UI.draw(context);
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else if (this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this));
    }

    restart() {
      this.gameStarted = false;
      this.gameOver = false;
      this.gameStarted = false;
      this.lives = 5;
      this.time = 0;
      this.score = 0;
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessage = [];
      this.speed = 0;
      this.Background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.player.restart();
    }
  }

  const game = new Game(canvas.width, canvas.height);

  const startTime = performance.now(); // Lấy thời gian bắt đầu game

  if (game.gameStarted == false) {
    game.Background.draw(ctx);
    game.player.draw(ctx);
    game.UI.UiStart(ctx);
    const mousedownListener = function (e) {
      if (e.button === 0) {
        game.gameStarted = true;
        game.sound.play(game.sound.start);

        // Khởi tạo vòng lặp game và đặt lastTime thành thời gian bắt đầu game
        let lastTime = performance.now() - startTime;
        function animate() {
          const currentTime = performance.now() - startTime;
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (!game.gameOver) {
            game.update(deltaTime);
          }
          game.draw(ctx);

          if (!game.gameOver) {
            requestAnimationFrame(animate);
          }

          const restartListener = function (e) {
            if (game.gameOver && e.key == "r") {
              game.restart();
              game.sound.play(game.sound.start);
              requestAnimationFrame(animate); // Gọi animate một lần duy nhất sau khi restart

              window.removeEventListener("keydown", restartListener); // Bỏ gán sự kiện sau khi restart
            }
          };
          window.addEventListener("keydown", restartListener);
        }
        animate();
        document.removeEventListener("mousedown", mousedownListener);
      }
    };
    document.addEventListener("mousedown", mousedownListener);
  }
});
