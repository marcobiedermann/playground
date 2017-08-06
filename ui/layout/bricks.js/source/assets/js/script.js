import Bricks       from 'bricks.js';
import imagesLoaded from 'imagesloaded';

imagesLoaded('.js-images-loaded', () => {
  const bricks = Bricks({
    container: '.js-bricks',
    packed: 'data-packed',
    position: false,
    sizes: [
      {
        columns: 2,
        gutter: 10
      },
      {
        columns: 3,
        gutter: 10,
        mq: '480px'
      },
      {
        columns: 4,
        gutter: 10,
        mq: '768px'
      }
    ]
  }).resize(true);
});
