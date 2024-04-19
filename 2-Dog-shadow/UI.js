export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.livesImage = document.getElementById("lives");
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetX = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    context.fillText("Score:" + this.game.score, 20, 50);

    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);

    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    }

    if (this.game.gameOver) {
      ScoreDogShadow(this.game.score);
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score >= this.game.winningScore) {
        context.fillText(
          "Boo-yah",
          this.game.width * 0.5,
          this.game.height * 0.5 - 10
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;

        context.fillText(
          "What are creatures of the night afraid of? YOU!!!",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );

        context.font = this.fontSize * 0.9 + "px " + this.fontFamily;
        context.fillText(
          "Ấn R để chơi lại !",
          this.game.width * 0.5,
          this.game.height * 0.5 + 60
        );
      } else {
        context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
        context.fillText(
          "Bạn gà quá !",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;

        context.fillText(
          "Tập Thêm Đi",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );

        context.font = this.fontSize * 0.9 + "px " + this.fontFamily;
        context.fillText(
          "Ấn R để chơi lại !",
          this.game.width * 0.5,
          this.game.height * 0.5 + 60
        );
      }
    }
    context.restore();
  }

  UiStart(context) {
    context.save();
    context.textAlign = "center";
    context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
    context.fillText(
      "Press Left Mouse To Begin !",
      this.game.width * 0.5,
      this.game.height * 0.5
    );
    context.restore();
  }
}
