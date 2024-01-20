let popup = document.querySelector('.popup-wrapper');
let popupForm = document.querySelector('.popup-form');
let popupBtn = document.querySelector('.popup-open');
let popupClose = document.querySelector('.close-btn');

popupBtn.addEventListener('click', (e) => {
  e.preventDefault;
  showPopup();
});

popupClose.addEventListener('click', (e) => {
  e.preventDefault;
  removePopup();
});

popupForm.addEventListener('submit', () => {
  removePopup();
});

popup.addEventListener('click', (e) => {
  let target = e.target;
  if (target.classList.contains('popup-wrapper')) {
    removePopup();
  } else return;
});

function showPopup() {
  popup.classList.add('active');
  bodyScroll();
}

function removePopup() {
  popup.classList.remove('active');
  bodyScroll();
}

function bodyScroll() {
  document.body.classList.toggle('no-scroll');
}
