window.addEventListener("load", function () {
  let canvas = document.getElementById("canvas1");
  let canvasWidth = 360;
  let canvasHeight = 640;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  let context = canvas.getContext("2d");

  //bird
  let birdWidth = 34; // width/height ratio = 408/228 = 17/12
  let birdHeight = 24;
  let birdX = canvasWidth / 8;
  let birdY = canvasHeight / 2;
  let birdImg;

  let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
  };

  //pipes
  let pipeArray = [];
  let pipeWidth = 64; // width/height ratio = 384/3072 = 1/8
  let pipeHeight = 512;
  let pipeX = canvasWidth;
  let pipeY = 0;

  let topPipeImg;
  let bottomPipeImg;

  //physics
  let velocityX = -2; // cột đi sang trái với vận tốc 2
  let velocityY = 0; // vận tốc con chim nhảy
  let gravity = 0.4;

  let gameStarted = false;
  let gameOver = false;
  let score = 0;

  class Background {
    constructor() {
      this.width = canvasWidth;
      this.height = canvasHeight;
      this.image = document.getElementById("background");
      this.x = 0;
      this.y = 0;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + canvasWidth,
        this.y,
        this.width,
        this.height
      );
    }

    update() {
      if (this.x < -canvasWidth) {
        this.x = 0;
      } else {
        this.x--;
      }
    }
  }
  class AudioControl {
    constructor() {
      this.flap = document.getElementById("flap");
      this.music = document.getElementById("music");
      this.die = document.getElementById("die");
      this.point = document.getElementById("point");
    }

    play(sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  let background = new Background();
  let sound = new AudioControl();

  //background

  //load images
  birdImg = new Image();
  birdImg.src = "../1-Flappy-Bird/flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  function startGame() {
    background.draw(context);
    context.save();
    context.font = "40px Nabla";
    context.fillText("Press Left Mouse", 20, 200);
    context.fillText("To Start !", 20, 250);
    context.restore();
    document.addEventListener("mousedown", function (e) {
      if (e.button === 0 && !gameStarted) {
        // Nếu click chuột trái và trò chơi chưa bắt đầu
        gameStarted = true; // Đánh dấu rằng trò chơi đã bắt đầu
        requestAnimationFrame(update); // Bắt đầu vòng lặp requestAnimationFrame
        setInterval(placePipes, 1500); //Mỗi 1.5 giây
        sound.play(sound.music);
      }
    });
  }
  startGame();

  // document.addEventListener('keydown', moveBird);
  document.addEventListener("mousedown", function (e) {
    if (e.button === 0) {
      // Nút chuột trái
      velocityY = -6;
      sound.play(sound.flap);
    }
    resetGame();
  });

  function update() {
    requestAnimationFrame(update);
    if (gameOver) {
      // Dừng game loop
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    background.draw(context);
    background.update();

    //bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > canvas.height) {
      gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      pipe.x += velocityX;
      context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

      if (!pipe.passed && bird.x > pipe.x + pipe.width) {
        score += 0.5;
        pipe.passed = true;
        sound.play(sound.point);
      }

      if (VaCham(bird, pipe)) {
        sound.play(sound.die);
        gameOver = true;
      }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
      pipeArray.shift();
    }

    context.save();
    context.font = "25px Nabla";
    context.fillText("Score: " + score, 20, 40);
    context.restore();

    if (gameOver) {
      sound.music.pause();
      context.save();
      context.font = "bold 50px Serif";
      context.fillStyle = "red";
      context.fillText("GAME OVER", 30, 300);
      context.restore();
      ScoreFlappyBird(score);
      document.addEventListener("mousedown", function (e) {
        if (e.button === 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          startGame();
        }
      });
    }
  }

  function placePipes() {
    if (gameOver) {
      return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = canvas.height / 4;

    let topPipe = {
      img: topPipeImg,
      x: pipeX,
      y: randomPipeY,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
      img: bottomPipeImg,
      x: pipeX,
      y: randomPipeY + pipeHeight + openingSpace,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };
    pipeArray.push(bottomPipe);
  }

  function moveBird(e) {
    if (e.code == "KeyW" || e.code == "ArrowUp" || e.code == "KeyX") {
      //nhảy
      velocityY = -6;
    }
    resetGame();
  }

  function resetGame() {
    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      gameOver = false;
      sound.play(sound.music);
    }
  }

  function VaCham(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
});
