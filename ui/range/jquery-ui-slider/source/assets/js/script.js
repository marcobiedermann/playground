import jQuery from 'jquery';
import 'jquery-ui-browserify';

const $priceMin = $('.js-price-min');
const $priceMax = $('.js-price-max');
const $uiSlider = $('.js-ui-slider');

$uiSlider.slider({
  max: 100,
  min: 0,
  // orientation: 'vertical',
  range: true,
  values: [10, 90],
  slide: (event, ui) => {
    $priceMin.val(ui.values[0]);
    $priceMax.val(ui.values[1]);
  },
});

$priceMin.val($uiSlider.slider('values', 0));
$priceMax.val($uiSlider.slider('values', 1));
