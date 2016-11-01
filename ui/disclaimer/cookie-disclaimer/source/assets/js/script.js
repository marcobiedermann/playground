const $$cookie = document.querySelector('.js-cookie-disclaimer');

if (!window.localStorage.getItem('cookieDisclaimer')) {
  $$cookie.classList.add('is-active');
}

$$cookie.querySelector('button').addEventListener('click', () => {
  window.localStorage.setItem('cookieDisclaimer', true);
  $$cookie.classList.remove('is-active');
});
