import jQuery from 'jquery';
import 'jquery-ui-browserify';

$('.js-ui-accordion').accordion({
  activate: (event, ui) => {
    const newHeaderId = ui.newHeader.attr('id');

    if (newHeaderId) {
      window.location.hash = newHeaderId;
    }
  },
  create: function(event, ui) {
    const $this = $(this);

    $this.accordion('option', 'active', $this.find($this.accordion('option', 'header')).index($(window.location.hash)));
  },
  collapsible: true,
  heightStyle: 'content'
});
