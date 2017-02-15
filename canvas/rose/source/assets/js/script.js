import Rose from './rose';

const rose = new Rose('.js-rose');

function onInput() {
  const { id, name, value } = this;

  document.querySelector(`label[for="${id}"]`).innerHTML = `${name} = ${value}`;

  rose.update({
    [name]: +value
  });
}

Array.from(document.querySelector('.js-form').elements).forEach(element => {
  element.addEventListener('input', onInput);
});
