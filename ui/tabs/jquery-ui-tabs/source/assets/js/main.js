import $ from 'jquery';
import 'jquery-ui/ui/widgets/tabs';

$('.js-ui-tabs').tabs({
  activate: (event, ui) => {
    window.location.hash = ui.newPanel.attr('id');
  },
  select: (event, ui) => {
    window.location.hash = ui.tab.hash;
  },
});
