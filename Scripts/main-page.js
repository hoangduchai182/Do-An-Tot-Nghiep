window.addEventListener('load', function () {
  const changeUserName = () => {
    const account = document.getElementById('account');
    let nameUser = userLogin.firstName + ' ' + userLogin.lastName;
    // account.insertAdjacentHTML('afterbegin', nameUser);
    account.innerHTML = nameUser;
  };
  changeUserName();
  addNewGame();
  addNumberPlayed();
});

function addNewGame() {
  const section_game = document.getElementById('section-game');

  let html = '';

  gameArr.forEach(game => {
    html += `
    <div class="section-game d-flex text-light p-3 m-5">
    <div class="game-image d-flex align-items-center w-40">
      <img class="rounded-1" src="${game.image}" alt="" />
    </div>
    <div class="w-60 ms-3">
      <h1
        class="d-flex justify-content-center"
        style="font-family: 'Nabla', system-ui"
      >
        ${game.name}
      </h1>
      <p class="game-description">
      ${game.description}
      </p>
      <div class="d-flex justify-content-center">
        <a
          id="${game.id}"
          class="d-flex text-decoration-none align-items-center btn-play me-3"
          href="${game.linkPlay}"
          ><span class="material-symbols-outlined me-1">
            stadia_controller </span
          >Chơi ngay</a
        >
        <a
          class="d-flex text-decoration-none align-items-center btn-play me-3"
          href="${game.linkStory}"
          ><span class="material-symbols-outlined me-1"> book </span>Cốt
          truyện</a
        >
      </div>
    </div>
  </div>
    `;
  });

  section_game.innerHTML = html;
}
