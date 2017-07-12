import jQuery from 'jquery';
import 'jquery-ui-browserify';

$('.js-ui-datepicker').one('focus', function() {
  $(this)
    .datepicker({
      minDate: 0,
      showButtonPanel: true,
    })
    .datepicker('show');
});
