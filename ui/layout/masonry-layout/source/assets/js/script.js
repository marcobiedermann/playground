import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

imagesLoaded('.js-images-loaded', () => {
  const masonry = new Masonry(document.querySelector('.js-masonry'), {
    itemSelector: '.js-masonry-item',
  });

  document.body.classList.remove('is-loading');
});
