import noUiSlider from 'nouislider';

noUiSlider.create(document.querySelector('.js-nouislider'), {
  start: [10, 90],
  connect: true,
  range: {
    min: 0,
    max: 100,
  },
});
