import imagesLoaded from 'imagesloaded';
import Masonry      from 'masonry-layout';

imagesLoaded('.js-images-loaded', () => {
  new Masonry(document.querySelector('.js-masonry'), {
    itemSelector: '.js-masonry-item'
  });
});
