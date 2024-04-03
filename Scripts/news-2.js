'use strict';

if (isLogin()) {
  const news_container = document.getElementById('news-container');

  async function getAPI(category) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&category=${category}&country=us&apiKey=38d44a83eba0446892ececdfbdf45d80`
    );
    const data = await response.json();
    renderData(data);
  }

  getAPI(userLogin.category);

  function renderData(data) {
    let html = '<h1 class="mb-4 text-light text-center">Tin Tức</h1>';
    data.articles.forEach(el => {
      html += `
        <div class="card m-3">
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src=${el.urlToImage} class="card-img"/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${el.title}</h5>
                  <p class="card-text">${el.description}</p>
                  <a href=${el.url} class="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    news_container.innerHTML = html;
  }

  function setting() {
    const input_page_size = document.getElementById('input-page-size');
    const input_category = document.getElementById('input-category');
    const btn_submit = document.getElementById('btn-submit');

    // Hiện pagesize lên input khi vào setting
    input_page_size.value = userLogin.pagesize;
    // Hiện thị category
    input_category.value = userLogin.category;

    btn_submit.addEventListener('click', function () {
      if (validate()) {
        if (confirm('Bạn có chắc chắn lưu ?')) {
          // Lưu lại thông tin được nhập từ input vào trong mảng
          userLogin.pagesize = input_page_size.value;
          userLogin.category = input_category.value;
          // Lưu vào storage của thông tin đăng nhập
          saveToStorage(KEY_LOGIN, userLogin);

          // Tìm kiếm phàn tử có cùng UserName
          const change = users.find(el => el.userName == userLogin.userName);
          // Thay đổi dữ liệu trong phần tử đó theo input
          change.pagesize = input_page_size.value;
          change.category = input_category.value;
          // Thay phần tử đó vào mảng
          users[users.indexOf(change)] = change;
          // Lưu lại
          saveToStorage(KEY, users);

          alert('Bạn đã lưu thay đổi !');

          window.location.href = '../Page/news.html';
        }
      }
    });

    // Hàm kiểm tra dữ liệu
    function validate() {
      // kiểm tra người dùng đã nhập input hay chưa
      if (input_page_size.value == '') {
        alert('Hãy nhập số bài hiển thị trên trang !');
        return false;
        // nếu số trang nhỏ hơn 0 thì nhập lại
      } else if (input_page_size.value <= 0) {
        alert('Số bài viết trên trang Web phải lớn hơn 0 !');
        return false;
      } else {
        return true;
      }
    }
  }
  setting();
}
