function includeHTML(file, id) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).insertAdjacentHTML('afterbegin', html);
    })
    .catch(error => console.log('Error loading:', error));
}
includeHTML('../HTML/head.html', 'head');
includeHTML('../HTML/header.html', 'header');
includeHTML('../HTML/content-20-1.html', 'content-20-1');
// includeHTML('../HTML/content-60.html', 'content-60');
includeHTML('../HTML/footer.html', 'footer');
