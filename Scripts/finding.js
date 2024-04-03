const input_finding = document.getElementById('input-finding');
const btn_finding = document.getElementById('btn-finding');

const hanhdong = document.getElementById('hanhdong');
const haihuoc = document.getElementById('haihuoc');
const giatuong = document.getElementById('giatuong');
const trecon = document.getElementById('trecon');
const phieuluu = document.getElementById('phieuluu');

window.addEventListener('load', function () {
  const changeUserName = () => {
    const account = document.getElementById('account');
    let nameUser = userLogin.firstName + ' ' + userLogin.lastName;
    // account.insertAdjacentHTML('afterbegin', nameUser);
    account.innerHTML = nameUser;
  };
  changeUserName();
});

hanhdong.addEventListener('click', function () {
  addClass(hanhdong);
});
haihuoc.addEventListener('click', function () {
  addClass(haihuoc);
});
giatuong.addEventListener('click', function () {
  addClass(giatuong);
});
trecon.addEventListener('click', function () {
  addClass(trecon);
});
phieuluu.addEventListener('click', function () {
  addClass(phieuluu);
});

btn_finding.addEventListener('click', function () {
  if (input_finding.value != '') {
    filterFinding();
  } else {
    filterByClass();
  }
});

function filterFinding() {
  const keyword = input_finding.value.trim().toLowerCase();

  // Lọc theo class genres
  const genresList = document.getElementsByClassName('genres');
  let gameHasClass = [];
  Array.from(genresList).forEach(genreElement => {
    gameArr.forEach(game => {
      if (game.genres.includes(genreElement.innerHTML.trim())) {
        gameHasClass.push(game);
      }
    });
  });

  // Lọc theo từ khóa tìm kiếm
  const gameByKey = gameArr.filter(game => {
    return (
      game.name.toLowerCase().includes(keyword) ||
      game.description.toLowerCase().includes(keyword)
    );
  });

  // Kết hợp hai mảng đã lọc
  const gameFilter = [...gameHasClass, ...gameByKey];

  // Loại bỏ các phần tử trùng lặp
  const finalGamesArr = gameFilter.filter((game, index, self) => {
    return index === self.findIndex(t => t.name === game.name);
  });

  addNewGame(finalGamesArr);
  addNumberPlayed();
}
function addNewGame(arr) {
  const section_game = document.getElementById('section-game');
  let html = '';
  arr.forEach(game => {
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
      <div class="d-flex justify-content-end">
        <a
          id="${game.id}"
          class="d-flex text-decoration-none align-items-center btn-play me-3"
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

function filterByClass() {
  const genresList = document.getElementsByClassName('genres');
  let gameHasClass = [];
  Array.from(genresList).forEach(genreElement => {
    gameArr.forEach(game => {
      if (game.genres.includes(genreElement.innerHTML.trim())) {
        gameHasClass.push(game);
      }
    });
  });
  addNewGame(gameHasClass);
}

function addClass(genres) {
  const hasClass = genres.classList.contains('genres');
  if (hasClass) {
    genres.classList.remove('genres');
  } else {
    genres.classList.add('genres');
  }
}
