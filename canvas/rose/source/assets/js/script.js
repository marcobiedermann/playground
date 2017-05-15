import Rose from './rose';

const rose = new Rose(document.querySelector('.js-rose'));
const gui = new dat.GUI();

gui.add(rose.options, 'n').min(1).max(10).step(1);
gui.add(rose.options, 'd').min(1).max(10).step(1);
gui.add(rose.options, 'nodes').min(1).max(100).step(1);
gui.add(rose.options, 'amplitude').min(1).max(300).step(1);
