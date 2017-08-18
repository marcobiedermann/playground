import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { curveBasis, line } from 'd3-shape';
import { transition } from 'd3-transition';

const defaults = {
  width : 500,
  height: 370,
  margin: {
    top   : 15,
    right : 0,
    bottom: 35,
    left  : 60
  },
  axis: true,
  axisPadding: 5,
  xTicks: 5,
  yTicks: 3,
  lineCurve: curveBasis
};

class LineChart {

  constructor(element, options) {
    Object.assign(this, defaults, options);

    this.element = element;
    this.init();

    this.onResize = this.onResize.bind(this);
    this.addEventListeners();
  }

  init() {
    const { margin } = this;
    const [ innerWidth, innerHeight ] = this.dimensions();

    const svg = this.svg = select(this.element)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const scaleX = this.scaleX = scaleTime()
      .range([0, innerWidth]);

    const scaleY = this.scaleY = scaleLinear()
      .range([innerHeight, 0]);

    const xAxis = this.xAxis = axisBottom(scaleX)
      .ticks(this.xTicks)
      .tickPadding(8);

    const yAxis = this.yAxis = axisLeft(scaleY)
      .ticks(this.yTicks)
      .tickPadding(8);

    svg
      .append('g')
        .attr('class', 'chart__axis chart__axis--x')
        .attr('transform', `translate(0, ${innerHeight + this.axisPadding})`)
        .call(xAxis);

    svg
      .append('g')
        .attr('class', 'chart__axis chart__axis--y')
        .attr('transform', `translate(${-this.axisPadding}, 0)`)
        .call(yAxis);

    svg
      .append('path')
        .attr('class', 'chart__line')

    this.line = line()
      .curve(this.lineCurve)
      .x(data => scaleX(data.date))
      .y(data => scaleY(data.value));
  }

  dimensions() {
    const { margin } = this;

    return [
      this.width - margin.left - margin.right,
      this.height - margin.top - margin.bottom
    ];
  }

  renderAxis(data, options) {
    let { svg } = this;

    svg = options.animate ? svg.transition() : svg;

    svg
      .select('.chart__axis--x')
      .call(this.xAxis);

    svg
      .select('.chart__axis--y')
      .call(this.yAxis);
  }

  renderLine(data, options) {
    this.svg
      .select('.chart__line')
      .data([data])
      .transition()
      .attr('d', this.line);
  }

  render(data, options = {}) {
    this.scaleX.domain(extent(data, data => data.date));
    this.scaleY.domain(extent(data, data => data.value));

    if (this.axis) {
      this.renderAxis(data, options);
    }

    this.renderLine(data, options);
  }

  update(data, options) {
    this.render(data, {
      animate: true
    });
  }

  onResize() {
    console.log('Resizing …');
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }

}

export default LineChart;
