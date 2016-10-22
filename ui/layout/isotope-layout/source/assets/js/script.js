import imagesLoaded from 'imagesloaded';
import Isotope      from 'isotope-layout';

const isotopeFilterButtons = document.querySelectorAll('.js-isotope-filter-button');
const isotopeSortButtons   = document.querySelectorAll('.js-isotope-sort-button');

let isotope;
let filterValue = localStorage.getItem('isotope-filter');
let sortValue   = localStorage.getItem('isotope-sort');

imagesLoaded('.js-isotope', () => {

  isotope = new Isotope(document.querySelector('.js-isotope-layout'), {
    itemSelector: '.js-isotope-item',
    filter      : filterValue,
    sortBy      : sortValue,
    getSortData : {
      'js-isotope-sort-age' : '.js-isotope-sort-age',
      'js-isotope-sort-name': '.js-isotope-sort-name'
    }
  });

});

Array.from(isotopeFilterButtons).forEach(isotopeFilterButton => {
  isotopeFilterButton.addEventListener('click', () => {
    filterValue = isotopeFilterButton.getAttribute('data-filter');

    localStorage.setItem('isotope-filter', filterValue)

    isotope.arrange({
      filter: filterValue
    });

  });
});

Array.from(isotopeSortButtons).forEach(isotopeSortButton => {
  isotopeSortButton.addEventListener('click', () => {
    sortValue = isotopeSortButton.getAttribute('data-sort');

    localStorage.setItem('isotope-sort', sortValue)

    isotope.arrange({
      sortBy: sortValue
    });

  });

});
