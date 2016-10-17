import imagesLoaded from 'imagesloaded';
import Masonry      from 'masonry-layout';

imagesLoaded('.js-masonry', () => {
  new Masonry(document.querySelector('.js-masonry'), {
    itemSelector: '.js-masonry-item'
  });
});
