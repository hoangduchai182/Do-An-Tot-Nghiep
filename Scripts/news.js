'use strict';

// kiểm tra login hay không
// if (isLogin()) {
const news_container = document.getElementById('news-container');
const btn_prev = document.getElementById('btn-prev');
const btn_next = document.getElementById('btn-next');
const page_num = document.getElementById('page-num');

// hàm lấy API
// Gọi 3 tham số: category và pagesize dùng để dùng cho phần setting
// tham số page dùng cho chuyển trang
async function getAPI(category, page, pageSize) {
  // Lấy API
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&category=${category}&country=us&page=${page}&pageSize=${pageSize}&apiKey=38d44a83eba0446892ececdfbdf45d80`
  );
  // console.log(response);
  // console.log(response.type);
  const data = await response.json();

  // console.log(data);
  // Hiển thi các bài viết
  renderData(data, pageSize);
}

// Hiển thị các bài viết được đặt các thuộc tính mặc định
getAPI(userLogin.category, userLogin.page, userLogin.pagesize);
// Hàm hiển thị các bài viết, lấy 2 tham số là pagesize và mảng chứa dữ liệu
function renderData(data, pageSize) {
  // Tổng số bài viết lấy được
  const totalResults = data.totalResults;
  // Kiểm tra nếu trang là trang đầu
  // Ẩn nút Previous đi
  page == 1
    ? btn_prev.classList.add('d-none')
    : btn_prev.classList.remove('d-none');

  // 2 trường hợp, nếu tổng số bài chia hết số bài 1 trang thì trang cuối sẽ ẩn nút next
  // còn nếu chia dư thì nút next sẽ ẩn ở trang cuối cộng 1
  if (totalResults % pageSize != 0) {
    page == Math.floor(totalResults / pageSize) + 1
      ? // ẩn nút next
        btn_next.classList.add('d-none')
      : btn_next.classList.remove('d-none');
  } else {
    page == totalResults / pageSize
      ? btn_next.classList.add('d-none')
      : btn_next.classList.remove('d-none');
  }

  // Khởi tạo phần tử chứa thông tin 1 bài viết
  let html = '';
  // Chạy từng phần tử trong mảng
  // vì data chứa nhiều thuộc tính và thuộc tính articles là một mảng nên xét duyệt từng phần tử trong mảng
  data.articles.forEach(el => {
    // Tạo phần tử html giống hệt như trong file news.html
    html += `
    <div class="flex-row bg-hover-white flex-wrap text-light border border-light rounded-2 m-3 p-3">
      <div class="">
        <div class="d-flex align-items-center mb-1">
          <div class="col-md-4 me-1">
            <img src=${el.urlToImage} class="card-img"/>
          </div>
          <div class="col-md-8 ms-1">
              <p class="card-title fs-10 fw-bold m-0">${el.title}</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center fs-10">
          <p class="">${el.description}</p>
          <a href=${el.url} class="text-light text-decoration-none text-center bg-primary bg-hover-blue w-50 p-1 rounded-2">View</a>
        </div>
      </div>
    </div>
    `;
  });

  // console.log(news_container);
  // Thêm vào container là hiển thị
  news_container.innerHTML = html;
}

// sự kiện nút chuyển về 1 trang
btn_prev.addEventListener('click', function () {
  // Biến page được khai báo trong file storage
  page = page - 1;
  page_num.innerHTML = page;
  // in lại trang
  getAPI(userLogin.category, page, userLogin.pagesize);
});

// sự kiện nút chuyển tiếp 1 trang
btn_next.addEventListener('click', function () {
  page = page + 1;
  page_num.innerHTML = page;
  getAPI(userLogin.category, page, userLogin.pagesize);
});
// }
