function addNumberPlayed() {
  const flappybird = document.getElementById('flappybird');
  const shadowdog = document.getElementById('shadowdog');
  const eggmonster = document.getElementById('eggmonster');
  const seahorsesgun = document.getElementById('seahorsesgun');
  const alienshooter = document.getElementById('alienshooter');

  flappybird.addEventListener('click', function () {
    gameArr[0].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  shadowdog.addEventListener('click', function () {
    gameArr[1].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  eggmonster.addEventListener('click', function () {
    gameArr[2].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  seahorsesgun.addEventListener('click', function () {
    gameArr[3].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
  alienshooter.addEventListener('click', function () {
    gameArr[4].numberOfPlayed++;
    saveToStorage(KEY_GAME, gameArr);
  });
}

const changeUserName = () => {
  const account = document.getElementById('account');
  let nameUser = userLogin.firstName + ' ' + userLogin.lastName;
  // account.insertAdjacentHTML('afterbegin', nameUser);
  account.innerHTML = nameUser;
};

function saveUser(point) {
  userLogin.score += point;
  saveToStorage(KEY_LOGIN, userLogin);

  const change = users.find(el => el.userName == userLogin.userName);
  change.score = userLogin.score;
  users[users.indexOf(change)] = change;
  saveToStorage(KEY, users);
}
