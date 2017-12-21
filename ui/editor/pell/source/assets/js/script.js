import pell from 'pell';

pell.init({
  element: document.querySelector('.js-pell'),
  onChange: (html) => {
    document.querySelector('.js-pell-output').value = html;
  },
});
