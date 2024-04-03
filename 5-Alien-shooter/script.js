import { Background } from './background.js';
import { Laser, SmallLaser, BigLaser } from './scripts/Laser.js';
import { Projectile } from './scripts/Projecttile.js';
import { Enemy, Rhinomorph, Beetlemorph } from './scripts/Enemy.js';
import { Boss } from './scripts/Boss.js';
import { Wave } from './scripts/Wave.js';
import { Player } from './scripts/Player.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    this.background = new Background();

    this.projectilesPool = []; // mảng chứa đạn
    this.numberOfProjectiles = 15; //tổng số đạn
    this.createProjectiles();
    this.fired = false;

    this.columns = 2;
    this.rows = 2;
    this.enemySize = 50;

    this.waves = [];
    this.waveCount = 1;

    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 150;

    this.score = 0;
    this.gameOver = false;

    this.bossArray = [];
    this.bossLives = 10;
    this.restart();

    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
    };

    this.gameStart = false;

    canvas.addEventListener('mousedown', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
    canvas.addEventListener('mouseup', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
    canvas.addEventListener('mousemove', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });

    //this.player.shoot();
    window.addEventListener('keydown', e => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      if (e.key === '1' && !this.fired) this.player.shoot();
      this.fired = true;
      if (e.key === 'r' && this.gameOver) this.restart();
    });
    window.addEventListener('mousedown', e => {
      if (e.button === 0 && !this.fired) {
        // Nút chuột trái
        this.player.shoot();
      }
    });
    window.addEventListener('keyup', e => {
      this.fired = false;
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }

  render(context, deltaTime) {
    this.background.draw(context, this.waveCount % 6);

    //sprite
    if (this.spriteTimer > this.spriteInterval) {
      this.spriteUpdate = true;
      this.spriteTimer = 0;
    } else {
      this.spriteUpdate = false;
      this.spriteTimer += deltaTime;
    }

    this.drawStatusText(context);
    this.projectilesPool.forEach(projectile => {
      projectile.update();
      projectile.draw(context);
    });

    this.player.draw(context);
    this.player.update();

    this.bossArray.forEach(boss => {
      boss.draw(context);
      boss.update();
    });
    this.bossArray = this.bossArray.filter(object => !object.markForDeletion);

    this.waves.forEach(wave => {
      wave.render(context);
      if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
        this.newWave();
        wave.nextWaveTrigger = true;
      }
    });
  }

  // tạo viên đạn
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());
    }
  }

  // bắn từng viên đạn. Nếu đang free thì trả về 1 viên
  getProjectiles() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) return this.projectilesPool[i];
    }
  }

  //collision
  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  drawStatusText(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.font = '20px Nabla';
    context.fillText('Score: ' + this.score, 20, 40);
    context.fillText('Wave: ' + this.waveCount, 20, 80);

    for (let i = 0; i < this.player.maxLives; i++) {
      context.strokeRect(20 + 20 * i, 100, 10, 15);
    }
    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(20 + 20 * i, 100, 10, 15);
    }

    // cooldown energy
    context.save();
    this.player.cooldown
      ? (context.fillStyle = 'red')
      : (context.fillStyle = 'gold');
    for (let i = 0; i < this.player.energy; i++) {
      context.fillRect(20 + 2 * i, 130, 2, 15);
    }

    if (this.gameOver) {
      context.textAlign = 'center';
      context.font = '100px Impact';
      context.fillText('NON !', this.width * 0.5, this.height * 0.5);
      context.font = '20px Impact';
      context.fillText(
        'Press R to restart !',
        this.width * 0.5,
        this.height * 0.5 + 30
      );
    }
    context.restore();
  }

  newWave() {
    this.waveCount++;
    if (this.player.lives < this.player.maxLives) this.player.lives++;
    if (this.waveCount % 4 === 0) {
      this.bossArray.push(new Boss(this, this.bossLives));
    } else {
      if (
        Math.random() < 0.5 &&
        this.columns * this.enemySize < this.width * 0.8
      )
        this.columns++;
      else if (this.rows * this.enemySize < this.height * 0.6) {
        this.rows++;
      }
      this.waves.push(new Wave(this));
    }

    this.waves = this.waves.filter(object => !object.markForDeletion);
  }

  restart() {
    this.player.restart();
    this.columns = 2;
    this.rows = 2;

    this.waves = [];
    this.bossArray = [];
    this.bossLives = 10;

    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
    };

    // this.waves.push(new Wave(this));
    this.bossArray.push(new Boss(this, this.bossLives));
    this.waveCount = 1;

    this.score = 0;
    this.gameOver = false;
  }
}

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 630;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.font = '30px Impact';

  const game = new Game(canvas);

  function startGame(context) {
    context.save();
    context.drawImage(
      document.getElementById('background-7'),
      0,
      0,
      game.width,
      game.height
    );
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
    context.shadowColor = 'black';
    context.font = '50px Bangers';
    context.fillText(
      'Ấn Chuột trái để bắt đầu',
      canvas.width * 0.5,
      canvas.height * 0.5 - 20
    );
    context.font = '30px Bangers';
    context.fillText('Luật chơi', canvas.width * 0.5, canvas.height * 0.5 + 30);
    context.font = '20px Bangers';
    context.fillText(
      'Bạn di chuyển chuột để điều khiển máy bay, Ấn chuột trái để bắn',
      canvas.width * 0.5,
      canvas.height * 0.5 + 60
    );
    context.fillText(
      'Ấn phím 2 và 3 để bắn Laser. Chú ý vạch năng lượng nhé !',
      canvas.width * 0.5,
      canvas.height * 0.5 + 90
    );
    context.fillText(
      'Và Đừng để bản thân va phải Alien',
      canvas.width * 0.5,
      canvas.height * 0.5 + 120
    );
    context.restore();
  }
  startGame(ctx);
  document.addEventListener('mousedown', function (e) {
    if (e.button === 0 && !game.gameStart) {
      game.gameStart = true;
      let lastTime = 0;
      function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = deltaTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
      }
      animate(0);
    }
  });
});
