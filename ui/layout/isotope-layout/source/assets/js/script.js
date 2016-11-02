import imagesLoaded from 'imagesloaded';
import Isotope      from 'isotope-layout';

imagesLoaded('.js-isotope', () => {
  let filterValue = localStorage.getItem('isotope-filter');
  let sortValue   = localStorage.getItem('isotope-sort');
  let sortData = {};

  Array.from(document.querySelectorAll('.js-isotope-filter-button')).forEach(isotopeFilterButton => {
    isotopeFilterButton.addEventListener('click', () => {
      filterValue = isotopeFilterButton.getAttribute('data-filter');

      localStorage.setItem('isotope-filter', filterValue);

      isotope.arrange({
        filter: filterValue
      });

    });
  });

  Array.from(document.querySelectorAll('.js-isotope-sort-button')).forEach(isotopeSortButton => {
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

  const isotope = new Isotope(document.querySelector('.js-isotope-layout'), {
    filter      : filterValue,
    getSortData : sortData,
    itemSelector: '.js-isotope-item',
    sortBy      : sortValue
  });

});
