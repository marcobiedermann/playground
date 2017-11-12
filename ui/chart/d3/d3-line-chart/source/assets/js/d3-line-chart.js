import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { curveBasis, line } from 'd3-shape';
import { transition } from 'd3-transition';

class D3LineChart {
  constructor(element, options) {
    const defaults = {
      width: 500,
      height: 370,
      margin: {
        top: 15,
        right: 0,
        bottom: 35,
        left: 60,
      },
      axis: true,
      axisPadding: 5,
      xTicks: 5,
      yTicks: 3,
      lineCurve: curveBasis,
    };

    Object.assign(this, defaults, options);

    this.element = element;
    this.init();

    this.onResize = this.onResize.bind(this);
    this.addEventListeners();
  }

  init() {
    const {
      margin,
    } = this;
    const [innerWidth, innerHeight] = this.dimensions();

    this.svg = select(this.element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.scaleX = scaleTime()
      .range([0, innerWidth]);

    this.scaleY = scaleLinear()
      .range([innerHeight, 0]);

    this.xAxis = axisBottom(this.scaleX)
      .ticks(this.xTicks)
      .tickPadding(8);

    this.yAxis = axisLeft(this.scaleY)
      .ticks(this.yTicks)
      .tickPadding(8);

    this.svg
      .append('g')
      .attr('class', 'chart__axis chart__axis--x')
      .attr('transform', `translate(0, ${innerHeight + this.axisPadding})`)
      .call(this.xAxis);

    this.svg
      .append('g')
      .attr('class', 'chart__axis chart__axis--y')
      .attr('transform', `translate(${-this.axisPadding}, 0)`)
      .call(this.yAxis);

    this.svg
      .append('path')
      .attr('class', 'chart__line');

    this.line = line()
      .curve(this.lineCurve)
      .x(data => this.scaleX(data.date))
      .y(data => this.scaleY(data.value));
  }

  dimensions() {
    const { margin } = this;

    return [
      this.width - margin.left - margin.right,
      this.height - margin.top - margin.bottom,
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

  renderLine(data) {
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

  update(data) {
    this.render(data, {
      animate: true,
    });
  }

  onResize() {
    console.log('Resizing …');
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }
}

export default D3LineChart;
