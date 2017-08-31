import { extent, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { easeLinear } from 'd3-ease';
import { scaleTime, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

class BarChart {

  constructor (element, options, data) {
    const defaults = {
      width : 500,
      height: 300,
      margin: {
        top   : 15,
        right : 0,
        bottom: 35,
        left  : 60
      },
      axis: true,
      axisPadding: 5,
      tickSize: 10,
      barPadding: 10,
      ease: easeLinear,
      nice: true,
      type: 'rounded',
      mouseover: () => {},
      mouseleave: () => {}
    };

    Object.assign(this, defaults, options);

    this.element = element;
    this.data = data;

    this.init();

    this.onResize = this.onResize.bind(this);
    this.addEventListeners();
  }

  dimensions() {
    const { margin } = this;

    return [
      this.width - margin.left - margin.right,
      this.height - margin.top - margin.bottom
    ];
  }

  init() {
    const { margin, tickSize, axisPadding } = this;
    const [ innerWidth, innerHeight ] = this.dimensions();

    this.graph = select(this.element)

    const svg = this.svg = this.graph
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const scaleX = this.scaleX = scaleTime()
      .range([0, innerWidth]);

    const scaleY = this.scaleY = scaleLinear()
      .range([innerHeight, 0]);

    const xAxis = this.xAxis = axisBottom(scaleX)
      .ticks(5)
      .tickPadding(8)
      .tickSize(tickSize);

    const yAxis = this.yAxis = axisLeft(scaleY)
      .ticks(3)
      .tickPadding(8)
      .tickSize(tickSize);

    svg
      .append('g')
        .attr('class', 'chart__axis chart__axis--x')
        .attr('transform', `translate(0, ${innerHeight + axisPadding})`)
        .call(xAxis);

    svg
      .append('g')
        .attr('class', 'chart__axis chart__axis--y')
        .attr('transform', `translate(${-axisPadding}, 0)`)
        .call(yAxis);
  }

  renderAxis(data = this.data, options) {
    let { svg } = this;

    svg = options.animate ? svg.transition() : svg;

    svg
      .select('.chart__axis--x')
      .call(this.xAxis);

    svg
      .select('.chart__axis--y')
      .call(this.yAxis);
  }

  renderBars(data = this.data, options) {
    const { svg, scaleX, scaleY, barPadding, type, ease } = this;
    const [ innerWidth, innerHeight ] = this.dimensions();
    const barWidth = innerWidth / data.length - barPadding;

    const column = svg
      .selectAll('.chart__column')
      .data(data);

    column
      .enter()
      .append('rect')
        .attr('class', 'chart__column');

    (options.animate ? svg.selectAll('.chart__column').transition().ease(ease) : svg.selectAll('.chart__column'))
      .attr('x', data => scaleX(data.date) - barWidth / 2)
      .attr('rx', type === 'rounded' ? barWidth / 2 : 0)
      .attr('ry', type === 'rounded' ? barWidth / 2 : 0)
      .attr('width', barWidth)
      .attr('height', innerHeight);

    column
      .exit()
      .remove();

    const bar = svg
      .selectAll('.chart__bar')
      .data(data);

    bar
      .enter()
      .append('rect')
        .attr('class', 'chart__bar');

    (options.animate ? svg.selectAll('.chart__bar').transition().ease(ease) : svg.selectAll('.chart__bar'))
      .attr('x', data => scaleX(data.date) - barWidth / 2)
      .attr('y', data => scaleY(data.value))
      .attr('rx', type === 'rounded' ? barWidth / 2 : 0)
      .attr('ry', type === 'rounded' ? barWidth / 2 : 0)
      .attr('width', barWidth)
      .attr('height', data => innerHeight - scaleY(data.value))
      .on('mouseover', data => this.mouseover(data))
      .on('mouseleave', data => this.mouseleave(data));

    bar
      .exit()
      .remove();
  }

  render(data = this.data, options = {}) {
    const { scaleX, scaleY } = this;
    const domainX = scaleX.domain(extent(data, data => data.date));
    const domainY = scaleY.domain([0, max(data, data => data.value)]);

    if (this.nice) {
      domainX.nice();
      domainY.nice();
    }

    if (this.axis) {
      this.renderAxis(data, options);
    }

    this.renderBars(data, options);
  }

  update(data = this.data, options) {
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

export default BarChart;
