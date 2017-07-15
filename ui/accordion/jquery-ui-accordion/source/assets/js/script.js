import jQuery from 'jquery';
import 'jquery-ui-browserify';

const $uiAccordion = $('.js-ui-accordion');

$uiAccordion.accordion({
  collapsible: true,
  heightStyle: 'content',

  activate: (event, ui) => {
    const newHeaderId = ui.newHeader.attr('id');

    if (newHeaderId) {
      history.pushState(null, null, `#${newHeaderId}`);
    }
  },

  create: (event, ui) => {
    const $this            = $(event.target);
    const $activeAccordion = $(window.location.hash);

    if ($this.find($activeAccordion).length) {
      $this.accordion('option', 'active', $this.find($this.accordion('option', 'header')).index($activeAccordion));
    }
  }
});

$(window).on('hashchange', event => {
  const $activeAccordion = $(window.location.hash);
  const $parentAccordion = $activeAccordion.parents('.js-ui-accordion')

  if ($activeAccordion.length) {
    $parentAccordion.accordion('option', 'active', $parentAccordion.find($uiAccordion.accordion('option', 'header')).index($activeAccordion));
  }
});
