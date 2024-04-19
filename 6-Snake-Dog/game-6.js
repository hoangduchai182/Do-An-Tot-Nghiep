const btn_submit_comment = document.getElementById("btn-submit-comment");
const input_comment = document.getElementById("input-comment");
const comment_game = document.getElementById("comment-game");

window.addEventListener("load", function () {
  const changeIconName = () => {
    let iconUserComment = document.getElementById("icon-user-comment");
    iconUserComment.textContent = userLogin.lastName.charAt(0);
  };

  const changeUserName = () => {
    const account = document.getElementById("account");
    let nameUser = userLogin.firstName + " " + userLogin.lastName;
    account.innerHTML = nameUser;
  };
  changeIconName();
  changeUserName();
});

function renderComment() {
  let html = "";
  gameArr[5].comment.forEach((com) => {
    html += `
    <div class="comment-player d-flex align-items-center m-3">
      <p
        class="icon-user-comment bg-warning d-flex justify-content-center align-items-center p-4 mb-0"
      >
        ${com.user}
      </p>
      <div class="ms-2">
        <div class="d-flex">
          <h4 class="mb-0 text-light">${com.name}</h4>
          <p class="mb-0 ms-3 fs-10 d-flex align-items-center">
            ${com.time}
          </p>
        </div>
        <p class="mb-0">${com.comment}</p>
      </div>
    </div>
  `;
  });

  comment_game.innerHTML = html;
}
renderComment();

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

btn_submit_comment.addEventListener("click", function () {
  gameArr[5].comment.push({
    user: userLogin.lastName.charAt(0),
    name: userLogin.firstName + " " + userLogin.lastName,
    time: getCurrentTime(),
    comment: input_comment.value,
  });

  saveToStorage(KEY_GAME, gameArr);

  input_comment.value = "";
  window.location.href = "../6-Snake-Dog/Snake-dog.html";
});
