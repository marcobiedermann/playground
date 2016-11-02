import imagesLoaded from 'imagesloaded';
import Isotope      from 'isotope-layout';

const isotopeFilterButtons = document.querySelectorAll('.js-isotope-filter-button');
const isotopeSortButtons   = document.querySelectorAll('.js-isotope-sort-button');

imagesLoaded('.js-isotope', () => {
  let isotope;
  let filterValue = localStorage.getItem('isotope-filter');
  let sortValue   = localStorage.getItem('isotope-sort');
  let sortData = {};

  Array.from(isotopeFilterButtons).forEach(isotopeFilterButton => {
    isotopeFilterButton.addEventListener('click', () => {
      filterValue = isotopeFilterButton.getAttribute('data-filter');

      localStorage.setItem('isotope-filter', filterValue);

      isotope.arrange({
        filter: filterValue
      });

    });
  });

  Array.from(isotopeSortButtons).forEach(isotopeSortButton => {
    const isotopeSortButtonData = isotopeSortButton.getAttribute('data-sort');

    sortData[isotopeSortButtonData] = `.${isotopeSortButtonData}`;

    isotopeSortButton.addEventListener('click', () => {
      sortValue = isotopeSortButtonData;

      localStorage.setItem('isotope-sort', sortValue);

      isotope.arrange({
        sortBy: sortValue
      });

    });

  });

  isotope = new Isotope(document.querySelector('.js-isotope-layout'), {
    filter      : filterValue,
    getSortData : sortData,
    itemSelector: '.js-isotope-item',
    sortBy      : sortValue
  });

});
