import FormStorage from './form-storage';

Array.from(document.querySelectorAll('.js-form-storage')).map(form => {
  new FormStorage(form);
});
