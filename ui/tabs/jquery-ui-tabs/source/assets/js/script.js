import jQuery from 'jquery';
import 'jquery-ui-browserify';

$('.js-ui-tabs').tabs({
  activate: (event, ui) => {
    window.location.hash = ui.newPanel.attr('id');
  },
  select: (event, ui) => {
    window.location.hash = ui.tab.hash;
  }
});
