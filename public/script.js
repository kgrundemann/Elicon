const mobileMenu = document.getElementById('mobileMenu');
const popup = document.querySelector('.popup-wrapper');
const popupForm = document.querySelector('.popup-form');
const popupBtn = document.querySelector('.popup-open');
const popupClose = document.querySelector('.close-btn');

const contactForm = document.querySelector('.popup-form');
const contactName = document.getElementById('name');
const contactEmail = document.getElementById('email');
const contactSubject = document.getElementById('subject');
const contactMessage = document.getElementById('message');

function toggleMenu() {
  mobileMenu.style.display =
    mobileMenu.style.display === 'flex' ? 'none' : 'flex';
}

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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: contactName.value,
    email: contactEmail.value,
    subject: contactSubject.value,
    message: contactMessage.value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText === 'Email sent successfully') {
      Swal.fire({
        icon: 'success',
        title: 'Email wysłano pomyślnie!',
        text: 'Twoja wiadomość została wysłana.',
      });
      contactName.value = '';
      contactEmail.value = '';
      contactSubject.value = '';
      contactMessage.value = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: 'Coś poszło nie tak. Wiadomość nie została wysłana.',
      });
    }
  };
  xhr.send(JSON.stringify(formData));
});
