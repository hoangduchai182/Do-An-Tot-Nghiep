function addGame() {
  const sortedGameArr = gameArr
    .slice()
    .sort((a, b) => b.numberOfPlayed - a.numberOfPlayed);
  addGameTop(sortedGameArr);
}
function addPlayer() {
  const sortPlayer = users.slice().sort((a, b) => b.score - a.score);
  addPlayerTop(sortPlayer);
}

changeUserName();
addGame();
addPlayer();
addNumberPlayed();

function addGameTop(gameArr) {
  const section_game = document.getElementById('section-game');
  let html = '';
  gameArr.forEach(game => {
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

function addPlayerTop(arr) {
  const section_player = document.getElementById('section-player');
  let html = '';
  arr.forEach(player => {
    html += `
    <div class="section-game d-flex text-light p-3 m-3">
    <div class="game-image d-flex align-items-center w-20">
      <h4
        class="icon-user-comment bg-success d-flex justify-content-center align-items-center p-4 mb-0 me-1"
      >
        ${player.lastName.charAt(0)}
      </h4>
    </div>
    <div class="w-80 ms-3">
      <h4
        class="d-flex justify-content-center"
      >
        ${player.firstName + ' ' + player.lastName}
      </h4>
      <h6 class="text-center">Số điểm: ${player.score}</h6>
    </div>
  </div>
    `;
  });
  section_player.innerHTML = html;
}
