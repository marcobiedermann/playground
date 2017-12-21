import {
  select,
  selectAll,
} from 'd3-selection';
import {
  geoAlbersUsa,
  geoMercator,
  geoPath,
} from 'd3-geo';
import {
  feature,
} from 'topojson-client';

class WorldMap {
  constructor(element, options) {
    const defaults = {
      width: 1200,
      height: 780,
      scale: 100,
    };

    Object.assign(this, options, defaults);
    this.element = element;

    this.init();
  }

  init() {
    const {
      element, width, height, scale,
    } = this;
    const svg = this.svg = select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.append('g')
      .attr('class', 'countries');

    this.projection = geoMercator()
      .scale(scale)
      .translate([width / 2, height / 2]);
  }

  renderCountries(data) {
    const { svg, projection } = this;

    const country = svg.selectAll('.country')
      .data(data);

    const length = data.length;

    country.enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', data => geoPath().projection(projection)(data))
      .attr('fill', (data, index) => `rgba(38, 50, 56, ${1 / length * index})`);
  }

  renderStates(data) {
    data = feature(data, data.objects.states).features;

    const { svg } = this;
    const projection = geoAlbersUsa().scale(100);

    svg.selectAll('.state')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', data => geoPath().projection(projection)(data));
  }

  renderMarkers(data) {
    const { svg, projection } = this;

    const marker = svg.selectAll('.marker')
      .data(data);

    marker.enter()
      .append('circle')
      .attr('class', 'marker')
      .attr('cx', data => projection(data.coordinates)[0])
      .attr('cy', data => projection(data.coordinates)[1])
      .attr('r', data => data.population / 3000000);
  }

  render(data) {
    console.log(data);
    data = feature(data, data.objects.countries).features;

    this.renderCountries(data);
    // this.renderMarkers(worldData);
  }
}

export default WorldMap;
