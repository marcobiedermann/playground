import FormStorage from './form-storage';

Array.from(document.querySelectorAll('.js-form-storage')).forEach(form => {
  new FormStorage(form);
});
