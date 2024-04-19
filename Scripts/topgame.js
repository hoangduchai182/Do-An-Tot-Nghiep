const flappybird = document.getElementById("flappybird"),
  dogshadow = document.getElementById("dogshadow"),
  eggmonster = document.getElementById("eggmonster"),
  seahorsesgun = document.getElementById("seahorsesgun"),
  alienshooter = document.getElementById("alienshooter"),
  snakedog = document.getElementById("snakedog");

const flappy = () => {
  return users
    .slice()
    .sort((a, b) => b.flappyBird - a.flappyBird)
    .slice(0, 3);
};
const dogs = () => {
  return users
    .slice()
    .sort((a, b) => b.DogShadow - a.DogShadow)
    .slice(0, 3);
};
const Egg = () => {
  return users
    .slice()
    .sort((a, b) => b.EggMonster - a.EggMonster)
    .slice(0, 3);
};
const SeaHorses = () => {
  return users
    .slice()
    .sort((a, b) => b.SeaHorsesGun - a.SeaHorsesGun)
    .slice(0, 3);
};
const Alien = () => {
  return users
    .slice()
    .sort((a, b) => b.AlienShooter - a.AlienShooter)
    .slice(0, 3);
};
const snake = () => {
  return users
    .slice()
    .sort((a, b) => b.SnakeDog - a.SnakeDog)
    .slice(0, 3);
};
const topFlappy = flappy();
const topDogs = dogs();
const topEgg = Egg();
const topSeaHorses = SeaHorses();
const topAlien = Alien();
const topSnake = snake();

flappybird.addEventListener("click", function () {
  flappybird.classList.add("genres");
  dogshadow.classList.remove("genres");
  eggmonster.classList.remove("genres");
  seahorsesgun.classList.remove("genres");
  alienshooter.classList.remove("genres");
  snakedog.classList.remove("genres");
  addPlayerTop(topFlappy, "Flappy Bird");
});
dogshadow.addEventListener("click", function () {
  flappybird.classList.remove("genres");
  dogshadow.classList.add("genres");
  eggmonster.classList.remove("genres");
  seahorsesgun.classList.remove("genres");
  alienshooter.classList.remove("genres");
  snakedog.classList.remove("genres");
  addPlayerTop(topDogs, "Dog Shadow");
});
eggmonster.addEventListener("click", function () {
  flappybird.classList.remove("genres");
  dogshadow.classList.remove("genres");
  eggmonster.classList.add("genres");
  seahorsesgun.classList.remove("genres");
  alienshooter.classList.remove("genres");
  snakedog.classList.remove("genres");
  addPlayerTop(topEgg, "Egg Monster");
});
seahorsesgun.addEventListener("click", function () {
  flappybird.classList.remove("genres");
  dogshadow.classList.remove("genres");
  eggmonster.classList.remove("genres");
  seahorsesgun.classList.add("genres");
  alienshooter.classList.remove("genres");
  snakedog.classList.remove("genres");
  addPlayerTop(topSeaHorses, "Seahorses Gun");
});
alienshooter.addEventListener("click", function () {
  flappybird.classList.remove("genres");
  dogshadow.classList.remove("genres");
  eggmonster.classList.remove("genres");
  seahorsesgun.classList.remove("genres");
  alienshooter.classList.add("genres");
  snakedog.classList.remove("genres");
  addPlayerTop(topAlien, "Alien Shooter");
});
snakedog.addEventListener("click", function () {
  flappybird.classList.remove("genres");
  dogshadow.classList.remove("genres");
  eggmonster.classList.remove("genres");
  seahorsesgun.classList.remove("genres");
  alienshooter.classList.remove("genres");
  snakedog.classList.add("genres");
  addPlayerTop(topSnake, "Snake Dog");
});

changeUserName();
addGame();
addNumberPlayed();

function addPlayerTop(arr, name) {
  const section_player = document.getElementById("section-player");

  let html = "";
  arr.forEach((player, i) => {
    function checkArr() {
      if (arr == topFlappy) {
        return player.flappyBird;
      } else if (arr == topDogs) {
        return player.DogShadow;
      } else if (arr == topEgg) {
        return player.EggMonster;
      } else if (arr == topSeaHorses) {
        return player.SeaHorsesGun;
      } else if (arr == topAlien) {
        return player.AlienShooter;
      } else if (arr == topSnake) {
        return player.SnakeDog;
      } else {
        return null;
      }
    }
    html += `
      <div class="w-25 m-3">
        <div class="d-flex flex-column align-items-center">
          <img src="../images/${i + 1}.png" alt="" />
          <h3 class="mb-0" style="font-family: nabla">${i + 1}${checkI(i)}</h3>
        </div>
        <div class="section-game-2 d-flex text-light p-3 m-1">
          <div class="game-image d-flex align-items-center w-20">
            <h4
              class="icon-user-comment bg-success d-flex justify-content-center align-items-center p-4 mb-0 me-1"
            >
            ${player.lastName.charAt(0)}
            </h4>
          </div>
          <div class="w-80 ms-4 score-player">
            <h4 class="d-flex justify-content-start mb-0">${
              player.firstName + " " + player.lastName
            }
            </h4>
            <div class="d-flex justify-content-between">
              <div class="">
                <p class="text-start mb-0">${name}: ${checkArr()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  section_player.innerHTML = html;
}

function addGame() {
  const sortedGameArr = gameArr
    .slice()
    .sort((a, b) => b.numberOfPlayed - a.numberOfPlayed);
  addGameTop(sortedGameArr);
}

function addGameTop(gameArr) {
  const section_game = document.getElementById("section-game");
  let html = "";
  gameArr.forEach((game) => {
    html += `
      <div class="section-game d-flex text-light p-3 m-3 w-40">
        <div class="game-image d-flex align-items-center w-40">
          <img class="rounded-1" src="${game.image}" alt="" />
        </div>
        <div class="w-60 ms-3">
          <h4
            class="d-flex justify-content-center"
            style="font-family: 'Nabla', system-ui"
          >
            ${game.name}
          </h4>
          <h6 class="text-center">Số lượt chơi: ${game.numberOfPlayed}</h6>
          <div class="d-flex justify-content-center">
            <a
              id="${game.id}"
              class="d-flex text-decoration-none align-items-center btn-play"
              href="${game.linkPlay}"
              ><span class="material-symbols-outlined me-1">
                stadia_controller </span
              >Chơi ngay</a
            >
          </div>
        </div>
      </div>
    `;
  });
  section_game.innerHTML = html;
}

function checkI(i) {
  if (i + 1 === 1) {
    return "st";
  } else if (i + 1 === 2) {
    return "nd";
  } else if (i + 1 === 3) {
    return "rd";
  }
}
