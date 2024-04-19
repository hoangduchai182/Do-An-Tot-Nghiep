function addNumberPlayed() {
  const flappybird = document.getElementById("flappybird");
  const shadowdog = document.getElementById("shadowdog");
  const eggmonster = document.getElementById("eggmonster");
  const seahorsesgun = document.getElementById("seahorsesgun");
  const alienshooter = document.getElementById("alienshooter");
  const snakedog = document.getElementById("snakedog");

  flappybird.addEventListener("click", function () {
    gameArr[0].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  shadowdog.addEventListener("click", function () {
    gameArr[1].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  eggmonster.addEventListener("click", function () {
    gameArr[2].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  seahorsesgun.addEventListener("click", function () {
    gameArr[3].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  alienshooter.addEventListener("click", function () {
    gameArr[4].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  snakedog.addEventListener("click", function () {
    gameArr[5].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
}

const changeUserName = () => {
  const account = document.getElementById("account");
  let nameUser = userLogin.firstName + " " + userLogin.lastName;
  // account.insertAdjacentHTML('afterbegin', nameUser);
  account.innerHTML = nameUser;
};

function ScoreFlappyBird(point) {
  const change = users.find((el) => el.userName == userLogin.userName);
  if (point > userLogin.flappyBird) {
    userLogin.flappyBird = point;
    change.flappyBird = userLogin.flappyBird;
    users[users.indexOf(change)] = change;
    saveToStorage(KEY_LOGIN, userLogin);
    saveToStorage(KEY, users);
  }
}
function ScoreDogShadow(point) {
  const change = users.find((el) => el.userName == userLogin.userName);
  if (point > userLogin.DogShadow) {
    userLogin.DogShadow = point;
    change.DogShadow = userLogin.DogShadow;
    users[users.indexOf(change)] = change;
    saveToStorage(KEY_LOGIN, userLogin);
    saveToStorage(KEY, users);
  }
}
function ScoreEggMonster(point) {
  const change = users.find((el) => el.userName == userLogin.userName);
  if (point > userLogin.EggMonster) {
    userLogin.EggMonster = point;
    change.EggMonster = userLogin.EggMonster;
    users[users.indexOf(change)] = change;
    saveToStorage(KEY_LOGIN, userLogin);
    saveToStorage(KEY, users);
  }
}
function ScoreSeaHorsesGun(point) {
  const change = users.find((el) => el.userName == userLogin.userName);
  if (point > userLogin.SeaHorsesGun) {
    userLogin.SeaHorsesGun = point;
    change.SeaHorsesGun = userLogin.SeaHorsesGun;
    users[users.indexOf(change)] = change;
    saveToStorage(KEY_LOGIN, userLogin);
    saveToStorage(KEY, users);
  }
}
function ScoreAlienShooter(point) {
  const change = users.find((el) => el.userName == userLogin.userName);
  if (point > userLogin.AlienShooter) {
    userLogin.AlienShooter = point;
    change.AlienShooter = userLogin.AlienShooter;
    users[users.indexOf(change)] = change;
    saveToStorage(KEY_LOGIN, userLogin);
    saveToStorage(KEY, users);
  }
}
function ScoreSnakeDog(point) {
  const change = users.find((el) => el.userName == userLogin.userName);
  if (point > userLogin.SnakeDog) {
    userLogin.SnakeDog = point;
    change.SnakeDog = userLogin.SnakeDog;
    users[users.indexOf(change)] = change;
    saveToStorage(KEY_LOGIN, userLogin);
    saveToStorage(KEY, users);
  }
}
