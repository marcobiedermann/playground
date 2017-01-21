import imagesLoaded from 'imagesloaded';
import Isotope      from 'isotope-layout';

imagesLoaded('.js-isotope', () => {
  let filterValue = localStorage.getItem('isotope-filter');
  let sortValue   = localStorage.getItem('isotope-sort');
  let sortData = {};

  const isotopeFilterButtons = Array.from(document.querySelectorAll('.js-isotope-filter-button'));
  const itotopeSortButtons   = Array.from(document.querySelectorAll('.js-isotope-sort-button'));

  function isotopeFilter() {
    isotopeFilterButtons.forEach(isotopeFilterButton => isotopeFilterButton.classList.remove('is-active'));
    this.classList.add('is-active');
    filterValue = this.getAttribute('data-filter');

    localStorage.setItem('isotope-filter', filterValue);

    isotope.arrange({
      filter: filterValue
    });
  }

  function isotopeSort() {
    itotopeSortButtons.forEach(itotopeSortButton => itotopeSortButton.classList.remove('is-active'));
    this.classList.add('is-active');
    sortValue = this.getAttribute('data-sort');

    localStorage.setItem('isotope-sort', sortValue);

    isotope.arrange({
      sortBy: sortValue
    });
  }

  isotopeFilterButtons.forEach(isotopeFilterButton => {
    if (filterValue) {
      isotopeFilterButton.classList.remove('is-active');
    }

    isotopeFilterButton.addEventListener('click', isotopeFilter);
  });

  itotopeSortButtons.forEach(isotopeSortButton => {
    const isotopeSortButtonData = isotopeSortButton.getAttribute('data-sort');

    if (sortValue) {
      isotopeSortButton.classList.remove('is-active')
    }

    sortData[isotopeSortButtonData] = `.${isotopeSortButtonData}`;
    isotopeSortButton.addEventListener('click', isotopeSort);
  });

  if (filterValue) {
    document.querySelector(`.js-isotope-filter-button[data-filter='${filterValue}']`).classList.add('is-active');
  }

  if (sortValue) {
    document.querySelector(`.js-isotope-sort-button[data-sort='${sortValue}']`).classList.add('is-active');
  }

  const isotope = new Isotope(document.querySelector('.js-isotope-layout'), {
    filter      : filterValue,
    getSortData : sortData,
    itemSelector: '.js-isotope-item',
    sortBy      : sortValue
  });

});
