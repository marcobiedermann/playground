import WorldMap from './d3-worldmap.js';

const worldmap = new WorldMap('.js-worldmap');

fetch('data/world/110m.json')
  .then(response => response.json())
  .then(data => worldmap.render(data));

// fetch('data/world/10m.json')
//   .then(response => response.json())
//   .then(data => worldmap.renderStates(data));

// fetch('data/world/cities.json')
//   .then(response => response.json())
//   .then(data => worldmap.renderMarkers(data));