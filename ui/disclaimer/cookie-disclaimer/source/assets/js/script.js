const $$cookieDisclaimer = document.querySelector('.js-cookie-disclaimer');

if (!window.localStorage.getItem('cookieDisclaimer')) {
  $$cookieDisclaimer.classList.add('is-active');
}

$$cookieDisclaimer.querySelector('button').addEventListener('click', () => {
  window.localStorage.setItem('cookieDisclaimer', true);
  $$cookieDisclaimer.classList.remove('is-active');
});
