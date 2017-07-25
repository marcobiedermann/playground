import HeartCurve from './heart-curve.js';

const heartCurve = new HeartCurve(document.querySelector('.js-canvas'));
const gui   = new dat.GUI();

gui.add(heartCurve.options, 'size').min(10).max(200).step(1);
gui.add(heartCurve.options, 'nodes').min(3).max(100).step(1);
gui.add(heartCurve.options, 'a').min(0).max(20).step(0.1);
gui.add(heartCurve.options, 'b').min(0).max(10).step(0.1);
gui.add(heartCurve.options, 'c').min(0).max(10).step(0.1);
gui.add(heartCurve.options, 'b').min(0).max(10).step(0.1);
