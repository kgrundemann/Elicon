function toggleMenu() {
  var mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.style.display =
    mobileMenu.style.display === 'flex' ? 'none' : 'flex';
}

// POPUP
let popup = document.querySelector('.popup-wrapper');
let popupForm = document.querySelector('.popup-form');
let popupBtn = document.querySelector('.popup-open');
let popupClose = document.querySelector('.close-btn');

popupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showPopup();
});

popupClose.addEventListener('click', (e) => {
  e.preventDefault();
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

// END OF POPUP

//SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// END OF SMOOTH SCROLLING
