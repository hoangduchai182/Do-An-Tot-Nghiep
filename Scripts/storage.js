'use strict';

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ Storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Tạo các mảng sử dụng trong nhiều trang
const KEY = 'USER_ARRAY';
const users = getFromStorage(KEY) ? getFromStorage(KEY) : [];

// Lấy dữ liệu từ storage (dữ liệu dưới dạng js object)
// chuyển dữ liệu từ JS object thành class instance

const KEY_LOGIN = 'currentUser';
const userLogin = getFromStorage(KEY_LOGIN) ? getFromStorage(KEY_LOGIN) : [];

//game
const KEY_GAME = 'games';
const gameArr = getFromStorage(KEY_GAME) ? getFromStorage(KEY_GAME) : [];

// khai báo biến Page là số trang đang được hiển thị
// Khai báo trong file storage để sử dụng cho file news và file search
let page = 1;

// Do lưu xuống storage là lưu JS object mà không phải class instance
// Hàm chuyển từ JS object thành class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord,
    // Khởi tạo thêm 2 thuộc tính mặc định khi tạo 1 tài khoản mới là category và pagesize
    // Sử dụng trong file setting
    userData.category,
    userData.pagesize,
    userData.score
  );
  return user;
}

// Hàm kiểm tra xem người dùng đã login hay không để vào các chức năng khác
function isLogin() {
  // Kiểm tra bằng độ dài mảng login nếu bằng 0 là chưa login
  if (userLogin.length == 0) {
    alert('Bạn phải đăng nhập để thực hiện chức năng này !');
    window.location.href = '../Page/login.html';
    return false;
  }
  return true;
}

function addGame() {
  const game1 = new Game(
    'flappybird',
    'Flappy Bird',
    '../images/flappy-bird-image.png',
    '../1-Flappy-Bird/Flappy-Bird.html',
    '../1-Flappy-Bird/Flappy-Bird.html',
    'Mở đầu là một chú chim lông vàng tên là Freddie, sống trong một thế giới rộng lớn nơi các loài chim bay tự do. Freddie là một chú chim trẻ, tò mò và đầy năng lượng. Nhưng có một điều khác biệt với Freddie so với những chú chim khác, anh ta luôn mơ ước vượt qua những giới hạn và bay cao hơn bất kỳ ai.',
    [],
    [],
    0
  );
  const game2 = new Game(
    'shadowdog',
    'Shadow Dog',
    '../images/Shadow-dog.png',
    '../2-Dog-shadow/Shadow-Dog.html',
    '../2-Dog-shadow/Shadow-Dog.html',
    ' Bạn sẽ đắm chìm vào cuộc phiêu lưu kỳ diệu cùng với một chú chó đen tinh nghịch và dũng cảm. Đất nước đã bị xâm chiếm bởi những quái vật đáng sợ, con dơi quỷ dữ, chim hung ác cho đến cây ăn thịt khát máu. Nhưng chú chó của chúng ta không chịu khuất phục! Với sự can đảm và khả năng nhảy lên cao, chú sẽ phải vượt qua hàng loạt thử thách nguy hiểm để giải cứu đồng bọn và tái lập hòa bình cho thế giới của mình.',
    [],
    [],
    0
  );
  const game3 = new Game(
    'eggmonster',
    'Egg Monster',
    '../images/Egg-monster.png',
    '../3-Egg-monster/Egg-Monster.html',
    '../3-Egg-monster/Egg-Monster.html',
    'Bạn sẽ nhập vai vào một quái vật đáng yêu và độc đáo, nhiệm vụ của bạn là chăm sóc những quả trứng quý giá ngẫu nhiên trên bản đồ. Cứ mỗi khoảng thời gian nhất định, những quả trứng này sẽ nở ra ấu trùng, và bạn phải bảo vệ và dẫn chúng trở về rừng an toàn. Nhưng sẽ không dễ dàng chút nào! Trên đường đi về, những con quái vật khát máu sẽ đợi chờ để tấn công và ăn thịt ấu trùng của bạn. Hãy cẩn thận và sẵn sàng bảo vệ chúng bằng mọi cách có thể!',
    [],
    [],
    0
  );
  const game4 = new Game(
    'seahorsesgun',
    'Seahorses Gun',
    '../images/Logo-Horses.png',
    '../4-Seahorses-gun/Seahorses-gun.html',
    '../4-Seahorses-gun/Seahorses-gun.html',
    'Trò chơi hành động và phiêu lưu đỉnh cao trong thế giới đầy màu sắc và nguy hiểm của các cửa hàng hồ nước lớn.Bạn sẽ nhập vai vào một con cá ngựa máy không gian, sở hữu sức mạnh phi thường và vũ khí tối tân, sẵn sàng đối đầu với những kẻ thù đáng sợ đang tiến lại gần. Với khả năng di chuyển linh hoạt và bắn lửa mạnh mẽ, bạn sẽ chiến đấu qua các màn chơi đầy thách thức và kịch tính. Từ những cuộc chiến trên mặt nước trong thành phố đang hoang tàn đến các khu vực hẻo lánh dưới đáy hồ sâu thẳm, mỗi cuộc hành trình của bạn sẽ đem lại những trải nghiệm độc đáo và không ngừng kích thích.',
    [],
    [],
    0
  );
  const game5 = new Game(
    'alienshooter',
    'Alien Shooter',
    '../images/logo-Alien-Shooter.png',
    '../5-Alien-shooter/Alien-shooter.html',
    '../5-Alien-shooter/Alien-shooter.html',
    'Bạn đã bao giờ mơ ước được phiêu lưu trong không gian với một chiếc phi thuyền mạnh mẽ, sẵn sàng chinh phục những thế giới ngoại hành tinh chưa từng được khám phá trước đây? Trong trò chơi này, bạn sẽ nhập vai vào một nhà thám hiểm không gian táo bạo, sẵn lòng đối mặt với những thách thức đầy nguy hiểm và bắn hạ những kẻ thù ngoài hành tinh đáng sợ.',
    [],
    [],
    0
  );

  function addGameIfNotExists(game) {
    // Kiểm tra xem game có tồn tại trong mảng gameArr không
    const existingGame = gameArr.find(existing => existing.name === game.name);

    // Nếu game chưa tồn tại, thêm vào mảng
    if (!existingGame) {
      gameArr.push(game);
    }
  }

  addGameIfNotExists(game1);
  addGameIfNotExists(game2);
  addGameIfNotExists(game3);
  addGameIfNotExists(game4);
  addGameIfNotExists(game5);
  game1.genres.push('Trẻ con', 'Phiêu lưu', 'Hài hước');
  game2.genres.push('Hành động', 'Phiêu lưu');
  game3.genres.push('Trẻ con', 'Giả tưởng', 'Hài hước');
  game4.genres.push('Giả tưởng', 'Phiêu lưu', 'Hành động');
  game5.genres.push('Giả tưởng', 'Phiêu lưu');

  saveToStorage(KEY_GAME, gameArr);
}
